import { useState } from "react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Sparkles,
  Shield,
  Eye,
  Trash2,
  Smartphone,
  Key,
  Fingerprint
} from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Avatar } from "../../components/ui/Avatar";
import { useAuth } from "../../context/AuthContext";
const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  if (!user) return null;
  const tabs = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "security", icon: Lock, label: "Security" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "ai-match", icon: Sparkles, label: "AI Matchmaking" },
    { id: "billing", icon: CreditCard, label: "Billing" }
  ];
  return <div className="space-y-8 animate-fade-in pb-12"><div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"><div><h1 className="text-3xl font-bold text-gray-900 tracking-tight">Account Settings</h1><p className="text-gray-500 mt-1">Configure your personal and platform preferences</p></div><div className="flex gap-2"><Button variant="outline" size="sm" leftIcon={<Eye size={16} />}>View Public Profile</Button><Button size="sm">Save All Changes</Button></div></div><div className="grid grid-cols-1 lg:grid-cols-12 gap-8">{
    /* Settings navigation */
  }<div className="lg:col-span-3 space-y-4"><Card className="border-none shadow-sm bg-white p-2"><nav className="space-y-1">{tabs.map((tab) => <button
    key={tab.id}
    onClick={() => setActiveTab(tab.id)}
    className={`flex items-center w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === tab.id ? "bg-primary-50 text-primary-700 shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
  ><tab.icon size={20} className={`mr-3 ${activeTab === tab.id ? "text-primary-600" : "text-gray-400"}`} />{tab.label}</button>)}</nav></Card><Card className="border-none shadow-sm bg-error-50 p-4"><h3 className="text-sm font-bold text-error-700 mb-2 flex items-center gap-2"><Trash2 size={16} /> Danger Zone
            </h3><p className="text-xs text-error-600 mb-4 opacity-80">
              Once you delete your account, there is no going back. Please be certain.
            </p><Button variant="outline" className="w-full bg-transparent border-error-200 text-error-600 hover:bg-error-100 h-9 text-xs font-bold">
              Delete Account
            </Button></Card></div>{
    /* Main settings content */
  }<div className="lg:col-span-9 space-y-6">{activeTab === "profile" && <Card className="border-none shadow-sm animate-slide-up"><CardHeader className="border-b border-gray-50 p-6"><h2 className="text-xl font-bold text-gray-900">Personal Information</h2></CardHeader><CardBody className="p-8 space-y-8"><div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50/50 p-6 rounded-2xl border border-gray-100"><div className="relative group"><Avatar src={user.avatarUrl} alt={user.name} size="xl" className="ring-4 ring-white shadow-lg" /><button className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Smartphone size={20} /></button></div><div className="flex-1 text-center md:text-left space-y-3"><h3 className="font-bold text-gray-900 text-lg">Your Profile Picture</h3><p className="text-sm text-gray-500 max-w-sm">
                      We recommend an image of at least 400x400. Gifs work too!
                    </p><div className="flex justify-center md:justify-start gap-2 pt-2"><Button size="sm">Upload New</Button><Button variant="outline" size="sm">Remove</Button></div></div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Input label="Display Name" defaultValue={user.name} placeholder="e.g. John Doe" /><Input label="Email Address" type="email" defaultValue={user.email} /><Input label="Location" defaultValue="San Francisco, CA" /><Input label="Current Focus" defaultValue={user.role === "investor" ? "Growth Equity" : "SaaS Development"} /></div><div><label className="block text-sm font-bold text-gray-700 mb-2">Professional Bio</label><textarea
    className="w-full rounded-xl border-gray-200 bg-gray-50/30 focus:bg-white focus:ring-primary-500 focus:border-primary-500 transition-all"
    rows={4}
    defaultValue={user.bio}
    placeholder="Tell your story..."
  /></div></CardBody></Card>}{activeTab === "security" && <Card className="border-none shadow-sm animate-slide-up"><CardHeader className="border-b border-gray-50 p-6"><h2 className="text-xl font-bold text-gray-900">Security & Authentication</h2></CardHeader><CardBody className="p-8 space-y-8"><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="space-y-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><Key size={18} className="text-primary-600" /> Password Management
                    </h3><p className="text-sm text-gray-500">Update your account password regularly to stay secure.</p><Button variant="outline" size="sm">Change Password</Button></div><div className="space-y-4"><h3 className="font-bold text-gray-800 flex items-center gap-2"><Shield size={18} className="text-primary-600" /> Two-Factor Authentication
                    </h3><p className="text-sm text-gray-500">Add an extra layer of security using Google Authenticator.</p><Button size="sm" className="bg-primary-600">Enable 2FA</Button></div></div><div className="pt-8 border-t border-gray-100"><h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4"><Fingerprint size={18} className="text-primary-600" /> Biometric Login
                  </h3><div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"><div><p className="text-sm font-semibold text-gray-900">Face ID / Fingerprint</p><p className="text-xs text-gray-500 mt-0.5">Use your device biometrics for faster access.</p></div><div className="w-12 h-6 bg-gray-200 rounded-full cursor-pointer relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all" /></div></div></div></CardBody></Card>}{activeTab === "ai-match" && <Card className="border-none shadow-sm animate-slide-up overflow-hidden"><div className="bg-gradient-to-r from-primary-600 to-primary-400 p-8 text-white"><div className="flex items-center gap-4 mb-2"><div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md"><Sparkles size={28} /></div><div><h2 className="text-2xl font-bold">AI Matchmaking Intelligence</h2><p className="text-primary-50 opacity-90">Revolutionizing how you find your next business partner.</p></div></div></div><CardBody className="p-8 space-y-8"><div className="space-y-6"><div><div className="flex justify-between items-center mb-4"><label className="font-bold text-gray-800">Match Accuracy Sensitivity</label><span className="text-primary-600 font-bold bg-primary-50 px-3 py-1 rounded-full text-sm">Ultra Focused (95%+)</span></div><input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" /><div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase mt-2 tracking-widest"><span>Broad Discovery</span><span>Balanced</span><span>Niche Precision</span></div></div><div className="space-y-4 pt-4"><h3 className="font-bold text-gray-800">Matching Priorities</h3><div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{["Industry Alignment", "Funding Stage", "Location Proximity", "Team Size", "Revenue Range", "Growth Potential"].map((tag) => <div key={tag} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-primary-200 hover:bg-primary-50/30 transition-all cursor-pointer group"><div className="w-5 h-5 border-2 border-gray-300 rounded group-hover:border-primary-500 transition-colors" /><span className="text-sm font-medium text-gray-600 group-hover:text-primary-700">{tag}</span></div>)}</div></div></div><div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-4"><div className="p-2 bg-amber-100 text-amber-600 rounded-lg h-fit"><Bell size={20} /></div><div><p className="text-sm font-bold text-amber-800">Auto-Matching is enabled</p><p className="text-xs text-amber-700 opacity-80 mt-1 line-height-relaxed">
                      Nexus AI will automatically send invitations to startups/investors that match your "Ultra Focused" profile criteria.
                    </p></div></div></CardBody></Card>}</div></div></div>;
};
export {
  SettingsPage
};
