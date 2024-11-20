import Image from "next/image";
import getCourse from "@/libs/getCourse";
import Link from "next/link";
import styles from './courseDetail.module.css';

export default async function courseDetailPage({ params }: { params: { cid: string } }) {
    const courseDetail = await getCourse(params.cid);

    return (
        <main className={styles.courseDetailContainer}>
            <h1 className={styles.courseTitle}>Shop Name: {courseDetail.data.name}</h1>
            <div className={styles.courseContent}>
                <Image
                    src={courseDetail.data.picture}
                    alt={`${courseDetail.data.name} Image`}
                    width={400}
                    height={300}
                    className={styles.courseImage}
                />
                <div className={styles.courseInfo}>
                    <p><strong>Price Level:</strong> {courseDetail.data.priceLevel}</p>
                    <p><strong>Address:</strong> {courseDetail.data.address}</p>
                    <p><strong>Province:</strong> {courseDetail.data.province}</p>
                    <p><strong>Postal Code:</strong> {courseDetail.data.postalcode}</p>
                    <p><strong>Tel:</strong> {courseDetail.data.tel}</p>

                    <Link href={`/reservations?id=${params.cid}&model=${courseDetail.data.name}`}>
                        <button className={styles.reservationButton}>
                            Make Booking
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}