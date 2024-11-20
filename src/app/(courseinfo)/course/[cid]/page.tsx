import Image from "next/image";
import getCourse from "@/libs/getCourse";
import Link from "next/link";
import styles from './courseDetail.module.css';

export default async function courseDetailPage({ params }: { params: { cid: string } }) {
    const courseDetail = await getCourse(params.cid);

    return (
        <main className={styles.courseDetailContainer}>
            <h1 className="text-lg font-medium">Shop Name: {courseDetail.data.name}</h1>
            <div className={styles.courseContent}>
                <Image
                    src={courseDetail.data.picture}
                    alt="course Image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={styles.courseImage}
                />
                <div className={styles.courseInfo}>
                    <div>Price Level: {courseDetail.data.priceLevel}</div>
                    <div>Address: {courseDetail.data.address}</div>
                    <div>Province: {courseDetail.data.province}</div>
                    <div>Postal Code: {courseDetail.data.postalcode}</div>
                    <div>Tel: {courseDetail.data.tel}</div>

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
/*
export async function generateStaticParams() {
    return [{ cid: '001' }, { cid: '002' }, { cid: '003' }, { cid: '004' }];
}
*/