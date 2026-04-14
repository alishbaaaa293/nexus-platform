import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Menu, 
  X, 
  Bell, 
  MessageCircle, 
  User, 
  LogOut, 
  Building2, 
  CircleDollarSign,
  Home
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardRoute = user?.role === "entrepreneur" ? "/dashboard/entrepreneur" : "/dashboard/investor";
  const profileRoute = user ? `/profile/${user.role}/${user.id}` : "/login";

  const navLinks = [
    {
      icon: <Home size={18} />,
      text: "Dashboard",
      path: dashboardRoute
    },
    {
      icon: <MessageCircle size={18} />,
      text: "Messages",
      path: user ? "/messages" : "/login"
    },
    {
      icon: <Bell size={18} />,
      text: "Notifications",
      path: user ? "/notifications" : "/login"
    },
    {
      icon: <User size={18} />,
      text: "Profile",
      path: profileRoute
    }
  ];

  return (
    <nav className="bg-white border-b border-gray-100 h-16 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full gap-4">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Building2 size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 hidden lg:block tracking-tight">Business Nexus</span>
            </Link>
          </div>

          {/* Desktop navigation - Centered like SS */}
          <div className="hidden md:flex flex-1 justify-center items-center h-full">
            {user && (
              <div className="flex items-center space-x-1 lg:space-x-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="flex items-center px-4 py-2 text-[13px] font-bold text-gray-500 hover:text-primary-600 transition-all rounded-xl hover:bg-primary-50/50 group"
                  >
                    <span className="mr-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      {link.icon}
                    </span>
                    {link.text}
                    {link.text === "Notifications" && unreadCount > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-[13px] font-bold text-gray-500 hover:text-red-600 transition-all rounded-xl hover:bg-red-50/50 group"
                >
                  <LogOut size={18} className="mr-2 opacity-60 group-hover:opacity-100" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* User Profile - Far Right */}
          <div className="flex items-center gap-3">
            {user ? (
              <Link to={profileRoute} className="flex items-center gap-3 pl-4 border-l border-gray-100 group">
                 <div className="flex flex-col items-end hidden lg:flex">
                   <span className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{user.name}</span>
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{user.role}</span>
                 </div>
                 <Avatar
                  src={user.avatarUrl}
                  alt={user.name}
                  size="sm"
                  status={user.isOnline ? "online" : "offline"}
                  className="ring-2 ring-gray-50 group-hover:ring-primary-100 transition-all"
                />
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login"><Button variant="ghost" size="sm" className="font-bold">Log in</Button></Link>
                <Link to="/register"><Button size="sm" className="font-bold">Get Started</Button></Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in shadow-xl">
          <div className="px-3 pt-4 pb-6 space-y-2">
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-3 py-4 bg-gray-50 rounded-2xl mb-4">
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.name}
                    size="md"
                    status={user.isOnline ? "online" : "offline"}
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{user.role}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="flex items-center px-4 py-3 text-sm font-bold text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-3 opacity-60">{link.icon}</span>
                      {link.text}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut size={18} className="mr-3" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 p-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button variant="outline" fullWidth className="font-bold py-4">Log in</Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <Button fullWidth className="font-bold py-4">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export { Navbar };
