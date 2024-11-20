import getCourses from "@/libs/getCourses";
import CourseCatalog from "@/components/CourseCatalog";
import TopMenu from "@/components/TopMenu";
import styles from './course.module.css';

export default async function Course() {
    const courses = await getCourses();
    return (
        <>
            <TopMenu />
            <main className={styles.courseContainer}>
                <h1 className={styles.heading}>Select Shop</h1>
                <CourseCatalog courseJson={courses} />
            </main>
        </>
    );
}