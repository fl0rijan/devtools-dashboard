import SearchBar from "../components/SearchBar.tsx";
import FilterBar from "../components/FilterBar.tsx";
import Card from "../components/Card.tsx";

export default function Home() {
    return (
        <div className="mx-auto">
            <section className="relative overflow-hidden min-h-[350px]">
                <div
                    className="absolute inset-0 bg-center bg-[url(./assets/home-bg.jpg)] bg-cover filter blur-sm -z-10"></div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 justify-items-center pt-16 pb-8 pl-5 pr-5">
                    <h1 className="text-5xl font-bold mb-4 subpixel-antialiased">DevTools Dashboard</h1>
                    <p className="text-gray-500">Your personal toolkit for development</p>

                    <div className="p-5">
                        <button className="bg-indigo-500 hover:bg-indigo-700 text-white px-6 py-3 rounded">Get Started
                        </button>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden min-h-[450px] p-5">
                <div className="absolute inset-0 bg-white filter blur-sm -z-10"></div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-20 pb-8">
                    <h1 className="text-3xl font-bold mb-4 subpixel-antialiased text-gray-800">
                        Explore
                    </h1>

                    <div className="flex items-center justify-between gap-4 pt-5">
                        <SearchBar/>

                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">Filter</span>
                            <FilterBar/>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-8">
                        <Card
                            type="bookmark"
                            title="Bookmark"
                            description="Transitions, animations, and other interactive elements."
                            tags={["UI", "Animations", "CSS"]}
                        />
                        <Card
                            type="prompt"
                            title="Prompt"
                            description="Transitions, animations, and other interactive elements."
                            tags={["UI", "Animations", "CSS"]}
                        />
                        <Card
                            type="snippet"
                            title="Snippet"
                            description="Transitions, animations, and other interactive elements."
                            tags={["UI", "Animations", "CSS"]}
                        />
                        <Card
                            type="bookmark"
                            title="Bookmark"
                            description="Transitions, animations, and other interactive elements."
                            tags={["UI", "Animations", "CSS"]}
                        />
                        <Card
                            type="bookmark"
                            title="Bookmark"
                            description="Transitions, animations, and other interactive elements."
                            tags={["UI", "Animations", "CSS"]}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}