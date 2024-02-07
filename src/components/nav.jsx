export default function Nav() {
    return (
        <>
            <nav className="px-10 py-5 pb-16">
                <div className="relative rounded-md px-2 py-3 w-full max-w-[80rem] mx-auto bg-gray-500">
                    <ul className="grid grid-cols-3 w-fit mx-auto gap-x-10">
                        <li className="text-right"><a href="/">Home</a></li>
                        <li className="relative">
                            <div className="absolute mt-1 pt-4 pb-4 w-full text-center bg-yellow-500 text-white">
                                <a className="mx-auto" href="/play">Play</a>
                            </div>
                        </li>
                        <li><a href="/leaderboard">Leaderboard</a></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}