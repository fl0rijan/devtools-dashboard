export default function Home() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
            <p>This is the home page. Please log in to access your library.</p>
            <div className="bg-red-500 text-white p-2">Test Tailwind</div>
            <div style={{ backgroundColor: 'red', color: 'white', padding: '0.5rem' }}>Inline style test</div>
        </div>
    );
}
