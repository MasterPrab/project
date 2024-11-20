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
            <div className={'w-full h-[70%] relative rounded-t-lg'}>
                <Image
                    src={imgSrc}
                    alt={courseName}
                    fill={true}
                    className="object-cover rounded-t-lg"/>
                    
            </div>

            {/* Course Name */}
            <div className = 'w-[50%] h-[15%] p-[10px] '>{courseName}</div>

            {/* Optional Compare Button */}
            {
                onCompare?<button className='block h-[10%] text-sm rounded-md bg-sky-600 
                hover:bg-indigo-600 mx-2 px-1 py-1 text-white shadow-sm'
                onClick={ (e) => { e.preventDefault(); onCompare(courseName) } }
                >
                    Compare</button> : ''
            }

        </InteractiveCard>
    );
}