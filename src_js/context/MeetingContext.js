import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
const MeetingContext = createContext(void 0);
const MeetingProvider = ({ children }) => {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState([]);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  useEffect(() => {
    const mockMeetings = [
      {
        id: "m1",
        title: "Initial Pitch - TechWave AI",
        startTime: new Date((/* @__PURE__ */ new Date()).setHours(10, 0, 0, 0)).toISOString(),
        endTime: new Date((/* @__PURE__ */ new Date()).setHours(11, 0, 0, 0)).toISOString(),
        hostId: "i1",
        hostName: "Michael Rodriguez",
        participantId: "e1",
        participantName: "Sarah Johnson",
        status: "confirmed",
        type: "video",
        meetingLink: "https://meet.jit.si/nexus-m1"
      },
      {
        id: "m2",
        title: "Follow-up Discussion",
        startTime: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 1)).toISOString(),
        endTime: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 1)).toISOString(),
        hostId: "e1",
        hostName: "Sarah Johnson",
        participantId: "i2",
        participantName: "Jennifer Lee",
        status: "pending",
        type: "video"
      }
    ];
    setMeetings(mockMeetings);
    const mockSlots = [
      {
        id: "s1",
        userId: "i1",
        startTime: new Date((/* @__PURE__ */ new Date()).setHours(14, 0, 0, 0)).toISOString(),
        endTime: new Date((/* @__PURE__ */ new Date()).setHours(15, 0, 0, 0)).toISOString()
      },
      {
        id: "s2",
        userId: "i1",
        startTime: new Date((/* @__PURE__ */ new Date()).setHours(16, 0, 0, 0)).toISOString(),
        endTime: new Date((/* @__PURE__ */ new Date()).setHours(17, 0, 0, 0)).toISOString()
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
