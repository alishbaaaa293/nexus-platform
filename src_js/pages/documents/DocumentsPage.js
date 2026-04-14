import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Shield,
  AlertCircle,
  PenTool,
  Filter,
  Search,
  ArrowUpRight,
  Lock,
  Eye
} from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";
const mockDeals = [
  {
    id: "d1",
    name: "Seed Investment Agreement.pdf",
    type: "Legal",
    size: "1.4 MB",
    lastModified: "2024-03-28",
    status: "In Review",
    owner: "Nexus Legal",
    priority: "High"
  },
  {
    id: "d2",
    name: "Intellectual Property Transfer.pdf",
    type: "Legal",
    size: "850 KB",
    lastModified: "2024-03-25",
    status: "Signed",
    owner: "Nexus Legal",
    priority: "Medium"
  },
  {
    id: "d3",
    name: "Draft Term Sheet - Series A.pdf",
    type: "Draft",
    size: "2.1 MB",
    lastModified: "2024-04-01",
    status: "Draft",
    owner: "You",
    priority: "Critical"
  }
];
const DocumentsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [signedDoc, setSignedDoc] = useState(null);
  const getStatusBadge = (status) => {
    switch (status) {
      case "Signed":
        return <Badge variant="primary" className="bg-green-100 text-green-700 border-green-200">Signed</Badge>;
      case "In Review":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">In Review</Badge>;
      case "Draft":
        return <Badge variant="gray" className="bg-gray-100 text-gray-700 border-gray-200">Draft</Badge>;
      default:
        return <Badge variant="gray">{status}</Badge>;
    }
  };
  return <div className="space-y-8 animate-fade-in p-2">{
    /* Header */
  }<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"><div><h1 className="text-3xl font-bold text-gray-900 tracking-tight">Document Hub</h1><p className="text-gray-500 mt-1">Manage, secure and sign your startup assets</p></div><div className="flex gap-2 w-full md:w-auto"><Button variant="outline" leftIcon={<Lock size={18} />} className="flex-1 md:flex-none">
            Secure Chamber
          </Button><Button leftIcon={<Upload size={18} />} className="flex-1 md:flex-none shadow-lg shadow-primary-500/20">
            Upload New
          </Button></div></div>{
    /* Tabs */
  }<div className="flex items-center space-x-1 bg-gray-100/80 p-1 rounded-xl w-fit backdrop-blur-sm border border-gray-200"><button
    onClick={() => setActiveTab("all")}
    className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === "all" ? "bg-white text-primary-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
  >
          General Assets
        </button><button
    onClick={() => setActiveTab("chamber")}
    className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${activeTab === "chamber" ? "bg-white text-primary-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
  ><Shield size={16} />
          Deal Chamber
        </button></div><div className="grid grid-cols-1 lg:grid-cols-4 gap-8">{
    /* Sidebar */
  }<div className="space-y-6"><Card className="border-none shadow-sm bg-gradient-to-br from-primary-600 to-primary-700 text-white overflow-hidden relative"><div className="absolute top-0 right-0 p-4 opacity-10"><Shield size={80} /></div><CardBody className="p-6 relative z-10"><h3 className="font-bold text-lg mb-2">Deal Chamber</h3><p className="text-primary-100 text-sm mb-4">You have 2 documents pending your signature.</p><Button
    variant="outline"
    className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
    rightIcon={<ArrowUpRight size={16} />}
  >
                Enter Chamber
              </Button></CardBody></Card><Card className="border-gray-200 shadow-sm"><CardHeader className="border-b border-gray-50"><h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Quick Filters</h3></CardHeader><CardBody className="py-2"><div className="space-y-1">{["Recently Modified", "Starred Files", "Shared with Me", "Contracts"].map((f) => <button key={f} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">{f}</button>)}</div></CardBody></Card></div>{
    /* Content Area */
  }<div className="lg:col-span-3 space-y-6"><Card className="border-gray-200 shadow-sm overflow-hidden"><CardHeader className="bg-gray-50/50 border-b border-gray-100"><div className="flex flex-col md:flex-row md:items-center justify-between gap-4"><div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" /><Input
    placeholder="Find a document..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 h-10 bg-white border-gray-200"
  /></div><Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>Filters</Button></div></CardHeader><CardBody className="p-0"><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100"><th className="px-6 py-4">Document Name</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Owner</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-gray-50">{mockDeals.map((doc) => <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group"><td className="px-6 py-5"><div className="flex items-center space-x-4"><div className={`p-2 rounded-xl border ${doc.status === "Signed" ? "bg-green-50 border-green-100 text-green-600" : "bg-blue-50 border-blue-100 text-blue-600"}`}><FileText size={20} /></div><div><div className="text-sm font-semibold text-gray-900 leading-none mb-1">{doc.name}</div><div className="text-[11px] text-gray-500">{doc.size} • {doc.type}</div></div></div></td><td className="px-6 py-5">{getStatusBadge(doc.id === "d1" && signedDoc ? "Signed" : doc.status)}</td><td className="px-6 py-5"><span className="text-sm font-medium text-gray-700">{doc.owner}</span></td><td className="px-6 py-5 text-right"><div className="flex items-center justify-end space-x-2"><Button variant="ghost" size="sm" className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"><Eye size={18} className="text-gray-400" /></Button><Button variant="ghost" size="sm" className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"><Download size={18} className="text-gray-400" /></Button>{doc.status === "In Review" && !signedDoc && <Button
    size="sm"
    className="h-8 text-[11px] font-bold"
    leftIcon={<PenTool size={14} />}
    onClick={() => setIsSigning(true)}
  >
                                Sign
                              </Button>}</div></td></tr>)}</tbody></table></div></CardBody></Card></div></div>{
    /* Signature Mock Modal */
  }{isSigning && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"><Card className="w-full max-w-md border-none shadow-2xl overflow-hidden animate-slide-up"><CardHeader className="bg-primary-600 text-white flex justify-between items-center p-6"><div className="flex items-center gap-3"><div className="p-2 bg-white/10 rounded-lg"><PenTool size={20} /></div><h3 className="font-bold text-xl">Electronic Signature</h3></div><button onClick={() => setIsSigning(false)} className="hover:rotate-90 transition-transform"><AlertCircle className="rotate-45" /></button></CardHeader><CardBody className="p-8 space-y-6"><p className="text-gray-600 text-sm italic">
                By typing your name below, you agree that this electronic signature is as legally binding as your physical signature.
              </p><div className="space-y-4"><div className="border-b-2 border-gray-400 pb-2"><input
    type="text"
    placeholder="Type your full name"
    className="w-full bg-transparent border-none focus:ring-0 text-3xl font-signature italic text-gray-900"
    onChange={(e) => setSignedDoc(e.target.value)}
  /></div><div className="flex items-center gap-2 text-xs text-gray-400"><Shield size={14} /><span>IP: 192.168.1.1 • Timestamp: {(/* @__PURE__ */ new Date()).toLocaleString()}</span></div></div><div className="flex gap-4 pt-4"><Button variant="outline" className="flex-1" onClick={() => setIsSigning(false)}>Cancel</Button><Button
    className="flex-1 bg-primary-600 shadow-lg shadow-primary-500/20"
    disabled={!signedDoc}
    onClick={() => {
      setIsSigning(false);
    }}
  >
                  Finalize Signature
                </Button></div></CardBody></Card></div>}</div>;
};
export {
  DocumentsPage
};
