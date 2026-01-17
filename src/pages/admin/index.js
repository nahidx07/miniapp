import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Users, Tv, MessageSquare, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-white p-6">
      <h1 className="text-2xl font-bold mb-8 text-red-600">Toto Stream Pro Admin</h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value="24.9K" icon={<Users/>} color="bg-blue-500"/>
        <StatCard title="Live Viewers" value="1.5K" icon={<Tv/>} color="bg-red-500"/>
        <StatCard title="Premium" value="850" icon={<DollarSign/>} color="bg-yellow-500"/>
        <StatCard title="Comments" value="12K" icon={<MessageSquare/>} color="bg-green-500"/>
      </div>

      <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800">
        <h2 className="text-lg font-bold mb-4">Quick Stream Update</h2>
        <input placeholder="Match Title" className="w-full bg-[#0b0d10] p-3 rounded-lg mb-4 border border-gray-700"/>
        <textarea placeholder="Stream URL or Iframe Code" className="w-full bg-[#0b0d10] p-3 rounded-lg mb-4 border border-gray-700 h-32"/>
        <button className="w-full bg-red-600 p-3 rounded-lg font-bold hover:bg-red-700 transition">Go Live Now</button>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-[#161b22] p-4 rounded-2xl border border-gray-800 flex items-center gap-4">
      <div className={`${color} p-3 rounded-xl`}>{icon}</div>
      <div>
        <p className="text-gray-400 text-xs">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
  }
