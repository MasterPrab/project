export default async function getCourse (id:string){
    const response =  await fetch(`https://projectbackend2.vercel.app/api/v1/shops/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch")
    }
    return await response.json()
}