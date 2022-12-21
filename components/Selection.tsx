import Style from '../styles/Home.module.css';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type SelectionProps = { title: string, imgUrl: string, brightNess: number, href: string };

/* Meta Data */
const selectionMetaData: Array <SelectionProps> = [
    {title: 'Time Table', imgUrl: '/images/timetable_logo.png', brightNess: 1.2, href: '/timetable'},
    {title: 'Free Classrooms', imgUrl: '/images/free_classrooms_logo.png', brightNess: 1, href: '/freeclassrooms'},
    {title: 'About us', imgUrl: '/images/about_us_logo.png', brightNess: 1, href: '/aboutus'},
    {title: 'Hall of fame', imgUrl: '/images/about_us_logo.png', brightNess: 1, href: '/halloffame'},
]

/*Helper Functions */
function Card(props:SelectionProps) {
    return (
        <>
            <motion.li
                className={`hover:bg-blue-300 hover:ring-blue-400 hover:shadow-xl shadow-lg ring-1 ring-slate-200 bg-white rounded-lg cursor-pointer ${Style.selection}`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'tween' }}
            >
                <Link href={props.href}>
                    <div className={`h-48 flex justify-center p-4 flex-col align-middle items-center`}>
                        <div>
                            <Image src = {props.imgUrl} width={400} alt = 'loading...' height={300} style={{ width: '10rem', filter: `brightness(${props.brightNess})` }} className = {''}/>
                        </div>
                        <h1 className={`text-xl`}>{props.title}</h1>
                    </div>
                </Link>
            </motion.li>
        </>
    );
}

export default function Selection() {
    return (
        <div
            className={`lg:px-60 md:px-24 sm:px-16 lg:p-8 md:p-4 sm:p-2 base:p-2 rounded-xl`}
        >
            <ul
                className={`grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 base:grid-cols-1 gap-5 p-2`}
            >
                {selectionMetaData.map(
                    (prop: SelectionProps, key: number) => (
                        <Card key={key} {...prop} />
                    )
                )}
            </ul>
        </div>
    );
}
