"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "🇮🇳 Namaste! I'm your GST Compliance Assistant for Odisha. Ask me anything about GST rates, filing requirements, compliance deadlines, or business tax rules. Let's make GST simple! 📋",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setError("");

    // Add user message to chat
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Call API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Add assistant response
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(err.message || "Something went wrong");

      // Add error message
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: `❌ Error: ${err.message || "Unable to process your question. Please try again."}`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🏛️ GST Helper Odisha
          </h1>
          <p className="text-sm text-orange-50 mt-1">
            Expert compliance assistance for businesses in Odisha
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in slide-in-from-bottom-2`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.role === "user"
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-900 px-4 py-3 rounded-lg rounded-bl-none border border-slate-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          {error && (
            <div className="mb-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about GST rates, filing deadlines, or compliance..."
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-slate-100"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white font-medium transition duration-200 transform hover:scale-105 disabled:hover:scale-100"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>

          {/* Quick Questions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() =>
                setInput(
                  "What is the GST rate for restaurant food in Odisha?"
                )
              }
              className="text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition"
            >
              Restaurant GST
            </button>
            <button
              onClick={() =>
                setInput(
                  "What are the GST filing deadlines for this month?"
                )
              }
              className="text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition"
            >
              Filing Deadlines
            </button>
            <button
              onClick={() =>
                setInput("How to file GSTR-3B? Step by step guide")
              }
              className="text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition"
            >
              GSTR-3B Filing
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-slate-300 text-center py-3 text-xs">
        <p>
          ⚖️ Legal Disclaimer: This is an AI assistant. For official compliance
          advice, consult a Chartered Accountant.
        </p>
      {/* ===== PRICING BUTTONS - ADD HERE ===== */}
      <div className="pricing-hero mt-12 p-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl text-white text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready for Unlimited GST Answers?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Upgrade to Pro and never worry about GST again
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="/pricing" 
            className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
          >
            💎 Upgrade to Pro - ₹99/month
          </a>
          <a 
            href="/pricing" 
            className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300"
          >
            See All Plans
          </a>
        </div>
      </div>
      </div>
      {/* ===== END PRICING BUTTONS ===== */}
      
    </main>
  );
}
