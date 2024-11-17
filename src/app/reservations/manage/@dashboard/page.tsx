import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getUserProfile from "@/libs/getUserProfile"
import { dbConnect } from "@/db/dbConnect"
import Shop from "@/db/models/Shop"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export default async function DashboardPage(){
    
    const addShop = async (addShopForm: FormData) => {
        "use server"
        const name = addShopForm.get("name")
        const pricelevel = addShopForm.get("pricelevel")
        const picture = addShopForm.get("picture")
        const address = addShopForm.get("address")
        const province = addShopForm.get("province")
        const postalcode = addShopForm.get("postalcode")
        const tel = addShopForm.get("tel")
        
        

        try{
            await dbConnect()
            const shop = await Shop.create({
                "name": name,
                "pricelevel": pricelevel,
                "picture": picture,
                "address": address,
                "province": province,
                "postalcode": postalcode,
                "tel": tel,
                
                
            })
        }
        catch(error){
            console.log(error)
        }
        revalidateTag('shops')
        redirect('/course')
      }

    const session = await getServerSession(authOptions)
    if(!session  || !session.user.token) return null
    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return(
        <main className="bg-slate-100">
            <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto border-seperate border-spacing-2"><tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member since </td><td>{createdAt.toString()}</td></tr>
         </tbody></table>

            {
            (profile.data.role == "admin") ? 
            <form action={addShop}>
                <div className='text-xl text-blue-700'>Add Shop Info</div>
                <div className='flex items-center w-1/2 my-2'>
                    <label className='w-auto block text-gray-700 pr-4' htmlFor='name'> Name </label>
                    <input type='text' required id='name' name='name' 
                        placeholder='Shop name' 
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' 
                    />
                </div>
                <div className='flex items-center w-1/2 my-2'>
                    <label className='w-auto block text-gray-700 pr-4' htmlFor='pricelevel'> Price Level </label>
                    <input type='number' required id='pricelevel' name='pricelevel' 
                        placeholder='Price Level' min={1} max={4}
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' 
                    />
                </div>
                <div className='flex items-center w-1/2 my-2'>
                    <label className='w-auto block text-gray-700 pr-4' htmlFor='picture'> Picture </label>
                    <input type='text' required id='picture' name='picture' 
                        placeholder='URL' 
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' 
                    />
                </div>
                <div className='flex items-center w-1/2 my-2'>
                    <label className='w-auto block text-gray-700 pr-4' htmlFor='address'>
                        Address </label>
                    <input type='text' required id='address' name='address' placeholder='address'
                    
                    className='bg-white border-2 border-gray-200 rounded w-auto p-2 
                    text-gray-700 focus:outline-none focus:border-blue-400' />
                    <label className='w-auto block text-gray-700 pr-4' htmlFor='province'>
                        Province </label>
                    <input type='text' required id='province' name='province' placeholder='province' 
                    
                    className='bg-white border-2 border-gray-200 rounded w-auto p-2 
                    text-gray-700 focus:outline-none focus:border-blue-400' />
                    <label className='w-auto block text-gray-700 pr-4 ml-5' htmlFor='postalcode'>
                    Postal Code</label>
                    <input type='number' required id='postalcode' name='postalcode' placeholder='postalcode' min={10000} max={99999}
                    
                    className='bg-white border-2 border-gray-200 rounded w-auto p-2 
                    text-gray-700 focus:outline-none focus:border-blue-400' />

                    <label className='w-auto block text-gray-700 pr-4 ml-5' htmlFor='Tel'>
                        Tel</label>
                    <input type='text' required id='tel' name='tel' placeholder='Tel'
                    
                    className='bg-white border-2 border-gray-200 rounded w-auto p-2 
                    text-gray-700 focus:outline-none focus:border-blue-400' />


                        
                </div>

                
                
                
                
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white p-2'>
                Add New Shop
                </button>
            </form>
            : null
            }


        </main>
    )
}