
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = localStorage.getItem('key')
  const navigate = useNavigate()
  const onLogout =()=>{
    localStorage.clear()
    navigate('signup')
  }
  
  return (
     <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl">User Managment</span>
          </div>
          <div className="hidden lg:block">
            <div className="flex space-x-4">
              {user ? (
                <>
                  <button
                    onClick={onLogout}
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    LogOut
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
