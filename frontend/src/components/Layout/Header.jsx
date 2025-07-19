import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, UserCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);

  // Close dropdown on click outside
  React.useEffect(() => {
    if (!profileMenuOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest('.profile-dropdown')) setProfileMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileMenuOpen]);

  const isActive = (path) => location.pathname === path;
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'View All Products' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];
  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin' });
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-8 flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src={logo} 
                alt="Shop Logo" 
                className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg"
              />
              <span className="hidden sm:block text-lg font-baloo font-bold gradient-text tracking-wide">Sweet Shop</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 ml-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium px-2 py-1 rounded-lg transition-all duration-200 relative
                    ${isActive(item.path) 
                      ? 'text-primary bg-primary/10 shadow-festive' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'}
                    after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
                    after:bg-primary after:scale-x-0 after:transition-transform after:duration-300
                    ${isActive(item.path) ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Theme Toggle + Auth/Profile */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center justify-center rounded-full p-2 hover:bg-primary/10 transition"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? 
                <Moon className="w-5 h-5" /> : 
                <Sun className="w-5 h-5" />
              }
            </Button>
            {/* Auth/Profile */}
            {!user && (
              <Button onClick={() => navigate('/login')} className="px-4 py-2 font-semibold rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md hover:scale-105 transition-transform duration-200">Login / Register</Button>
            )}
            {user && (
              <div className="relative profile-dropdown">
                <button onClick={() => setProfileMenuOpen((v) => !v)} className="flex items-center focus:outline-none group transition-transform duration-200 hover:scale-110">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg shadow-lg border-2 border-white animate-fade-in ring-2 ring-primary/30 group-hover:ring-4 transition-all duration-200">
                    {user.name ? user.name.charAt(0).toUpperCase() : <UserCircle className="w-6 h-6" />}
                  </span>
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 animate-fade-in-up">
                    <button onClick={() => { setProfileMenuOpen(false); navigate('/settings'); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button>
                    <button onClick={() => { setProfileMenuOpen(false); logout(); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-end mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle mobile menu"
          >
            <span className="sr-only">Menu</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border animate-fade-in-up">
            <nav className="flex flex-col space-y-3 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium py-2 px-3 rounded-lg transition-colors duration-300
                    ${isActive(item.path) 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground hover:bg-secondary'}
                  `}
                >
                  {item.label}
                </Link>
              ))}
              {/* Login/Register/Profile for mobile */}
              {!user && (
                <div className="flex flex-col gap-2 mt-4">
                  <Button onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} className="w-full bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg shadow-md">Login / Register</Button>
                </div>
              )}
              {user && (
                <div className="flex flex-col gap-2 mt-4 profile-dropdown">
                  <Button onClick={() => { setIsMobileMenuOpen(false); navigate('/settings'); }} className="w-full bg-gray-100 rounded">Settings</Button>
                  <Button onClick={() => { setIsMobileMenuOpen(false); logout(); }} className="w-full bg-red-600 text-white rounded">Logout</Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;