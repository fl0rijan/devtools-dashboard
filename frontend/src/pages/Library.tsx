import { useState } from 'react';

export default function Library() {
    const [activeTab, setActiveTab] = useState<'bookmarks' | 'snippets' | 'prompts'>('bookmarks');

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Library</h1>

            <nav className="mb-6 border-b border-gray-300">
                <button
                    className={`mr-6 pb-2 ${activeTab === 'bookmarks' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                    onClick={() => setActiveTab('bookmarks')}
                >
                    Bookmarks
                </button>
                <button
                    className={`mr-6 pb-2 ${activeTab === 'snippets' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                    onClick={() => setActiveTab('snippets')}
                >
                    Snippets
                </button>
                <button
                    className={`pb-2 ${activeTab === 'prompts' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                    onClick={() => setActiveTab('prompts')}
                >
                    Prompts
                </button>
            </nav>

            <section>
                {activeTab === 'bookmarks' && <div>Your Bookmarks here...</div>}
                {activeTab === 'snippets' && <div>Your Snippets here...</div>}
                {activeTab === 'prompts' && <div>Your Prompts here...</div>}
            </section>
        </div>
    );
}
