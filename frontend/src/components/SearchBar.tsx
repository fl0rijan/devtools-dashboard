export default function SearchBar(){
    return (
        <div className="relative ...">
            <div className="pointer-events-none absolute ...">
                <svg className="absolute h-5 w-5 text-gray-400">

                </svg>
            </div>
            <input type="text" placeholder="Search" className="..."/>
        </div>
    );
}