import { Link } from 'react-router-dom';
import Logo from './Logo';

function Header({ user, onLogout }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Logo size="small" />
          <h1 className="ml-3 text-xl font-bold text-gray-800">Task Tracker</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden md:block">
                <span className="text-gray-600">
                  Hello, <span className="font-medium">{user.name || 'User'}</span>
                </span>
              </div>
              <button 
                onClick={onLogout} 
                className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link 
                to="/login"
                className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;