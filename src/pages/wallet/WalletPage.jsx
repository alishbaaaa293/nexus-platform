import { useState } from "react";
import { 
  ArrowUpRight, ArrowDownLeft, RefreshCcw, Wallet, 
  CreditCard, ExternalLink, Activity, CheckCircle2,
  Clock, XCircle, Search
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";

const mockTransactions = [
  {
    id: "tx1",
    type: "deposit",
    amount: 500000,
    date: "2024-04-10T09:30:00Z",
    status: "completed",
    description: "Deposit via Wire Transfer",
    entity: "Chase Bank ****1234"
  },
  {
    id: "tx2",
    type: "transfer",
    amount: -150000,
    date: "2024-04-09T14:15:00Z",
    status: "completed",
    description: "Seed Investment",
    entity: "TechWave AI"
  },
  {
    id: "tx3",
    type: "transfer",
    amount: -50000,
    date: "2024-04-08T11:20:00Z",
    status: "pending",
    description: "Bridge Loan",
    entity: "Fintekk Solutions"
  },
  {
    id: "tx4",
    type: "withdrawal",
    amount: -10000,
    date: "2024-04-05T16:45:00Z",
    status: "failed",
    description: "Withdrawal to Bank",
    entity: "Chase Bank ****1234"
  }
];

export const WalletPage = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(user?.role === "investor" ? 2500000 : 150000);
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [amount, setAmount] = useState("");
  
  const handleAction = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    setAmount("");
  };

  const executeTransaction = (e) => {
    e.preventDefault();
    const val = parseFloat(amount.replace(/,/g, ''));
    if (!isNaN(val) && val > 0) {
      if (modalType === 'deposit') setBalance(b => b + val);
      else if (modalType === 'withdraw' || modalType === 'transfer') setBalance(b => b - val);
    }
    setIsModalOpen(false);
    alert(`Mock ${modalType} of $${val} submitted successfully.`);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "completed": return <CheckCircle2 size={16} className="text-green-500" />;
      case "pending": return <Clock size={16} className="text-yellow-500" />;
      case "failed": return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="space-y-8 animate-fade-in p-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Financial Wallet</h1>
          <p className="text-gray-500 mt-1">Manage platform funds and deal transactions safely.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Wallet Balance & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gradient-to-br from-slate-900 to-black text-white border-0 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Wallet size={120} />
            </div>
            <CardBody className="p-8 relative z-10">
              <div className="flex items-center space-x-2 text-gray-300 mb-4">
                <Wallet size={20} />
                <span className="font-medium text-sm tracking-wide uppercase">Total Balance</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight mb-8">
                {formatCurrency(balance)}
              </h2>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button onClick={() => handleAction("deposit")} className="bg-white/10 hover:bg-white/20 transition-colors py-3 rounded-xl flex flex-col items-center justify-center gap-2 font-medium text-sm">
                  <ArrowDownLeft size={20} className="text-green-400" />
                  Deposit
                </button>
                <button onClick={() => handleAction("withdraw")} className="bg-white/10 hover:bg-white/20 transition-colors py-3 rounded-xl flex flex-col items-center justify-center gap-2 font-medium text-sm">
                  <ArrowUpRight size={20} className="text-primary-400" />
                  Withdraw
                </button>
              </div>
              {user?.role === "investor" && (
                <button onClick={() => handleAction("transfer")} className="w-full mt-3 bg-primary-600 hover:bg-primary-700 transition-colors py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm shadow-lg shadow-primary-500/20">
                  <RefreshCcw size={18} />
                  Fund a Deal (Transfer)
                </button>
              )}
            </CardBody>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <CreditCard size={18} className="text-gray-400"/> Payment Methods
              </h3>
            </CardHeader>
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-900 rounded flex items-center justify-center text-white text-[8px] font-bold tracking-widest">VISA</div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Chase Bank</h4>
                    <p className="text-xs text-gray-500">**** 1234</p>
                  </div>
                </div>
                <Badge variant="success">Primary</Badge>
              </div>
              <Button variant="outline" className="w-full border-dashed" size="sm">+ Add Method</Button>
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Transaction History */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-full border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Activity size={18} className="text-primary-600"/> Transaction History
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setActiveTab("all")} className={activeTab === "all" ? "bg-gray-100" : ""}>All</Button>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("deposit")} className={activeTab === "deposit" ? "bg-gray-100" : ""}>In</Button>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("transfer")} className={activeTab === "transfer" ? "bg-gray-100" : ""}>Out</Button>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
                      <th className="px-6 py-4">Transaction</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {mockTransactions.filter(t => activeTab === 'all' || t.type === activeTab).map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${tx.amount > 0 ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                              {tx.amount > 0 ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{tx.description}</div>
                              <div className="text-[11px] text-gray-500">{tx.entity}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-bold ${tx.amount > 0 ? "text-green-600" : "text-gray-900"}`}>
                            {tx.amount > 0 ? "+" : ""}{formatCurrency(tx.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-1">
                          {getStatusIcon(tx.status)}
                          <span className="text-xs font-medium capitalize text-gray-600">{tx.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right text-xs text-gray-500">
                          {new Date(tx.date).toLocaleDateString()}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <Card className="w-full max-w-sm border-none shadow-2xl overflow-hidden animate-slide-up">
            <CardHeader className="bg-white border-b border-gray-100 p-6 flex justify-between items-center">
              <h3 className="font-bold text-xl capitalize text-gray-900">{modalType} Funds</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><XCircle size={20}/></button>
            </CardHeader>
            <CardBody className="p-6">
              <form onSubmit={executeTransaction} className="space-y-4">
                {modalType === "transfer" && (
                  <Input label="Recipient (Startup Name or ID)" placeholder="e.g. TechWave AI" required fullWidth />
                )}
                <Input 
                  label="Amount (USD)" 
                  type="number" 
                  min="1" 
                  placeholder="50000" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required 
                  fullWidth 
                  startAdornment={<span className="text-gray-500 font-bold">$</span>}
                />
                <Button type="submit" fullWidth className="mt-2 bg-primary-600">
                  Confirm {modalType}
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
