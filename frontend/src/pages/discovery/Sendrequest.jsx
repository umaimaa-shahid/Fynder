import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function SendRequest() {
  const navigate = useNavigate();

  return (
    <div className="p-8 flex justify-center items-center min-h-[80vh] bg-[#082226]">
      <Card className="p-8 max-w-md w-full text-center border-[#2DFFEA33] bg-[#051518]">
        <div className="w-20 h-20 bg-[#2DFFEA1A] text-[#2DFFEA] rounded-full flex items-center justify-center text-3xl mx-auto mb-6 border border-[#2DFFEA33] shadow-[0_0_20px_rgba(45,255,234,0.1)]">
          ✉️
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Send Partner Request?</h2>
        <p className="text-gray-400 mb-8 text-sm px-4">
          You are sending a request to <b className="text-white">Fatima Malik</b>. They will be notified immediately.
        </p>
        
        <div className="flex gap-4">
          <button 
            className="flex-1 py-3 rounded-xl border border-[#22D3EE33] text-gray-400 font-semibold hover:bg-[#2DFFEA0D] transition-all" 
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-3 rounded-xl bg-[#2DFFEA] text-[#051518] font-bold shadow-[0_4px_15px_rgba(45,255,234,0.3)] hover:scale-[1.02] transition-all" 
            onClick={() => alert('Sent!')}
          >
            Confirm
          </button>
        </div>
      </Card>
    </div>
  );
}