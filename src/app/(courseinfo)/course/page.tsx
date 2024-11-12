import getCourses from "@/libs/getCourses"
import CourseCatalog from "@/components/CourseCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import CoursePanel from "@/components/CoursePanel"

export default  async function Course(){
    const courses =  await getCourses()
    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Travel Partner</h1>
            
            <CourseCatalog courseJson={courses}/>
            
            
           
            
        </main>

    )
}