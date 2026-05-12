import { useState, useEffect, useRef } from 'react';
import { Search, Paperclip, Image as ImageIcon, Smile, Send } from 'lucide-react';
import { io } from 'socket.io-client';
import api from '../../utils/api';
import './Chat.css';

let socket;

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat]       = useState(null);
  const [messages, setMessages]           = useState([]);
  const [newMessage, setNewMessage]       = useState("");
  const [loading, setLoading]             = useState(true);
  const messagesEndRef                    = useRef(null);
  const activeChatRef                     = useRef(null); // ref to access activeChat inside socket listener
  const myId                              = localStorage.getItem("userId");

  // Connect socket ONCE
  useEffect(() => {
    const token = localStorage.getItem("token");
    const socketUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    socket = io(socketUrl, { auth: { token } });

    socket.on("newMessage", (msg) => {
      const current = activeChatRef.current;
      const senderId   = msg.sender?._id || msg.sender;
      const receiverId = msg.receiver?._id || msg.receiver;

      const isRelevant =
        (senderId === myId && receiverId === current?.userId) ||
        (senderId === current?.userId && receiverId === myId);

      if (isRelevant) {
        setMessages(prev => {
          // Replace optimistic or avoid duplicate
          const withoutOptimistic = prev.filter(
            m => !(typeof m._id === "number" && m.text === msg.text && m.sender === myId)
          );
          if (withoutOptimistic.find(m => m._id === msg._id)) return withoutOptimistic;
          return [...withoutOptimistic, msg];
        });
      }
    });

    return () => socket.disconnect();
  }, []); // empty — runs once only

  // Keep ref in sync with activeChat state
  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  // Handle chatWith from MyGroup navigation
  useEffect(() => {
    const chatWith = localStorage.getItem("chatWith");
    if (chatWith) {
      const parsed = JSON.parse(chatWith);
      setActiveChat(parsed);
      setConversations([parsed]);
      localStorage.removeItem("chatWith");
    }
  }, []);

  // Load conversations
  useEffect(() => {
    api.get("/chat/conversations")
      .then(res => {
        setConversations(prev => {
          const apiConvos = res.data.conversations;
          const merged = [...prev];
          apiConvos.forEach(c => {
            if (!merged.find(m => m.userId === c.userId)) merged.push(c);
          });
          return merged;
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Load messages when active chat changes
  useEffect(() => {
    if (!activeChat) return;
    api.get(`/chat/${activeChat.userId}`)
      .then(res => setMessages(res.data.messages))
      .catch(() => setMessages([]));
  }, [activeChat]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat || !socket?.connected) return;

    const text = newMessage.trim();
    setNewMessage("");

    const optimistic = {
      _id: Date.now(),
      sender: myId,
      receiver: activeChat.userId,
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimistic]);

    socket.emit("sendMessage", { receiverId: activeChat.userId, text });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const getInitials = (name = "") =>
    name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="chat-container">
      <aside className="chat-sidebar card">
        <div className="search-box">
          <Search size={20} color="#94A3B8" />
          <input type="text" placeholder="Search conversations..." />
        </div>

        <div className="conversations-list">
          {loading && <p className="text-muted" style={{padding:12}}>Loading...</p>}
          {!loading && conversations.length === 0 &&
            <p className="text-muted" style={{padding:12}}>No conversations yet</p>}
          {conversations.map(convo => (
            <div key={convo.userId}
              className={`conversation-card ${activeChat?.userId === convo.userId ? 'active' : ''}`}
              onClick={() => setActiveChat(convo)}>
              <div className="avatar">{getInitials(convo.name)}</div>
              <div className="convo-info">
                <div className="convo-header">
                  <span className="convo-name">{convo.name}</span>
                </div>
                <div className="convo-id">{convo.rollNumber}</div>
                <div className="convo-header" style={{marginTop:4}}>
                  <span className="convo-msg">{convo.lastMsg}</span>
                  <span className="convo-time">
                    {new Date(convo.time).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="chat-main card">
        {!activeChat ? (
          <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <p className="text-muted">Select a conversation to start chatting</p>
          </div>
        ) : (
          <>
            <header className="chat-header">
              <div className="avatar">{getInitials(activeChat.name)}</div>
              <div className="chat-header-info">
                <h3 className="convo-name">{activeChat.name}</h3>
                <span className="chat-header-status">{activeChat.rollNumber}</span>
              </div>
            </header>

            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg._id}
                  className={`message-row ${
                    msg.sender === myId || msg.sender?._id === myId ? 'sent' : 'received'
                  }`}>
                  <div className="avatar" style={{width:40, height:40, fontSize:14}}>
                    {msg.sender === myId || msg.sender?._id === myId
                      ? getInitials(localStorage.getItem("userName") || "Me")
                      : getInitials(activeChat.name)}
                  </div>
                  <div className="message-content">
                    <div className="message-bubble">{msg.text}</div>
                    <span className="message-time">
                      {new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
              <div className="chat-input-actions">
                <Paperclip size={24} />
                <ImageIcon size={24} />
                <Smile size={24} />
              </div>
              <div className="chat-input-box">
                <input type="text" placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress} />
              </div>
              <button className="btn-send" onClick={handleSendMessage}>
                <Send size={20} />
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}