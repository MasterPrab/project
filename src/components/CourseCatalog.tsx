import Link from "next/link"
import ProductCard from "./ProductCard"

export default async function CourseCatalog({courseJson}:{courseJson:object}){
    const courseJsonReady = await courseJson
    return (
        <>
        Explore{courseJsonReady.count}model in our catalog
        <div style={{margin:"30px", display:'flex',flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",
           alignContent:"space-around" }}>
                {
                    courseJsonReady.data.map((courseItem)=>(
                        <Link href={`/course/${courseItem.id}`} className = "w-1/5">
                        <ProductCard courseName = {courseItem.model} imgSrc={courseItem.picture}
                        />
                        </Link>
                    ))
                }

           </div>
        </>
    )

}