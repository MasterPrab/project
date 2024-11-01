'use client'
import { useReducer, useState } from "react"
import ProductCard from "./ProductCard"
import Link from "next/link"
import { useRef,useEffect } from "react"
import getCourse from "@/libs/getCourses"

export default function CoursePanel() {

    const [courseResponse, setCourseResponse] = useState (null)
    
    useEffect(()=> {
        const fetchdata = async ()=>{
            const courses = await getCourse()
            setCourseResponse(courses)
        }
        fetchdata()
    },[])
    
    const countRef = useRef(0)
    const inputRef = useRef<HTMLInputElement>(null)

    const compareReducer = ( compareList:Set<string>, action:{type:string, courseName:string})=> {
        switch(action.type){
            case 'add':{
                return new Set(compareList.add(action.courseName))
            }
            case 'remove':{
                compareList.delete(action.courseName)
                return new Set(compareList)
            }
            default: return compareList
        }
    }
    
    const [ compareList, dispatchCompare ] = useReducer (compareReducer, new Set<string >())
    
    /**
     * Mock data for demontration only
     */
    /*
    const mockCarRepo =[
        {cid:"001", name:"Iron man",image:"/img/ironman.jpg"},
        {cid:"002", name:"Logan",image:"/img/logan.jpg"},
        {cid:"003", name:"CR7",image:"/img/cr7.jpg"},
        {cid:"004", name:"Taylor Swift",image:"/img/taylor.jpg"},
    ]
        */

    if(!courseResponse) return(<p>Car Panel is loading...</p>)

    return(
        <div>
        <div style={{margin:"30px", display:'flex',flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",
           alignContent:"space-around" }}>
                {
                    courseResponse.data.map((courseItem:Object)=>(
                        <Link href={`/car/${courseItem.id}`} className = "w-1/5">
                        <ProductCard courseName = {courseItem.model} imgSrc={courseItem.picture}
                        onCompare={(course:string)=>dispatchCompare({type:'add',courseName:course})}/>
                        </Link>
                    ))
                }

           </div>
           <div className="w-full text-xl font-medium">Compare List: {compareList.size}</div>
           { Array.from(compareList).map((course)=> <div key={course}
                onClick={()=>dispatchCompare({type:'remove', courseName:course})}> 
                {course} </div>)}

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
            onClick={()=> {countRef.current=countRef.current+1; alert(countRef.current)}}>
                Count with Ref Object
            </button>
            <input type = "text" placeholder="Please fill" className = "block text-grey-900 text-sm rounded-lg p-2 m-2 bg-purple-50 ring-1 ring-inset ring-purple-400 focus:outline-none focus:bg-purple-200 focus:ring-2"
            ref={inputRef}/>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
            onClick={()=> {if(inputRef.current!=null)inputRef.current.focus()}}>
                Focus Input
            </button>
   </div>

    )
}