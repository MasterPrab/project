import {resolve} from "path"
export default async function getCourses () {

    await new Promise((resolve)=>setTimeout(resolve, 2000))

    const response =  await fetch("http://localhost:5000/api/v1/shops")
    if(!response.ok){
        throw new Error("Failed to fetch")
    }
    return await response.json()
    
}