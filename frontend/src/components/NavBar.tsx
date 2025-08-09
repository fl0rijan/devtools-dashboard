import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
//import {useAuth} from '../context/AuthContext';
import ProfileMenu from './ProfileMenu';
import {LoginDropdown} from './LoginDropdown'
import {RegisterDropdown} from './RegisterDropdown'

export default function NavBar() {
    //const {user, logout} = useAuth();
    //const navigate = useNavigate();
    //const [mobileOpen, setMobileOpen] = useState(false);

    const [user, setUser] = useState<{ username: string; email: string } | null>(null);
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    function handleLogout() {
        setUser(null);
        navigate('/');
    }

    function handleLogin(email: string, password: string) {
        console.log('Login:', email, password);
        setUser({username: email.split('@')[0], email});
    }

    /*
    function handleLogout() {
        logout();
        navigate('/');
    }

    function handleLogin(email: string, password: string) {
        console.log('Login:', email, password)
    }
*/
    function handleRegister(email: string, password: string, username: string) {
        console.log('Register:', email, password, username)
    }


    function toggleMobileMenu() {
        setMobileOpen(!mobileOpen);
    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 py-4 px-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
                <div className="flex items-center space-x-10">
                    <Link to="/"
                          className="text-3xl font-bold text-gray-900 hover:text-indigo-500 transition flex items-center gap-3">
                        <svg className="h-10 w-10 text-indigo-500 shrink-0" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 6V4m0 16v-2m4-14h2m-16 0h2m14 14h-2m-16 0H4m14.5-9.5L18 6m-12 12l-1.5 1.5M6 6l1.5 1.5M18 18l-1.5-1.5M13 10V3L4 14h7v7l9-11h-7z"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                        </svg>
                        <div>DevTools</div>
                    </Link>

                    <div className="hidden md:flex space-x-10 text-lg">
                        <Link
                            to="/explore"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Explore
                        </Link>
                        {user && (
                            <Link
                                to="/library"
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-6 text-lg">
                    {user ? (
                        <ProfileMenu onLogout={() => {
                            //logout()
                            handleLogout();
                            navigate('/')
                        }}/>
                    ) : (
                        <>
                            <div className="hidden md:flex items-center space-x-4">
                                <LoginDropdown onLogin={handleLogin}/>
                                <RegisterDropdown onRegister={handleRegister}/>
                            </div>
                        </>
                    )}
                </div>

                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
                    aria-label="Toggle menu"
                >
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
