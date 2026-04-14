import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ScreenShare,
  Settings,
  Users,
  MessageSquare,
  User
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { findUserById } from "../../data/users";
const VideoCallPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const otherUser = findUserById(userId || "");
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const handleEndCall = () => {
    navigate(-1);
  };
  return <div className="h-screen bg-slate-950 flex flex-col overflow-hidden text-white">{
    /* Top Header */
  }<div className="p-4 flex items-center justify-between bg-black/20 backdrop-blur-md"><div className="flex items-center space-x-3"><div className="p-2 bg-primary-600 rounded-lg"><Video className="w-5 h-5" /></div><div><h2 className="text-sm font-semibold">Nexus Meet</h2><p className="text-[10px] text-gray-400">Secure • End-to-end encrypted</p></div></div><div className="flex items-center space-x-4"><div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-medium"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /><span>{formatTime(callDuration)}</span></div><button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Users className="w-5 h-5" /></button><button className="p-2 hover:bg-white/10 rounded-full transition-colors"><MessageSquare className="w-5 h-5" /></button></div></div>{
    /* Main Video Area */
  }<div className="flex-1 relative p-4 flex items-center justify-center gap-4 group">{
    /* Remote Video (Mock) */
  }<div className="relative flex-1 h-full rounded-2xl overflow-hidden bg-slate-900 border border-white/5 shadow-2xl">{otherUser ? <img
    src={otherUser.avatarUrl}
    alt={otherUser.name}
    className="w-full h-full object-cover blur-sm opacity-40"
  /> : <div className="w-full h-full flex items-center justify-center"><User className="w-20 h-20 text-gray-700" /></div>}<div className="absolute inset-0 flex flex-col items-center justify-center">{otherUser && <><div className="relative"><img
    src={otherUser.avatarUrl}
    alt={otherUser.name}
    className="w-32 h-32 rounded-full border-4 border-primary-500 shadow-xl object-cover"
  /><div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-slate-900 rounded-full" /></div><h3 className="mt-4 text-xl font-bold">{otherUser.name}</h3><p className="text-gray-400 text-sm">{otherUser.role}</p></>}</div>{
    /* Internal Label */
  }<div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10"><div className="w-2 h-2 bg-primary-500 rounded-full" /><span className="text-xs font-medium">{otherUser?.name || "Loading..."}</span></div></div>{
    /* Local Video - Floating */
  }<div className="absolute bottom-6 right-6 w-48 h-36 rounded-xl overflow-hidden bg-slate-800 border-2 border-white/10 shadow-2xl z-10 hover:scale-105 transition-transform duration-300">{isVideoOn ? <div className="w-full h-full bg-gradient-to-br from-primary-900/20 to-secondary-900/20 relative"><img
    src={user?.avatarUrl}
    alt="Me"
    className="w-full h-full object-cover opacity-80"
  /><div className="absolute bottom-2 left-2 flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md"><span className="text-[10px] font-medium">You</span></div></div> : <div className="w-full h-full flex items-center justify-center bg-slate-800"><VideoOff className="w-8 h-8 text-gray-600" /></div>}</div></div>{
    /* Bottom Controls */
  }<div className="p-6 flex items-center justify-center"><div className="bg-white/10 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-3xl flex items-center space-x-6 shadow-2xl"><button
    onClick={() => setIsMicOn(!isMicOn)}
    className={`p-4 rounded-2xl transition-all duration-300 ${isMicOn ? "bg-white/10 hover:bg-white/20" : "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20"}`}
  >{isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}</button><button
    onClick={() => setIsVideoOn(!isVideoOn)}
    className={`p-4 rounded-2xl transition-all duration-300 ${isVideoOn ? "bg-white/10 hover:bg-white/20" : "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20"}`}
  >{isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}</button><button
    onClick={() => setIsScreenSharing(!isScreenSharing)}
    className={`p-4 rounded-2xl transition-all duration-300 ${isScreenSharing ? "bg-primary-600 shadow-lg shadow-primary-500/20" : "bg-white/10 hover:bg-white/20"}`}
  ><ScreenShare className="w-6 h-6" /></button><div className="w-px h-8 bg-white/10" /><button className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"><Settings className="w-6 h-6" /></button><button
    onClick={handleEndCall}
    className="p-4 bg-red-600 hover:bg-red-700 rounded-2xl transition-all shadow-lg shadow-red-600/40 transform hover:rotate-12 active:scale-95"
  ><PhoneOff className="w-6 h-6" /></button></div></div></div>;
};
export {
  VideoCallPage
};
