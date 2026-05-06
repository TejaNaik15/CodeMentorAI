import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { logoutUser } from "../utils/auth";
import { useState, useEffect, useRef } from "react";

function Navigation() {
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="text-sm transition-colors"
      style={{ color: '#6F6F6F', fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span
                className="text-3xl tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif", color: '#000000' }}
              >
                CodeMentorAI
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            {user ? (
              <>
                <NavLink to="/chat">Chat</NavLink>
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: '#6F6F6F', fontFamily: "'Inter', sans-serif" }}
                  >
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=random`}
                      alt="Profile"
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{user.email}</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-gray-200/50">
                      <div className="px-4 py-2 border-b border-gray-200/50">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={logoutUser}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] transition-transform duration-200"
                style={{ backgroundColor: '#000000', fontFamily: "'Inter', sans-serif" }}
              >
                Begin Journey
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: '#000000' }}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-gray-200/50 py-4 mt-2">
            <div className="space-y-2">
              <NavLink to="/">Home</NavLink>
              {user ? (
                <>
                  <NavLink to="/chat">Chat</NavLink>
                  <div className="px-2 pt-2 border-t border-gray-200/50 mt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=random`}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900 truncate">{user.email}</span>
                    </div>
                    <button
                      onClick={logoutUser}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="block rounded-full px-6 py-2.5 text-sm text-white text-center mx-2 hover:scale-[1.03] transition-transform duration-200"
                  style={{ backgroundColor: '#000000', fontFamily: "'Inter', sans-serif" }}
                >
                  Begin Journey
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
