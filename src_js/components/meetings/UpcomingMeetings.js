import { Calendar, Clock, Video, ExternalLink } from "lucide-react";
import { useMeetings } from "../../context/MeetingContext";
import { useAuth } from "../../context/AuthContext";
import { Card, CardHeader, CardBody } from "../ui/Card";
import { Badge } from "../ui/Badge";
const UpcomingMeetings = () => {
  const { user } = useAuth();
  const { meetings } = useMeetings();
  const upcoming = meetings.filter((m) => (m.hostId === user?.id || m.participantId === user?.id) && m.status === "confirmed").sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()).slice(0, 3);
  if (upcoming.length === 0) {
    return <Card><CardHeader><h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2></CardHeader><CardBody className="flex flex-col items-center justify-center py-8 text-gray-500"><Calendar className="w-10 h-10 mb-2 text-gray-300" /><p>No confirmed meetings</p></CardBody></Card>;
  }
  return <Card><CardHeader className="flex justify-between items-center"><h2 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h2><Badge variant="primary">{upcoming.length}</Badge></CardHeader><CardBody className="p-0"><div className="divide-y divide-gray-100">{upcoming.map((meeting) => <div key={meeting.id} className="p-4 hover:bg-gray-50 transition-colors"><div className="flex items-start justify-between"><div className="flex items-start space-x-3"><div className="p-2 bg-blue-50 rounded-lg"><Video className="w-5 h-5 text-blue-600" /></div><div><h3 className="font-medium text-gray-900">{meeting.title}</h3><p className="text-xs text-gray-500">
                      With {user?.id === meeting.hostId ? meeting.participantName : meeting.hostName}</p><div className="mt-2 flex items-center space-x-3 text-[11px] text-gray-500"><span className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{new Date(meeting.startTime).toLocaleDateString()}</span><span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{new Date(meeting.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></div></div></div>{meeting.meetingLink && <a
    href={meeting.meetingLink}
    target="_blank"
    rel="noopener noreferrer"
    className="p-1 px-2 text-[10px] font-bold text-blue-600 border border-blue-200 rounded bg-blue-50 hover:bg-blue-100 transition-colors flex items-center gap-1"
  >
                    Join <ExternalLink className="w-3 h-3" /></a>}</div></div>)}</div></CardBody></Card>;
};
export {
  UpcomingMeetings
};
