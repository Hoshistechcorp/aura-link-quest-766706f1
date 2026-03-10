import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Mic, Bot, User } from "lucide-react";
import { motion } from "framer-motion";

const suggestedQuestions = [
  "Best time to visit Atlanta?",
  "Top tours for families?",
  "How to get from the airport?",
  "Hidden gems in Atlanta?",
];

interface Message {
  role: "bot" | "user";
  text: string;
}

const ConciergePage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Welcome to Meridian Tours! I'm your AI Travel Assistant. How can I help you plan your Atlanta adventure? 🗺️" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Great question! Atlanta has so much to offer. I'd recommend starting with our BeltLine Walking Tour or the MLK Historic District Tour. You can book directly through our platform or call us at (404) 555-0198 for personalized itineraries." },
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/microsite")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-sm font-semibold">AI Travel Assistant</h1>
          <span className="text-xs text-aura-success">Online</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "bot" && (
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-primary" />
              </div>
            )}
            <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-card border rounded-bl-md"}`}>
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                <User className="w-3.5 h-3.5 text-secondary-foreground" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {messages.length <= 2 && (
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
          {suggestedQuestions.map((q) => (
            <button key={q} onClick={() => sendMessage(q)} className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground whitespace-nowrap hover:bg-primary/10 hover:text-primary transition-colors">
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="border-t px-4 py-3 flex items-center gap-2">
        <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <Mic className="w-4 h-4 text-muted-foreground" />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask about Atlanta..."
          className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button onClick={() => sendMessage(input)} className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
          <Send className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ConciergePage;
