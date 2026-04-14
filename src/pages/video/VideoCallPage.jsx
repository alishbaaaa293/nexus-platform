import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  User,
  Settings,
  Maximize2
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useMeetings } from "../../context/MeetingContext";
import { Badge } from "../../components/ui/Badge";
import toast from "react-hot-toast";

const VideoCallPage = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const { meetings } = useMeetings();
  const navigate = useNavigate();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const localVideoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        streamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        toast.error("Could not access camera/microphone");
        setIsVideoOn(false);
        setIsMicOn(false);
      }
    };

    startMedia();

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = isVideoOn;
      }
    }
  }, [isVideoOn]);

  useEffect(() => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = isMicOn;
      }
    }
  }, [isMicOn]);

  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    toast.success("Call ended");
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center py-10 animate-fade-in">
      <div className="w-full max-w-5xl">
        <h1 className="text-xl font-bold text-gray-900 text-center mb-8 tracking-tight">
          Video Call Room: <span className="font-mono text-primary-600">{userId || '69c56aa317346ffe7cbeef81'}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Local Video */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl group">
            {isVideoOn ? (
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-700">
                  <User size={40} className="text-gray-500" />
                </div>
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/10 uppercase tracking-widest">
              You (Local)
            </div>
            {!isMicOn && (
              <div className="absolute top-4 right-4 bg-red-500 p-1.5 rounded-full shadow-lg">
                <MicOff size={14} className="text-white" />
              </div>
            )}
          </div>

          {/* Remote Video Mock */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
               <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-700 animate-pulse">
                    <User size={40} className="text-gray-600" />
                  </div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Awaiting Peer Connection...</p>
               </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/10 uppercase tracking-widest">
              Michael Rodriguez (Remote)
            </div>
          </div>
        </div>

        {/* Action Controls - Exact SS Match */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={toggleMic}
            className={`px-8 py-3 rounded-md text-sm font-bold transition-all active:scale-95 shadow-lg ${
              isMicOn 
                ? "bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700" 
                : "bg-red-500 text-white shadow-red-500/20 hover:bg-red-600"
            }`}
          >
            {isMicOn ? "Mute" : "Unmute"}
          </button>
          
          <button
            onClick={toggleVideo}
            className={`px-8 py-3 rounded-md text-sm font-bold transition-all active:scale-95 shadow-lg ${
              isVideoOn 
                ? "bg-amber-400 text-white shadow-amber-400/20 hover:bg-amber-500" 
                : "bg-gray-600 text-white shadow-gray-600/20 hover:bg-gray-700"
            }`}
          >
            {isVideoOn ? "Camera Off" : "Camera On"}
          </button>
          
          <button
            onClick={handleEndCall}
            className="px-8 py-3 bg-red-600 text-white rounded-md text-sm font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-600/20"
          >
            Leave Call
          </button>
        </div>
      </div>
    </div>
  );
};

export { VideoCallPage };
