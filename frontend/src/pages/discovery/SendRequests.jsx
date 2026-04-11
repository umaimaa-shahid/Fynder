import React from 'react';

export default function SendRequests() {
  const sent = [
    { name: 'Fatima Malik', id: '23L-0945', date: 'March 6, 2026' },
    { name: 'Hassan Ali', id: '23L-0956', date: 'March 5, 2026' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold italic">Partner Requests</h1>
      <div className="flex gap-8 border-b border-white/10">
        <button className="pb-4 text-gray-500 font-bold text-sm">Received</button>
        <button className="pb-4 text-[#2DFFEA] border-b-2 border-[#2DFFEA] font-bold text-sm">Sent</button>
      </div>
      <div className="space-y-4 pt-4">
        {sent.map((req, i) => (
          <div key={i} className="bg-[#0a272b] p-6 rounded-2xl border border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2DFFEA] text-black flex items-center justify-center font-bold">FM</div>
              <div><h3 className="font-bold">{req.name}</h3><p className="text-xs text-gray-500">Sent on {req.date}</p></div>
            </div>
            <span className="bg-white/5 px-4 py-2 rounded-lg text-xs font-bold text-orange-400 border border-orange-400/20">Pending</span>
          </div>
        ))}
      </div>
    </div>
  );
}