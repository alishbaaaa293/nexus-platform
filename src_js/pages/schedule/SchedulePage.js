import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAuth } from "../../context/AuthContext";
import { useMeetings } from "../../context/MeetingContext";
import { Calendar, Clock, Check, X, Video } from "lucide-react";
const SchedulePage = () => {
  const { user } = useAuth();
  const { meetings, availabilitySlots, updateMeetingStatus, addAvailabilitySlot } = useMeetings();
  const [view, setView] = useState("calendar");
  const userMeetings = meetings.filter((m) => m.hostId === user?.id || m.participantId === user?.id);
  const pendingRequests = userMeetings.filter((m) => m.status === "pending" && m.participantId === user?.id);
  const calendarEvents = [
    ...userMeetings.map((m) => ({
      id: m.id,
      title: m.title,
      start: m.startTime,
      end: m.endTime,
      backgroundColor: m.status === "confirmed" ? "#3B82F6" : "#94A3B8",
      borderColor: m.status === "confirmed" ? "#2563EB" : "#64748B",
      extendedProps: { ...m, entryType: "meeting" }
    })),
    ...availabilitySlots.filter((s) => s.userId === user?.id).map((s) => ({
      id: s.id,
      title: "Available Slot",
      start: s.startTime,
      end: s.endTime,
      backgroundColor: "#10B981",
      borderColor: "#059669",
      extendedProps: { ...s, entryType: "slot" }
    }))
  ];
  const handleDateSelect = (selectInfo) => {
    const title = prompt("Enter a title for your availability slot:");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      addAvailabilitySlot({
        userId: user.id,
        startTime: selectInfo.startStr,
        endTime: selectInfo.endStr
      });
    }
  };
  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    if (event.extendedProps.entryType === "meeting") {
      alert(`Meeting: ${event.title}
Status: ${event.extendedProps.status}`);
    }
  };
  return <div className="space-y-6"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div><h1 className="text-2xl font-bold text-gray-900 font-outfit">Schedules & Meetings</h1><p className="text-gray-500">Manage your availability and upcoming meetings</p></div><div className="flex bg-white rounded-lg p-1 border border-gray-200"><button
    onClick={() => setView("calendar")}
    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === "calendar" ? "bg-primary-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
  ><Calendar className="w-4 h-4 inline-block mr-2" />
            Calendar
          </button><button
    onClick={() => setView("requests")}
    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all relative ${view === "requests" ? "bg-primary-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
  ><Clock className="w-4 h-4 inline-block mr-2" />
            Requests
            {pendingRequests.length > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{pendingRequests.length}</span>}</button></div></div>{view === "calendar" ? <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><div className="mb-4 flex items-center gap-4 text-sm"><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-primary-500" /><span>Confirmed Meetings</span></div><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-400" /><span>Pending Meetings</span></div><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span>Available Slots</span></div></div><div className="calendar-container"><FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    initialView="timeGridWeek"
    headerToolbar={{
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    }}
    editable={true}
    selectable={true}
    selectMirror={true}
    dayMaxEvents={true}
    events={calendarEvents}
    select={handleDateSelect}
    eventClick={handleEventClick}
    height="auto"
  /></div></div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{pendingRequests.length > 0 ? pendingRequests.map((meeting) => <div key={meeting.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"><div className="p-5"><div className="flex items-start justify-between"><div className="flex items-center space-x-3"><div className="p-2 bg-primary-50 rounded-lg"><Video className="w-5 h-5 text-primary-600" /></div><div><h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3><p className="text-sm text-gray-500">With {user?.role === "investor" ? meeting.participantName : meeting.hostName}</p></div></div></div><div className="mt-4 space-y-3"><div className="flex items-center text-sm text-gray-600"><Calendar className="w-4 h-4 mr-2 text-gray-400" />{new Date(meeting.startTime).toLocaleDateString()}</div><div className="flex items-center text-sm text-gray-600"><Clock className="w-4 h-4 mr-2 text-gray-400" />{new Date(meeting.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - 
                      {new Date(meeting.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div></div><div className="mt-6 flex gap-3"><button
    onClick={() => updateMeetingStatus(meeting.id, "confirmed")}
    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
  ><Check className="w-4 h-4" />
                      Accept
                    </button><button
    onClick={() => updateMeetingStatus(meeting.id, "declined")}
    className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
  ><X className="w-4 h-4" />
                      Decline
                    </button></div></div></div>) : <div className="col-span-full py-20 bg-white rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-500"><Calendar className="w-12 h-12 mb-3 text-gray-300" /><p className="text-lg font-medium">No pending requests</p><p className="text-sm">You're all caught up!</p></div>}</div>}</div>;
};
export {
  SchedulePage
};
