import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

export default function NavBar() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    function handleLogout() {
        logout();
        navigate('/');
    }

    function toggleMobileMenu() {
        setMobileOpen(!mobileOpen);
    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 py-4 px-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link to="/" className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition">
                        YourApp
                    </Link>
                </div>

                {/* Desktop links */}
                <div className="hidden md:flex space-x-10 text-lg">
                    <Link to="/explore" className="text-gray-700 hover:text-blue-600 font-medium transition">
                        Explore
                    </Link>
                    {user && (
                        <Link to="/library" className="text-gray-700 hover:text-blue-600 font-medium transition">
                            My Library
                        </Link>
                    )}
                </div>

                {/* Auth Buttons desktop */}
                <div className="hidden md:flex items-center space-x-6 text-lg">
                    {user ? (
                        <>
                            <span className="text-gray-800 font-semibold text-lg">Hi, {user.username}</span>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium text-lg"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-6 py-3 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 transition font-medium text-lg"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium text-lg"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
                    aria-label="Toggle menu"
                >
                    {/* Burger icon */}
                    <svg
                        className={`h-6 w-6 transition-transform duration-300 ${mobileOpen ? 'rotate-90' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {mobileOpen ? (
                            // Close icon (X)
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        ) : (
                            // Hamburger icon
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
                    <div className="px-4 pt-4 pb-6 space-y-4">
                        <Link
                            to="/explore"
                            onClick={() => setMobileOpen(false)}
                            className="block text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Explore
                        </Link>
                        {user && (
                            <Link
                                to="/library"
                                onClick={() => setMobileOpen(false)}
                                className="block text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                My Library
                            </Link>
                        )}

                        {user ? (
                            <>
                                <span className="block text-gray-800 font-semibold pt-4">Hi, {user.username}</span>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileOpen(false);
                                    }}
                                    className="w-full mt-2 px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-6 py-3 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 transition font-medium text-center"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setMobileOpen(false)}
                                    className="block mt-2 px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium text-center"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
