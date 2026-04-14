import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
const MeetingContext = createContext(void 0);
const MeetingProvider = ({ children }) => {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState([]);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const mockMeetings = [
      {
        id: "m1",
        title: "Strategy Session - TechWave AI",
        startTime: new Date(today.setHours(9, 30, 0, 0)).toISOString(),
        endTime: new Date(today.setHours(10, 30, 0, 0)).toISOString(),
        hostId: "i1",
        hostName: "Michael Rodriguez",
        participantId: "e1",
        participantName: "Sarah Johnson",
        status: "confirmed",
        type: "video",
        meetingLink: "/video/e1"
      },
      {
        id: "m2",
        title: "Seed Fund Presentation",
        startTime: new Date(today.setHours(14, 0, 0, 0)).toISOString(),
        endTime: new Date(today.setHours(15, 30, 0, 0)).toISOString(),
        hostId: "e1",
        hostName: "Sarah Johnson",
        participantId: "i2",
        participantName: "Jennifer Lee",
        status: "confirmed",
        type: "video",
        meetingLink: "/video/i2"
      },
      {
        id: "m3",
        title: "Product Roadmap Review",
        startTime: new Date(tomorrow.setHours(11, 0, 0, 0)).toISOString(),
        endTime: new Date(tomorrow.setHours(12, 0, 0, 0)).toISOString(),
        hostId: "e1",
        hostName: "Sarah Johnson",
        participantId: "i3",
        participantName: "Robert Torres",
        status: "pending",
        type: "video"
      },
      {
        id: "m4",
        title: "Investors' Lunch",
        startTime: new Date(tomorrow.setHours(13, 0, 0, 0)).toISOString(),
        endTime: new Date(tomorrow.setHours(14, 30, 0, 0)).toISOString(),
        hostId: "i1",
        hostName: "Michael Rodriguez",
        participantId: "e1",
        participantName: "Sarah Johnson",
        status: "confirmed",
        type: "in-person"
      }
    ];
    setMeetings(mockMeetings);

    const mockSlots = [
      {
        id: "s1",
        userId: "e1",
        startTime: new Date(today.setHours(16, 0, 0, 0)).toISOString(),
        endTime: new Date(today.setHours(17, 30, 0, 0)).toISOString()
      },
      {
        id: "s2",
        userId: "e1",
        startTime: new Date(tomorrow.setHours(9, 0, 0, 0)).toISOString(),
        endTime: new Date(tomorrow.setHours(10, 30, 0, 0)).toISOString()
      }
    ];
    setAvailabilitySlots(mockSlots);
  }, []);
  const addMeeting = async (meeting) => {
    const newMeeting = {
      ...meeting,
      id: `m${Math.random().toString(36).substr(2, 9)}`
    };
    setMeetings((prev) => [...prev, newMeeting]);
    toast.success("Meeting request sent!");
  };
  const updateMeetingStatus = async (meetingId, status) => {
    setMeetings((prev) => prev.map((m) => m.id === meetingId ? { ...m, status } : m));
    toast.success(`Meeting ${status}`);
  };
  const addAvailabilitySlot = async (slot) => {
    const newSlot = {
      ...slot,
      id: `s${Math.random().toString(36).substr(2, 9)}`
    };
    setAvailabilitySlots((prev) => [...prev, newSlot]);
    toast.success("Availability slot added");
  };
  const removeAvailabilitySlot = async (slotId) => {
    setAvailabilitySlots((prev) => prev.filter((s) => s.id !== slotId));
    toast.success("Availability slot removed");
  };
  return <MeetingContext.Provider value={{
    meetings,
    availabilitySlots,
    addMeeting,
    updateMeetingStatus,
    addAvailabilitySlot,
    removeAvailabilitySlot
  }}>{children}</MeetingContext.Provider>;
};
const useMeetings = () => {
  const context = useContext(MeetingContext);
  if (context === void 0) {
    throw new Error("useMeetings must be used within a MeetingProvider");
  }
  return context;
};
export {
  MeetingProvider,
  useMeetings
};
