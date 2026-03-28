import { useState } from 'react';
import { Search, Paperclip, Image as ImageIcon, Smile, Send } from 'lucide-react';
import './Chat.css';

// Mock data for the sidebar conversations
const initialConversations = [
  {
    id: 1,
    name: "Areej Hafeez",
    rollNumber: "23L-0956",
    avatar: "AH",
    lastMsg: "That sounds great! When can we start?",
    time: "2 min ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Zainab Khan",
    rollNumber: "23L-0967",
    avatar: "ZK",
    lastMsg: "I'll send you the details soon",
    time: "1 hour ago",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Ahmed Khan",
    rollNumber: "23L-0895",
    avatar: "AK",
    lastMsg: "Thanks for accepting my request!",
    time: "3 hours ago",
    unread: 0,
    online: false,
  }
];

// Mock data for active chat messages
const initialMessages = [
  { id: 1, sender: 'them', text: 'Hey! Did you check out the project ideas I sent?', time: '2:15 PM' },
  { id: 2, sender: 'me', text: 'Yes! I really like the AI-powered study planner idea. We should discuss it further.', time: '2:20 PM' },
  { id: 3, sender: 'them', text: 'Great! I was thinking we could use React for the frontend and Python with TensorFlow for the ML backend.', time: '2:25 PM' },
  { id: 4, sender: 'me', text: 'Perfect match for our skills! When should we meet to plan this out?', time: '2:28 PM' },
  { id: 5, sender: 'them', text: 'Sounds good! Lets discuss tomorrow', time: '2:30 PM' },
];

export default function Chat() {
  // State variables for interactivity
  const [activeChat, setActiveChat] = useState(initialConversations[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  // Logic to handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsgObj = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // e.g. "3:45 PM"
    };

    // Add the new message to the list and clear the input
    setMessages([...messages, newMsgObj]);
    setNewMessage("");
  };

  // Allow sending with the "Enter" key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="chat-container">
      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="chat-sidebar card">
        <div className="search-box">
          <Search size={20} className="text-muted" color="#94A3B8" />
          <input type="text" placeholder="Search conversations..." />
        </div>

        <div className="conversations-list">
          {initialConversations.map(convo => (
            <div 
              key={convo.id} 
              className={`conversation-card ${activeChat.id === convo.id ? 'active' : ''}`}
              onClick={() => setActiveChat(convo)}
            >
              <div className="avatar">
                {convo.avatar}
                {convo.online && <div className="status-indicator" />}
              </div>
              <div className="convo-info flex-col">
                <div className="convo-header">
                  <span className="convo-name">{convo.name}</span>
                  {convo.unread > 0 && <span className="unread-badge">{convo.unread}</span>}
                </div>
                <div className="convo-id">{convo.rollNumber}</div>
                <div className="convo-header" style={{marginTop: 4}}>
                  <span className="convo-msg">{convo.lastMsg}</span>
                  <span className="convo-time">{convo.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ---------------- MAIN CHAT AREA ---------------- */}
      <section className="chat-main card">
        
        {/* Header showing active person */}
        <header className="chat-header">
          <div className="avatar">
            {activeChat.avatar}
            {activeChat.online && <div className="status-indicator" />}
          </div>
          <div className="chat-header-info">
            <h3 className="convo-name">{activeChat.name}</h3>
            <span className="chat-header-status">{activeChat.online ? 'Active now' : 'Offline'}</span>
          </div>
        </header>

        {/* Messages List Area */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender === 'me' ? 'sent' : 'received'}`}>
              <div className="avatar" style={{width: 40, height: 40, fontSize: 14}}>
                {msg.sender === 'me' ? 'US' : activeChat.avatar}
              </div>
              <div className="message-content">
                <div className="message-bubble">{msg.text}</div>
                <span className="message-time">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="chat-input-area">
          <div className="chat-input-actions">
            <Paperclip size={24} onClick={() => alert("Attach file clicked")} />
            <ImageIcon size={24} onClick={() => alert("Send image clicked")} />
            <Smile size={24} onClick={() => alert("Emojis clicked")} />
          </div>
          
          <div className="chat-input-box">
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          <button className="btn-send" onClick={handleSendMessage}>
            <Send size={20} />
          </button>
        </div>

      </section>
    </div>
  );
}
