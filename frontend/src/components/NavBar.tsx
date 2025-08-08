import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/');
    }

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
                <Link to="/" className="font-bold text-xl hover:text-blue-400">
                    YourApp
                </Link>
                <Link to="/explore" className="hover:text-blue-400">
                    Explore
                </Link>
                {user && (
                    <>
                        <Link to="/library" className="hover:text-blue-400">
                            My Library
                        </Link>
                    </>
                )}
            </div>

            <div>
                {user ? (
                    <div className="flex items-center space-x-4">
                        <span>Hi, {user.username}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link to="/login" className="hover:text-blue-400">
                            Login
                        </Link>
                        <Link to="/register" className="hover:text-blue-400">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}