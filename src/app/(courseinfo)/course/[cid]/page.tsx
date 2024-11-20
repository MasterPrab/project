import Image from "next/image";
import getCourse from "@/libs/getCourse";
import Link from "next/link";
import styles from './courseDetail.module.css';

export default async function courseDetailPage({ params }: { params: { cid: string } }) {
    const courseDetail = await getCourse(params.cid);

    return (
        <main className="min-h-screen bg-amber-200 p-10">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Shop Name: {courseDetail.data.name}</h1>
            <div className="bg-white max-w-3xl mx-auto rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
                <Image
                    src={courseDetail.data.picture}
                    alt={`${courseDetail.data.name} Image`}
                    width={400}
                    height={300}
                    className='rounded-lg w-[30%] bg-black'
                />
                <div className='text-md mx-5 text-left'>
                    <div><strong>Price Level:</strong> {courseDetail.data.priceLevel}</div>
                    <div><strong>Address:</strong> {courseDetail.data.address}</div>
                    <div><strong>Province:</strong> {courseDetail.data.province}</div>
                    <div><strong>Postal Code:</strong> {courseDetail.data.postalcode}</div>
                    <div><strong>Tel:</strong> {courseDetail.data.tel}</div>

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