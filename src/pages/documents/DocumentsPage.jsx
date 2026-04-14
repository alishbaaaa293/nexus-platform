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
  return (
    <div className="space-y-8 animate-fade-in p-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Document Hub</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage, secure and sign your startup assets</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" leftIcon={<Lock size={18} />} className="flex-1 md:flex-none border-gray-200">
            Secure Chamber
          </Button>
          <Button leftIcon={<Upload size={18} />} className="flex-1 md:flex-none bg-primary-600 shadow-xl shadow-primary-500/20">
            Upload New
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 bg-gray-100/80 p-1 rounded-2xl w-fit backdrop-blur-md border border-gray-200/50 shadow-inner">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-8 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
            activeTab === "all" ? "bg-white text-primary-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          General Assets
        </button>
        <button
          onClick={() => setActiveTab("chamber")}
          className={`px-8 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2 ${
            activeTab === "chamber" ? "bg-white text-primary-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Shield size={16} className={activeTab === 'chamber' ? 'text-primary-500' : ''} />
          Deal Chamber
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-2xl bg-gradient-to-br from-gray-900 to-slate-800 text-white overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Shield size={120} />
            </div>
            <CardBody className="p-8 relative z-10">
              <div className="bg-primary-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-primary-500/30">
                <Lock className="text-primary-400" size={24} />
              </div>
              <h3 className="font-bold text-xl mb-3 tracking-tight">Vault Status</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Your Deal Chamber is 100% encrypted. You have <span className="text-primary-400 font-bold">2 documents</span> pending your verified signature.
              </p>
              <Button
                className="w-full bg-primary-600 hover:bg-primary-700 border-none text-white shadow-lg shadow-primary-500/20 py-6"
                rightIcon={<ArrowUpRight size={18} />}
              >
                Access Chamber
              </Button>
            </CardBody>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-50 px-6 py-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Categories</h3>
            </CardHeader>
            <CardBody className="py-3 px-2">
              <div className="space-y-1">
                {["Legal Agreements", "Financial Reports", "Pitch Decks", "Board Minutes"].map((f) => (
                  <button key={f} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-all">
                    {f}
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-100 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-gray-50 border-none focus:bg-white transition-all ring-0"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" leftIcon={<Filter size={16} />} className="h-12 px-6 font-bold">Filters</Button>
                </div>
              </div>
            </CardHeader>
            
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      <th className="px-8 py-5">Verified Asset</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Authority</th>
                      <th className="px-8 py-5 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {mockDeals.filter(d => activeTab === 'all' || d.type === 'Legal').map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50/50 transition-all group">
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-2xl border-2 ${
                              doc.status === "Signed" 
                                ? "bg-green-50 border-green-100 text-green-600" 
                                : "bg-blue-50 border-blue-100 text-blue-600"
                            }`}>
                              <FileText size={24} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{doc.name}</div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold text-gray-400">{doc.size}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <Badge variant="gray" className="text-[9px] uppercase tracking-tighter bg-gray-100">{doc.type}</Badge>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          {getStatusBadge(doc.id === "d1" && signedDoc ? "Signed" : doc.status)}
                        </td>
                        <td className="px-8 py-6 uppercase font-mono text-[10px] items-center gap-2 inline-flex mt-4">
                           <Shield size={12} className="text-primary-400" />
                           <span className="font-bold text-gray-700">{doc.owner}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" className="p-3 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                              <Eye size={20} />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-3 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                              <Download size={20} />
                            </Button>
                            {doc.status === "In Review" && !signedDoc && (
                              <Button
                                size="sm"
                                className="h-10 px-6 text-xs font-bold bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
                                leftIcon={<PenTool size={16} />}
                                onClick={() => setIsSigning(true)}
                              >
                                Sign Asset
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Signature Mock Modal */}
      {isSigning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-xl animate-fade-in">
          <Card className="w-full max-w-xl border-none shadow-2xl overflow-hidden animate-slide-up rounded-3xl">
            <CardHeader className="bg-white border-b border-gray-100 flex justify-between items-center p-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl">
                  <Shield size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-gray-900 tracking-tight">Secure Electronic Signature</h3>
                  <p className="text-sm text-gray-500">Legal verification for Seed Investment Agreement.pdf</p>
                </div>
              </div>
              <button onClick={() => setIsSigning(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} className="text-gray-400" />
              </button>
            </CardHeader>
            <CardBody className="p-10 space-y-8 bg-white">
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                <AlertCircle className="text-amber-500 shrink-0" size={24} />
                <p className="text-amber-800 text-sm leading-relaxed">
                  By signing this document, you acknowledge that you have read and understood all the terms of the investment. This signature is legally equivalent to your handwritten signature.
                </p>
              </div>

              <div className="space-y-6">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Authorized Signatory</label>
                <div className="border-b-4 border-gray-900/10 pb-4 group focus-within:border-primary-500 transition-all">
                  <input
                    type="text"
                    placeholder="Type your full legal name"
                    autoFocus
                    className="w-full bg-transparent border-none focus:ring-0 text-5xl font-signature italic text-gray-900"
                    onChange={(e) => setSignedDoc(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-gray-50 rounded-xl">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Audit Log ID</span>
                      <span className="font-mono text-xs font-bold text-gray-600">AUTH-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                   </div>
                   <div className="p-4 bg-gray-50 rounded-xl">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Timestamp</span>
                      <span className="font-mono text-xs font-bold text-gray-600">{new Date().toLocaleString()}</span>
                   </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button variant="outline" className="flex-1 py-4 border-gray-200" onClick={() => setIsSigning(false)}>Discard</Button>
                <Button
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 shadow-xl shadow-primary-500/20 active:scale-95 transition-all"
                  disabled={!signedDoc}
                  onClick={() => setIsSigning(false)}
                >
                  Confirm & Finalize Signature
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
export {
  DocumentsPage
};
