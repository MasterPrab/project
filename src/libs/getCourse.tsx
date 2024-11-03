export default async function getCourse (id:string){
    const response =  await fetch(`http://localhost:5000/api/v1/shops/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch")
    }
    return await response.json()
}