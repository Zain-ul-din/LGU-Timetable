import { getDocs } from "firebase/firestore";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import TimetableClashResolver from "~/components/clash_resolver/TimetableClashResolver";
import { SocialLinks } from "~/components/seo/Seo";
import { FIREBASE_ANALYTICS_EVENTS, useFirebaseAnalyticsReport } from "~/lib/FirebaseAnalysis";
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

    useFirebaseAnalyticsReport(FIREBASE_ANALYTICS_EVENTS.clash_resolver);
    
    return <>
        <Head>
        <title>Timetable Clash Reslover</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content="A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS. Welcome to our Timetable Clash Resolution Tool, designed exclusively for students like you, navigating the maze of course selection at our university."
            />
            <meta
                name="keywords"
                content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms`}
            />
            <SocialLinks />
        </Head>
        <TimetableClashResolver 
            timetables = {timetables}
        />
    </>
}
