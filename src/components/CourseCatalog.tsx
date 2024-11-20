import Link from "next/link";
import ProductCard from "./ProductCard";

export default function CourseCatalog({ courseJson }: { courseJson: any }) {
    return (
        <>
            <h2
                className="text-center mb-5 text-3xl font-bold font-serif text-gray-800"
            >
                Explore {courseJson.count} Massage Shops in our catalog
            </h2>
            <div
                className="flex flex-wrap justify-center gap-5 p-5"
            >
                {courseJson.data.map((courseItem: any) => (
                    <Link
                        key={courseItem.id}
                        href={`/course/${courseItem.id}`}
                        className="w-1/4"
                    >
                        <ProductCard
                            courseName={courseItem.name}
                            imgSrc={courseItem.picture}
                        />
                    </Link>
                ))}
            </div>
        </>
    );
}