import {
  Bell,
  CheckCircle2,
  Info,
  AlertTriangle,
  MailOpen,
  Clock,
  ArrowRight
} from "lucide-react";
import { useNotifications } from "../../context/NotificationContext";
import { Card, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { formatDistanceToNow } from "date-fns";
const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="text-green-500" size={20} />;
      case "warning":
        return <AlertTriangle className="text-amber-500" size={20} />;
      case "error":
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };
  return <div className="max-w-4xl mx-auto space-y-6 animate-fade-in"><div className="flex justify-between items-end"><div><h1 className="text-3xl font-bold text-gray-900 tracking-tight">Notification Center</h1><p className="text-gray-500 mt-1">Stay updated with your latest activities</p></div>{unreadCount > 0 && <Button
    variant="outline"
    size="sm"
    leftIcon={<MailOpen size={16} />}
    onClick={markAllAsRead}
  >
            Mark all as read
          </Button>}</div><Card className="border-none shadow-sm overflow-hidden"><CardBody className="p-0">{notifications.length > 0 ? <div className="divide-y divide-gray-100">{notifications.map((notification) => <div
    key={notification.id}
    className={`p-6 flex items-start gap-4 transition-colors ${notification.read ? "bg-white" : "bg-primary-50/30"}`}
  ><div className={`p-2 rounded-xl border ${notification.read ? "bg-gray-50 border-gray-100" : "bg-white border-primary-100"}`}>{getIcon(notification.type)}</div><div className="flex-1 min-w-0"><div className="flex items-center justify-between mb-1"><h3 className={`text-sm font-bold ${notification.read ? "text-gray-900" : "text-primary-900"}`}>{notification.title}</h3><div className="flex items-center text-[10px] text-gray-400 font-medium"><Clock size={12} className="mr-1" />{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</div></div><p className="text-sm text-gray-600 leading-relaxed mb-3">{notification.message}</p><div className="flex items-center gap-3">{!notification.read && <button
    onClick={() => markAsRead(notification.id)}
    className="text-[11px] font-bold text-primary-600 hover:text-primary-700 uppercase tracking-wider"
  >
                          Mark as read
                        </button>}{notification.link && <Button
    variant="ghost"
    size="sm"
    className="h-auto p-0 text-[11px] font-bold text-gray-400 group hover:text-gray-900 uppercase tracking-wider"
    rightIcon={<ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />}
  >
                          View Details
                        </Button>}</div></div></div>)}</div> : <div className="p-12 text-center"><div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4"><Bell className="text-gray-300" size={32} /></div><h3 className="text-gray-900 font-bold">No notifications yet</h3><p className="text-gray-500 text-sm mt-1">We'll notify you when something important happens.</p></div>}</CardBody></Card></div>;
};
const AlertCircle = ({ className, size }) => <Info className={className} size={size} />;
export {
  NotificationsPage
};
