import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getUserProfile from "@/libs/getUserProfile"
import { dbConnect } from "@/db/dbConnect"
import Shop from "@/db/models/Shop"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DashboardPage() {
    const addShop = async (addShopForm: FormData) => {
        "use server"
        const name = addShopForm.get("name") as string
        const priceLevel = Number(addShopForm.get("priceLevel"))
        const picture = addShopForm.get("picture") as string
        const address = addShopForm.get("address") as string
        const province = addShopForm.get("province") as string
        const postalcode = addShopForm.get("postalcode") as string
        const tel = addShopForm.get("tel") as string
    
        try {
            await dbConnect()
            await Shop.create({
                name, priceLevel, picture, address, province, postalcode, tel
            })
        } catch (error) {
            console.log(error)
        }
        revalidateTag('shops')
        redirect('/course')
    }
    
    const updateShop = async (updateShopForm: FormData) => {
        "use server"
        const id = updateShopForm.get("id") as string
        const name = updateShopForm.get("name") as string
        const priceLevel = Number(updateShopForm.get("priceLevel"))
        const picture = updateShopForm.get("picture") as string
        const address = updateShopForm.get("address") as string
        const province = updateShopForm.get("province") as string
        const postalcode = updateShopForm.get("postalcode") as string
        const tel = updateShopForm.get("tel") as string
    
        try {
            await dbConnect()
            await Shop.findByIdAndUpdate(id, {
                name, priceLevel, picture, address, province, postalcode, tel
            })
        } catch (error) {
            console.log(error)
        }
        revalidateTag('shops')
        redirect('/course')
    }
    
    const deleteShop = async (deleteShopForm: FormData) => {
        "use server"
        const id = deleteShopForm.get("id") as string
    
        try {
            await dbConnect()
            await Shop.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
        }
        revalidateTag('shops')
        redirect('/course')
    }

    const getShops = async () => {
        await dbConnect()
        return await Shop.find().lean()
    }

    const shops = await getShops()
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    const profile = await getUserProfile(session.user.token)
    const createdAt = new Date(profile.data.createdAt)

    return (
        <main className="bg-slate-100">
            <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto border-separate border-spacing-2"><tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member since</td><td>{createdAt.toString()}</td></tr>
            </tbody></table>

            {profile.data.role === "admin" && (
                <>
                <Link href={'/reservations/managepage'}>
                        <button >
                            Manage Shop
                        </button>
                    </Link>
                    {/* <form action={addShop} className="my-8">
                    <div className='text-xl text-blue-700'>Add Shop Info</div>
                <div className='flex items-center w-1/2 my-2'>
                    <label className='w-auto block text-gray-700 pr-4' htmlFor='name'> Name: </label>
                    <input type='text' required id='name' name='name' 
                        placeholder='Shop name' 
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' 
                    />
                </div>
                <div className='flex items-center w-1/2 my-2'>
                    <label className='w-auto block text-gray-700 pr-4' htmlFor='priceLevel'> Price Level: </label>
                    <input type='number' required id='priceLevel' name='priceLevel' 
                        placeholder='Price Level' min={1} max={4}
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' 
                    />
                </div>
                <div className='flex items-center w-1/2 my-2'>
                    <label className='w-auto block text-gray-700 pr-4' htmlFor='picture'> Picture: </label>
                    <input type='text' required id='picture' name='picture' 
                        placeholder='URL' 
                        className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' 
                    />
                </div>
                    <div className='flex items-center w-1/2 my-2'>
                    <label className='w-auto block text-gray-700 pr-4' htmlFor='address'>
                        Address: </label>
                    <input type='text' required id='address' name='address' placeholder='address'
                    
                    className='bg-white border-2 border-gray-200 rounded w-auto p-2 
                    text-gray-700 focus:outline-none focus:border-blue-400' />
                    </div>
                    <div>
                    <label className='w-auto block text-gray-700 pr-4' htmlFor='province'>
                        Province: </label>
                    <input type='text' required id='province' name='province' placeholder='province' 
                    
                    className='bg-white border-2 border-gray-200 rounded w-auto p-2 
                    text-gray-700 focus:outline-none focus:border-blue-400' />
                    </div>
                    <div>
                    <label className='w-auto block text-gray-700 pr-4 ml-5' htmlFor='postalcode'>
                    Postal Code: </label>
                    <input type='number' required id='postalcode' name='postalcode' placeholder='postalcode' min={10000} max={99999}
                    
                    className='bg-white border-2 border-gray-200 rounded w-auto p-2 
                    text-gray-700 focus:outline-none focus:border-blue-400' />
                    </div>
                    <div>
                    <label className='w-auto block text-gray-700 pr-4 ml-5' htmlFor='Tel'>
                        Tel: </label>
                    <input type='text' required id='tel' name='tel' placeholder='Tel'
                    
                    className='bg-white border-2 border-gray-200 rounded w-auto p-2 
                    text-gray-700 focus:outline-none focus:border-blue-400' />


                        
                    </div>

                    

                
                
                
                
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white p-2'>
                Add New Shop
                </button>
                        
                    </form>

                    <div className="mt-8">
                        <h2 className="text-xl text-blue-700">Manage Shops</h2>
                        {shops.map((shop) => (
                            <div key={shop._id} className="shop-item border p-4 my-4 rounded bg-white shadow-md">
                                <div className="shop-details mb-4">
                                    <p><strong>Name:</strong> {shop.name}</p>
                                    <p><strong>Price Level:</strong> {shop.priceLevel}</p>
                                    <p><strong>Address:</strong> {shop.address}</p>
                                    
                                    <form action={updateShop} className="mb-2">
                                        <input type="hidden" name="id" value={shop._id} />
                                        <input type="text" name="name" defaultValue={shop.name} required className="border p-2 mb-2 w-full" />
                                        <input type="number" name="priceLevel" defaultValue={shop.priceLevel} required min={1} max={4} className="border p-2 mb-2 w-full" />
                                        <input type="text" name="picture" defaultValue={shop.picture} required className="border p-2 mb-2 w-full" />
                                        <input type="text" name="address" defaultValue={shop.address} required className="border p-2 mb-2 w-full" />
                                        <input type="text" name="province" defaultValue={shop.province} required className="border p-2 mb-2 w-full" />
                                        <input type="number" name="postalcode" defaultValue={shop.postalcode} required min={10000} max={99999} className="border p-2 mb-2 w-full" />
                                        <input type="text" name="tel" defaultValue={shop.tel} required className="border p-2 mb-2 w-full" />
                                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white p-2 w-full">Update</button>
                                    </form>
                                    
                                    <form action={deleteShop}>
                                        <input type="hidden" name="id" value={shop._id} />
                                        <button type="submit" className="bg-red-500 hover:bg-red-700 text-white p-2 w-full">Delete</button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </>
            )}
        </main>
    )
}