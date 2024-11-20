import Link from "next/link";
import ProductCard from "./ProductCard";

export default function CourseCatalog({ courseJson }: { courseJson: any }) {
    return (
        <>
            <h2
                style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    fontSize: "2rem", // Bigger heading font
                    fontWeight: "bold",
                    fontFamily: "'Georgia', serif", // Elegant serif font
                    color: "#333", // Dark gray for readability
                }}
            >
                Explore {courseJson.count} Massage Shops in our catalog
            </h2>
            <div
                style={{
                    margin: "20px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center", // Center items
                    gap: "20px", // Add space between items
                    padding: "10px",
                }}
            >
                {courseJson.data.map((courseItem: any) => (
                    <Link
                        key={courseItem.id}
                        href={`/course/${courseItem.id}`}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
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