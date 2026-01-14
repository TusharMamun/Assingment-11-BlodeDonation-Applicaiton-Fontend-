import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Uicomponent/Loadding";
import { 
  Search, 
  RefreshCw, 
  PlusCircle, 
  Download, 
  Copy, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  ExternalLink,
  X,
  CheckCircle
} from "lucide-react";

const Funding = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // UI states
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [filter, setFilter] = useState("all"); // all, this-month, last-month

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["my-fundings", user?.email, page, limit, filter],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/my-fundings", {
        params: { 
          email: user.email, 
          page, 
          limit,
          filter 
        },
      });
      return res.data;
    },
  });

  const fundings = data?.fundings || [];
  const total = Number(data?.total || 0);
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.totalCount ?? fundings.length;

  // Calculate statistics
  const statistics = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    let thisMonthTotal = 0;
    let lastMonthTotal = 0;
    let averageDonation = totalCount > 0 ? total / totalCount : 0;
    
    fundings.forEach(f => {
      if (!f?.paidAt) return;
      const date = new Date(f.paidAt);
      const amount = Number(f.amount || 0);
      
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        thisMonthTotal += amount;
      } else if (
        (date.getMonth() === currentMonth - 1 && date.getFullYear() === currentYear) ||
        (date.getMonth() === 11 && currentMonth === 0 && date.getFullYear() === currentYear - 1)
      ) {
        lastMonthTotal += amount;
      }
    });
    
    return {
      thisMonthTotal,
      lastMonthTotal,
      averageDonation,
      growth: lastMonthTotal > 0 
        ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal * 100).toFixed(1)
        : 0
    };
  }, [fundings, total, totalCount]);

  // Filter fundings by search term
  const filteredFundings = useMemo(() => {
    if (!searchTerm.trim()) return fundings;
    
    const searchLower = searchTerm.toLowerCase();
    return fundings.filter(f => {
      const name = (f?.donorName || "").toLowerCase();
      const session = (f?.sessionId || "").toLowerCase();
      const email = (f?.donorEmail || "").toLowerCase();
      const intent = (f?.paymentIntent || "").toLowerCase();
      
      return name.includes(searchLower) || 
             session.includes(searchLower) || 
             email.includes(searchLower) || 
             intent.includes(searchLower);
    });
  }, [fundings, searchTerm]);

  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ 
    defaultValues: { amount: "" }, 
    mode: "onChange" 
  });

  const amountValue = watch("amount");

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (formData) => {
    try {
      const amount = Number(formData.amount);
      if (!user?.email) throw new Error("User email missing");
      if (!amount || amount < 1) throw new Error("Amount must be at least 1");

      const paymentinfo = {
        name: user?.displayName || "Anonymous",
        email: user.email,
        amount,
      };

      const res = await axiosSecure.post("/create-checkout-session", paymentinfo);
      const url = res?.data?.url;

      if (!url) throw new Error("No checkout url returned from server");

      closeModal();
      window.location.href = url;
    } catch (err) {
      console.log("Checkout error:", err?.response?.data || err.message);
    }
  };

  const quickAmounts = [200, 500, 1000, 2000, 5000];

  const handleCopyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Funding
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                Track your donations, manage funding history, and support our mission to save lives through blood donation initiatives.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                {isFetching ? 'Refreshing...' : 'Refresh'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl transition-all duration-300"
              >
                <PlusCircle className="w-5 h-5" />
                New Donation
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="absolute top-4 right-4 p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Fund</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">৳ {total.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Lifetime contributions</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="absolute top-4 right-4 p-3 rounded-full bg-green-100 dark:bg-green-900/30">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">This Month</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">৳ {Number(statistics.thisMonthTotal).toLocaleString()}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs font-medium ${parseFloat(statistics.growth) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {parseFloat(statistics.growth) >= 0 ? '↗' : '↘'} {Math.abs(parseFloat(statistics.growth))}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="absolute top-4 right-4 p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Donations</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{Number(totalCount).toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Average: ৳ {Number(statistics.averageDonation).toLocaleString()}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="absolute top-4 right-4 p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Last Month</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">৳ {Number(statistics.lastMonthTotal).toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Previous contributions</p>
          </motion.div>
        </div>

        {/* Main Content Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden"
        >
          {/* Header with Search and Filters */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Funding History</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Page {page} of {totalPages} • {filteredFundings.length} of {totalCount} donations
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Filter Tabs */}
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
                  {['all', 'this-month', 'last-month'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filter === f 
                          ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' 
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {f === 'all' ? 'All' : f === 'this-month' ? 'This Month' : 'Last Month'}
                    </button>
                  ))}
                </div>
                
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search donations..."
                    className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          {isError ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                <X className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {error?.message || "Failed to load fundings"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Please try refreshing the page
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : fundings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
                <DollarSign className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No funding history yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                Make your first donation to support blood donation initiatives and help save lives.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Make First Donation
              </motion.button>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Donor
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {filteredFundings.map((f, index) => (
                      <motion.tr
                        key={f._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {(f.donorName || user?.displayName || "U")[0].toUpperCase()}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {f.donorName || user?.displayName || "Anonymous"}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                                ID: {f.sessionId?.slice(-8) || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">
                            ৳ {Number(f.amount || 0).toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {f.paidAt ? formatDate(f.paidAt) : "—"}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {f.paymentStatus || 'Paid'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleCopyId(f.sessionId)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            >
                              {copiedId === f.sessionId ? (
                                <>
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  Copy ID
                                </>
                              )}
                            </motion.button>
                            <button
                        
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Receipt
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                    
                    {filteredFundings.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 mb-4">
                            <Search className="w-6 h-6 text-gray-400" />
                          </div>
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No results found
                          </h4>
                          <p className="text-gray-500 dark:text-gray-400">
                            No donations match "{searchTerm}"
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {filteredFundings.length} of {totalCount} donations
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </motion.button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            page === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Donation Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Make a Donation</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Secure payment via Stripe Checkout
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 space-y-6">
                  {/* Donor Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {user?.displayName?.[0]?.toUpperCase() || 'A'}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user?.displayName || 'Anonymous'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {user?.email || 'No email provided'}
                        </p>
                      </div>
                      <Shield className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  {/* Quick Amounts */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Quick Select
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {quickAmounts.map((amount) => (
                        <motion.button
                          key={amount}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setValue("amount", String(amount), { shouldValidate: true })}
                          className={`p-3 rounded-xl text-center transition-all ${
                            amountValue === String(amount)
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                              : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className="text-lg font-bold">৳ {amount}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Custom Amount
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        ৳
                      </div>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Enter amount"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-colors ${
                          errors.amount
                            ? 'border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        } bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none`}
                        {...register("amount", {
                          required: "Amount is required",
                          min: { value: 1, message: "Minimum donation is ৳ 1" },
                          max: { value: 1000000, message: "Maximum donation is ৳ 1,000,000" }
                        })}
                      />
                    </div>
                    {errors.amount && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>

                  {/* Security Note */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Secure Payment
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Your payment is processed securely by Stripe. We never store your card details.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Donate ৳ {amountValue || '0'}
                      </span>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Funding;