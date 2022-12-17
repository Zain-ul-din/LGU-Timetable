export default function Selection() {
    return (
        <div className={`lg:p-8 md:p-4 sm:p-2 base:p-2`}>
            <ul className={`grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 base:grid-cols-1 gap-5`}>
                <li className={`bg-slate-300 shadow-xl rounded-lg`}>
                    <div className={`h-48 flex justify-center align-middle p-4`}>
                        <h1 className={`text-xl`}>Time table</h1>
                    </div>
                </li>
                <li className={`bg-slate-300 shadow-xl rounded-lg`}>
                    <div className={`h-48 flex`}>
                        <h3>Free classrooms</h3>
                    </div>
                </li>
                <li className={`bg-slate-300 shadow-xl rounded-lg`}>
                    <div className={`h-48 flex`}>
                        <h3>About us</h3>
                    </div>
                </li>
                <li className={`bg-slate-300 shadow-xl rounded-lg`}>
                    <div className={`h-48 flex`}>
                        <h3>Hall of Fame</h3>
                    </div>
                </li>
            </ul>
        </div>
    )
}

