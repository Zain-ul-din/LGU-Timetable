import { getDocs } from "firebase/firestore";
import { GetStaticPropsContext } from "next";
import TimetableClashResolver from "~/components/clash_resolver/TimetableClashResolver";
import { timeTableCol } from "~/lib/firebase";
import { TimetableDocType } from "~/types/typedef";

/**
 * TODOS:
 *      Use on demand ISR(Incremental Static regeneration)
 *      SOURCE: https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration
 */
export async function getStaticProps(context: GetStaticPropsContext) {
    const timetableDocSpanShot = await getDocs(timeTableCol);

    const timetables: Array<TimetableDocType> = timetableDocSpanShot.docs.map((timetable) =>
        ({id: timetable.id, ...timetable.data()})
    ) as Array<TimetableDocType>;
    
    return {
        props: {
            timetables
        }
    };
}

export default function Page ({
    timetables
}: {
    timetables: Array<TimetableDocType>
}) {
    return <TimetableClashResolver 
        timetables = {timetables}
    />
}
