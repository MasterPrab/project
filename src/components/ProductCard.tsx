import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function ProductCard({
    courseName,
    imgSrc,
    onCompare,
}: {
    courseName: string;
    imgSrc: string;
    onCompare?: Function;
}) {
    return (
        <InteractiveCard contentName={courseName}>
            {/* Image Container */}
            <div
                className="w-full h-[200px] relative rounded-t-lg overflow-hidden"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    src={imgSrc}
                    alt={courseName}
                    width={300}
                    height={200}
                    className="object-cover rounded-t-lg"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>

            {/* Course Name */}
            <div
                className="text-center font-semibold p-[10px] bg-gray-100 rounded-b-lg"
                style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    wordWrap: 'break-word',
                }}
            >
                {courseName}
            </div>

            {/* Optional Compare Button */}
            {onCompare && (
                <button
                    className="block mt-2 text-sm rounded-md bg-sky-600 hover:bg-indigo-600 mx-auto px-3 py-2 text-white shadow-md"
                    onClick={(e) => {
                        e.preventDefault();
                        onCompare(courseName);
                    }}
                >
                    Compare
                </button>
            )}
        </InteractiveCard>
    );
}