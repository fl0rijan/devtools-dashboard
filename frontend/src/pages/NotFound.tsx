import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-4">Oops! The page you’re looking for doesn’t exist.</p>
            <Link
                to="/"
                className="text-blue-600 hover:underline"
            >
                Go back home
            </Link>
        </div>
    )
}
