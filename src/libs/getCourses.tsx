import {resolve} from "path"
export default async function getCourses () {

    await new Promise((resolve)=>setTimeout(resolve, 2000))

    const response =  await fetch("https://projectbackend2.vercel.app/api/v1/shops",{next: {tags:['shops']}})
    if(!response.ok){
        throw new Error("Failed to fetch")
    }
    return await response.json()
    
}