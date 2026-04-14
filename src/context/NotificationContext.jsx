import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { Info, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
const NotificationContext = createContext(void 0);
const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Welcome to Nexus",
      message: "Explore our features to start collaborating!",
      type: "info",
      timestamp: /* @__PURE__ */ new Date(),
      read: false
    },
    {
      id: "2",
      title: "Portfolio Update",
      message: "Michael Rodriguez just viewed your pitch deck.",
      type: "success",
      timestamp: new Date(Date.now() - 36e5),
      read: false
    }
  ]);
  const addNotification = (n) => {
    const newNotification = {
      ...n,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: /* @__PURE__ */ new Date(),
      read: false
    };
    setNotifications((prev) => [newNotification, ...prev]);
    const iconMap = {
      info: <Info className="text-blue-500" size={20} />,
      success: <CheckCircle className="text-green-500" size={20} />,
      warning: <AlertTriangle className="text-amber-500" size={20} />,
      error: <AlertCircle className="text-red-500" size={20} />
    };
    toast.custom((t) => <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden border-l-4 ${newNotification.type === "info" ? "border-blue-500" : newNotification.type === "success" ? "border-green-500" : newNotification.type === "warning" ? "border-amber-500" : "border-red-500"}`}><div className="flex-1 w-0 p-4"><div className="flex items-start"><div className="flex-shrink-0 pt-0.5">{iconMap[newNotification.type]}</div><div className="ml-3 flex-1"><p className="text-sm font-bold text-gray-900 leading-none mb-1">{newNotification.title}</p><p className="text-xs text-gray-500">{newNotification.message}</p></div></div></div><div className="flex border-l border-gray-100"><button
      onClick={() => toast.dismiss(t.id)}
      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-xs font-semibold text-gray-400 hover:text-primary-600 transition-colors"
    >
            Close
          </button></div></div>, { duration: 5e3 });
  };
  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  const unreadCount = notifications.filter((n) => !n.read).length;
  return <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, markAllAsRead, unreadCount }}>{children}</NotificationContext.Provider>;
};
const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === void 0) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
export {
  NotificationProvider,
  useNotifications
};
