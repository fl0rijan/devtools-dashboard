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

            <section className="relative overflow-hidden min-h-[450px] p-5 pb-16">
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

            <section className="relative overflow-hidden min-h-[350px]">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8 justify-items-center pt-16 pb-16 pl-5 pr-5 text-center bg-gray-50">
                    <svg className="h-7 w-7 text-indigo-500 shrink-0" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185"/>
                    </svg>

                    <h1 className="text-2xl font-bold mb-4 subpixel-antialiased pt-5">AI Chat Integration</h1>
                    <p className="text-gray-500">Chat directly with with AI to get help with your code, brainstorm
                        ideas, or ask any development-related questions.</p>

                    <div className="p-5">
                        <button className="bg-indigo-500 hover:bg-indigo-700 text-white px-6 py-3 rounded">Start
                            chatting
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}