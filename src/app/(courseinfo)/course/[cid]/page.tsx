import Image from "next/image"
import getCourse from "@/libs/getCourse"
import Link from "next/link"
export default async function courseDetailPage({params}:{params:{cid:string}}){

    const courseDetail = await getCourse(params.cid)
    /**
     *  mock data dor demonstration only
     */
    /*
    const mockCarRepo = new Map()
    mockCarRepo.set("001", {cid:"001", name:"Iron man",image:"/img/ironman.jpg"})
    mockCarRepo.set("002", {cid:"002", name:"Logan",image:"/img/logan.jpg"})
    mockCarRepo.set("003", {cid:"003", name:"CR7",image:"/img/cr7.jpg"})
    mockCarRepo.set("004", {cid:"004", name:"Taylor Swift",image:"/img/taylor.jpg"})
    */
    
    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{courseDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src = {courseDetail.data.picture}
                alt = 'course Image'
                width = {0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left">Address: {courseDetail.data.address}
                <div className="text-md mx-5">Province: {courseDetail.data.province}</div>
                <div className="text-md mx-5">Postal Code: {courseDetail.data.postalcode}</div>
                <div className="text-md mx-5">Tel: {courseDetail.data.tel}</div>
             

                <Link href={`/reservations?id=${params.cid}&model=${courseDetail.data.model}`}>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">
                    Make Reservation
                </button>
                </Link>
                </div>
                
                
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    return[{cid:'001'} ,{cid:'002'},{cid:'003'},{cid:'004'}]
}