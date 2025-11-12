import React, { useState } from 'react';
import { Users, Car, ShoppingBag, MessageSquare, TrendingUp, AlertCircle, CheckCircle, XCircle, RefreshCw, LogOut, Bell, Search } from 'lucide-react';

const DashboardSamples = () => {
  const [activeDesign, setActiveDesign] = useState(1);
  const [universities, setUniversities] = useState([
    { id: 1, name: 'Delhi University', submitted: '2 hours ago', students: 12450, status: 'pending' },
    { id: 2, name: 'IIT Bombay', submitted: '5 hours ago', students: 8900, status: 'pending' },
    { id: 3, name: 'BITS Pilani', submitted: '1 day ago', students: 6700, status: 'pending' },
    { id: 4, name: 'Mumbai University', submitted: '2 days ago', students: 15200, status: 'pending' },
  ]);

  const handleAction = (id, action) => {
    setUniversities(universities.map(uni => 
      uni.id === id ? { ...uni, status: action } : uni
    ));
  };

  // Design 1: Modern Purple Gradient
  const Design1 = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Syinq Admin</h1>
              <p className="text-sm text-gray-500">University Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@syinq.com</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Students</p>
            <p className="text-3xl font-bold text-gray-900">45,231</p>
            <p className="text-green-500 text-sm mt-2">+12% this month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Active Rides</p>
            <p className="text-3xl font-bold text-gray-900">1,284</p>
            <p className="text-green-500 text-sm mt-2">+8% this week</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Marketplace Items</p>
            <p className="text-3xl font-bold text-gray-900">3,892</p>
            <p className="text-green-500 text-sm mt-2">+24% this month</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">Pending Reviews</p>
            <p className="text-3xl font-bold text-gray-900">{universities.filter(u => u.status === 'pending').length}</p>
            <p className="text-orange-500 text-sm mt-2">Needs attention</p>
          </div>
        </div>

        {/* University Requests */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">University Requests</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          <div className="space-y-4">
            {universities.map(uni => (
              <div key={uni.id} className={`p-6 rounded-xl border-2 transition-all ${
                uni.status === 'pending' ? 'border-gray-200 bg-white' :
                uni.status === 'accepted' ? 'border-green-200 bg-green-50' :
                'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{uni.name}</h3>
                      {uni.status === 'accepted' && (
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Accepted</span>
                      )}
                      {uni.status === 'rejected' && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">Rejected</span>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>📅 Submitted {uni.submitted}</span>
                      <span>👥 {uni.students.toLocaleString()} students</span>
                    </div>
                  </div>
                  
                  {uni.status === 'pending' && (
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleAction(uni.id, 'accepted')}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Accept
                      </button>
                      <button 
                        onClick={() => handleAction(uni.id, 'rejected')}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Design 2: Dark Mode Premium
  const Design2 = () => (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Syinq Admin</h1>
              <p className="text-sm text-gray-400">University Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search universities..." 
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>
            <button className="p-2 hover:bg-gray-800 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <LogOut className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Universities</p>
            <p className="text-3xl font-bold text-white">124</p>
            <p className="text-purple-400 text-sm mt-2">4 pending approval</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Rides</p>
            <p className="text-3xl font-bold text-white">8,492</p>
            <p className="text-blue-400 text-sm mt-2">+156 today</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Active Listings</p>
            <p className="text-3xl font-bold text-white">3,892</p>
            <p className="text-green-400 text-sm mt-2">+89 this week</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-2xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Forum Posts</p>
            <p className="text-3xl font-bold text-white">12,845</p>
            <p className="text-orange-400 text-sm mt-2">+234 today</p>
          </div>
        </div>

        {/* University List */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Pending University Approvals</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {universities.map(uni => (
              <div key={uni.id} className={`p-6 rounded-xl border transition-all ${
                uni.status === 'pending' ? 'border-gray-700 bg-gray-800/50 hover:border-gray-600' :
                uni.status === 'accepted' ? 'border-green-500/30 bg-green-500/10' :
                'border-red-500/30 bg-red-500/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-white">{uni.name}</h3>
                      {uni.status === 'accepted' && (
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">✓ Accepted</span>
                      )}
                      {uni.status === 'rejected' && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">✗ Rejected</span>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <span>🕒 {uni.submitted}</span>
                      <span>👥 {uni.students.toLocaleString()} potential students</span>
                    </div>
                  </div>
                  
                  {uni.status === 'pending' && (
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleAction(uni.id, 'accepted')}
                        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Approve
                      </button>
                      <button 
                        onClick={() => handleAction(uni.id, 'rejected')}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Design 3: Minimalist Clean
  const Design3 = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-3">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Syinq Admin</h1>
          <p className="text-sm text-gray-500">Dashboard</p>
        </div>

        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl">
            <Users className="w-5 h-5" />
            <span className="font-medium">Universities</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <Car className="w-5 h-5" />
            <span className="font-medium">Rides</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium">Marketplace</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Forum</span>
          </a>
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors mt-auto absolute bottom-6 left-6 right-6">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">University Approvals</h2>
          <p className="text-gray-500">Review and approve new university registrations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Pending Approvals</p>
            <p className="text-4xl font-bold text-gray-900">{universities.filter(u => u.status === 'pending').length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Total Universities</p>
            <p className="text-4xl font-bold text-gray-900">124</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Active Students</p>
            <p className="text-4xl font-bold text-gray-900">45K+</p>
          </div>
        </div>

        {/* University Cards */}
        <div className="space-y-4">
          {universities.map(uni => (
            <div key={uni.id} className={`bg-white rounded-2xl border-2 p-6 transition-all ${
              uni.status === 'pending' ? 'border-gray-200' :
              uni.status === 'accepted' ? 'border-green-500' :
              'border-red-500'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{uni.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>Submitted {uni.submitted}</span>
                    <span>•</span>
                    <span>{uni.students.toLocaleString()} students</span>
                  </div>
                  {uni.status !== 'pending' && (
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      uni.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {uni.status === 'accepted' ? '✓ Approved' : '✗ Rejected'}
                    </span>
                  )}
                </div>

                {uni.status === 'pending' && (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleAction(uni.id, 'accepted')}
                      className="px-6 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleAction(uni.id, 'rejected')}
                      className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-gray-400 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Design Selector */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-2xl shadow-2xl p-4 border border-gray-200">
        <p className="text-sm font-semibold text-gray-700 mb-3">Design Samples</p>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveDesign(1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeDesign === 1 ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Light
          </button>
          <button 
            onClick={() => setActiveDesign(2)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeDesign === 2 ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Dark
          </button>
          <button 
            onClick={() => setActiveDesign(3)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeDesign === 3 ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Minimal
          </button>
        </div>
      </div>

      {/* Render Active Design */}
      {activeDesign === 1 && <Design1 />}
      {activeDesign === 2 && <Design2 />}
      {activeDesign === 3 && <Design3 />}
    </div>
  );
};

export default DashboardSamples;