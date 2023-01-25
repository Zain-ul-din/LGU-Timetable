export default function HomeHeader (): React.ReactElement 
{
    return (
        <header className="p-0 m-0 w-100">
            <span className="flex flex-row justify-center w-100 flex-wrap p-0 py-5 m-0">
                <li className="basis-full text-center list-none">
                    <h5 className="text-3xl font-bold text-white">
                        LGU TIMETABLE
                    </h5>
                </li>
                <li className="list-none">
                    <button 
                        className="bg-green-400 hover:bg-transparent my-3 py-2 px-4 text-white hover:text-green-400 rounded-md ring-green-400 shadow-lg hover:ring-2 hover:font-bold sm:text-xl"
                    >
                        LOG IN
                    </button>
                </li>
            </span>
        </header>
    )
}
