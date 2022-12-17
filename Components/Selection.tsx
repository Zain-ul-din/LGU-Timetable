/*Helper Functions */

function Card ({title}: {title:string}) {
    return (
        <>
            <li className={`bg-slate-300 shadow-xl rounded-lg`}>
                <div className={`h-48 flex justify-center align-middle p-4`}>
                    <h1 className={`text-xl`}>{title}</h1>
                </div>
            </li>
        </>
    )
}

export default function Selection() {
    return (
        <div className={`lg:px-60 md:px-24 sm:px-16 lg:p-8 md:p-4 sm:p-2 base:p-2`}>
            <ul className={`grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 base:grid-cols-1 gap-5`}>
                {['Time Table', 'Free Classrooms', 'About us', 'Hall of fame'].map ((title:string,key:number)=>
                    <Card key ={key} title={title}/>
                )}
            </ul>
        </div>
    )
}

