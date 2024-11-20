import getCourses from "@/libs/getCourses";
import CourseCatalog from "@/components/CourseCatalog";
import TopMenu from "@/components/TopMenu";
import styles from './course.module.css';

export default async function Course() {
    const courses = await getCourses(); // Fetch shop/course data
    return (
        <>
            <TopMenu />
            <main className={styles.courseContainer}>
                <h1 className={styles.heading}>Select Shop</h1>
                <p className={styles.subheading}>Explore a variety of shops available in our catalog.</p>
                <CourseCatalog courseJson={courses} /> {/* Pass the fetched data to the catalog */}
            </main>
        </>
    );
}