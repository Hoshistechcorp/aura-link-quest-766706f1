import { useState, useRef, useEffect } from "react";
import DestinationSubPage from "@/components/aura/DestinationSubPage";
import { Bot, Send, Sparkles, MapPin, Calendar, Utensils } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  { icon: MapPin, label: "Best places for families" },
  { icon: Calendar, label: "3-day itinerary" },
  { icon: Sparkles, label: "Best nightlife spots" },
  { icon: Utensils, label: "Top local restaurants" },
];

const mockResponses: Record<string, string> = {
  "best places for families": `🏠 **Best Family-Friendly Spots in Atlanta:**

1. **Georgia Aquarium** — World's largest aquarium, kids love the dolphin shows
2. **Zoo Atlanta** — Home to giant pandas and a great petting zoo
3. **Children's Museum of Atlanta** — Interactive exhibits for ages 2–8
4. **Centennial Olympic Park** — Free splash pad and green space downtown
5. **Legoland Discovery Center** — Indoor Lego playground in Phipps Plaza

💡 *Tip: Get the Atlanta CityPASS to save 40% on top attractions!*`,
  "3-day itinerary": `📅 **3-Day Atlanta Essentials:**

**Day 1 — Downtown**
• 🐟 Georgia Aquarium (morning)
• 🥤 World of Coca-Cola (afternoon)
• 🌳 Centennial Olympic Park (sunset)
• 🍽️ Dinner at Ponce City Market

**Day 2 — History & Culture**
• 🏛️ MLK National Historic Park (morning)
• 🛍️ Sweet Auburn Market (lunch)
• 🎭 Fox Theatre Tour (afternoon)
• 🍷 Staplehouse dinner (evening)

**Day 3 — BeltLine & Arts**
• 🚶 Atlanta BeltLine walk (morning)
• 🥐 Krog Street Market brunch
• 🎨 High Museum of Art (afternoon)
• 🌆 Skyline drinks in Midtown`,
  "best nightlife spots": `🌙 **Atlanta Nightlife Guide:**

1. **MJQ Concourse** — Underground dance club, hip-hop & electronic
2. **The Clermont Lounge** — Iconic dive bar, must-visit ATL institution
3. **District** — Rooftop bar with skyline views in Midtown
4. **Ormsby's** — Bocce, darts, craft cocktails in West Midtown
5. **Northside Tavern** — Live blues every night since 1972

🎶 *Hot tip: Check out the Virginia-Highland strip for bar-hopping!*`,
  "top local restaurants": `🍽️ **Must-Try Atlanta Restaurants:**

1. **Staplehouse** ⭐ 4.9 — James Beard winner, seasonal tasting menus
2. **Fox Bros. Bar-B-Q** ⭐ 4.7 — Best Texas-style BBQ in the city
3. **Busy Bee Cafe** ⭐ 4.6 — Legendary soul food since 1947
4. **Gunshow** ⭐ 4.8 — Unique dim sum-style service
5. **Buford Highway** ⭐ 4.7 — Miles of authentic global cuisine

🔥 *Don't miss the Buford Highway food corridor — 40+ countries of cuisine!*`,
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [key, val] of Object.entries(mockResponses)) {
    if (lower.includes(key)) return val;
  }
  return `Great question! Here are some suggestions for "${input}" in Atlanta:\n\n🗺️ I'd recommend checking out the **BeltLine** area for a mix of art, food, and culture. The **Midtown** and **Old Fourth Ward** neighborhoods are also fantastic for exploring.\n\n💡 *This is a demo — connect Lovable Cloud to enable real AI-powered trip planning!*`;
};

const AITripPlannerPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Hi! I'm your Atlanta AI Trip Planner. Ask me about the best places to visit, itineraries, food recommendations, or nightlife — I'll help you plan the perfect trip!\n\nTry one of the quick prompts below, or ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(msg);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <DestinationSubPage title="AI Trip Planner">
      <div className="flex flex-col h-[calc(100vh-180px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 pb-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border shadow-sm rounded-bl-md"
              }`}>
                {m.role === "assistant" && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Bot className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-primary">Trip Planner AI</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {m.content.split(/(\*\*.*?\*\*)/).map((part, j) =>
                    part.startsWith("**") && part.endsWith("**")
                      ? <strong key={j}>{part.slice(2, -2)}</strong>
                      : part.split(/(\*.*?\*)/).map((sub, k) =>
                          sub.startsWith("*") && sub.endsWith("*") && !sub.startsWith("**")
                            ? <em key={k} className="text-muted-foreground">{sub.slice(1, -1)}</em>
                            : sub
                        )
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card border shadow-sm rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                  <div className="flex gap-1 ml-1">
                    {[0, 1, 2].map((d) => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {quickPrompts.map((p) => (
              <button
                key={p.label}
                onClick={() => handleSend(p.label)}
                className="flex items-center gap-2 p-3 rounded-xl bg-card border text-xs font-medium text-muted-foreground hover:bg-muted transition-colors text-left"
              >
                <p.icon className="w-4 h-4 text-primary shrink-0" />
                {p.label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about Atlanta..."
            className="flex-1 px-4 py-3 rounded-xl border bg-background text-sm"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </DestinationSubPage>
  );
};

export default AITripPlannerPage;
