import getCourses from "@/libs/getCourses"
import CourseCatalog from "@/components/CourseCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import CoursePanel from "@/components/CoursePanel"

export default  function Course(){
    const courses =  getCourses()
    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Travel Partner</h1>
            <Suspense fallback = { <p>Loading...<LinearProgress/> </p> }>
            <CourseCatalog courseJson={courses}/>
            </Suspense>
            
            <hr className="my-10"/> 
            <h1 className="text-xl font-medium">Try client site coursepanel</h1>
            <CoursePanel/>
            
        </main>

    )
}