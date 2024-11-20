import Link from "next/link"
import ProductCard from "./ProductCard"

export default  function CourseCatalog({courseJson}:{courseJson:object}){
    
    return (
        <>
        Explore {courseJson.count} Massage Shops in our catalog
        <div style={{margin:"20px", display:'flex',flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",
           alignContent:"space-around", padding:'10px' }}>
                {
                    courseJson.data.map((courseItem:Object)=>(
                        <Link href={`/course/${courseItem.id}`} className = "w-1/2">
                        <ProductCard courseName = {courseItem.name} imgSrc={courseItem.picture}
                        />
                        </Link>
                    ))
                }

           </div>
        </>
    )

}