import getCourses from "@/libs/getCourses";
import CourseCatalog from "@/components/CourseCatalog";
import TopMenu from "@/components/TopMenu";
import styles from './course.module.css';

export default async function Course() {
    const courses = await getCourses(); // Fetch shop/course data
    return (
        <>
            <TopMenu />
            <main className="min-h-screen p-10 bg-amber-200">
                <h1 className="text-3xl font-bold text-center mb-4">Select Shop</h1>
                
                <CourseCatalog courseJson={courses} /> {/* Pass the fetched data to the catalog */}
            </main>
        </>
    );
}