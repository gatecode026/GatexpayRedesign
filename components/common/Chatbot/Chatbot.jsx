"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Minus,
  Maximize2,
  Sparkles,
} from "lucide-react";
import "./Chatbot.css";
// Lightweight markdown renderer
function parseLine(line, key) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span key={key}>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
function MsgContent({ content }) {
  const lines = content.split("\n");
  const nodes = [];
  let listItems = [];
  let listType = null;
  let listKey = 0;
  const flushList = () => {
    if (!listItems.length) return;
    if (listType === "ol") {
      nodes.push(
        <ol key={`ol-${listKey++}`} className="cb-md-list cb-md-ol">
          {listItems}
        </ol>
      );
    } else {
      nodes.push(
        <ul key={`ul-${listKey++}`} className="cb-md-list">
          {listItems}
        </ul>
      );
    }
    listItems = [];
    listType = null;
  };
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }
    if (trimmed.startsWith("### ")) {
      flushList();
      nodes.push(
        <p key={i} className="cb-md-heading">
          {trimmed.slice(4)}
        </p>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      const text = trimmed.replace(/^\d+\.\s/, "");
      if (listType && listType !== "ol") flushList();
      listType = "ol";
      listItems.push(<li key={i}>{parseLine(text, `oli-${i}`)}</li>);
    } else if (/^[-*]\s/.test(trimmed)) {
      if (listType && listType !== "ul") flushList();
      listType = "ul";
      listItems.push(<li key={i}>{parseLine(trimmed.slice(2), `li-${i}`)}</li>);
    } else {
      flushList();
      nodes.push(
        <p key={i} className="cb-md-p">
          {parseLine(trimmed, `p-${i}`)}
        </p>
      );
    }
  });
  flushList();
  return <div className="cb-md">{nodes}</div>;
}
const WELCOME = {
  role: "assistant",
  content:
    "Hi! I am the GateXPay AI Assistant. How can I help you with our payment solutions, CSP services, or API integrations today?",
};
const STARTER_QUESTIONS = [
  "What services does GateXPay offer?",
  "How does Payment Gateway Integration work?",
  "What are CSP and AEPS services?",
  "What is the company address & support?",
];
export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(STARTER_QUESTIONS);
  const [showBadge, setShowBadge] = useState(true);
  const chatbotWindowRef = useRef(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const isRequestPending = useRef(false);

  // Scroll lock for chatbot body to avoid scrolling the background page
  useEffect(() => {
    const windowEl = chatbotWindowRef.current;
    if (!windowEl || !isOpen || isMinimized) return;
    const handleWheel = (e) => {
      const bodyEl = windowEl.querySelector(".cb-body");
      if (!bodyEl) return;
      let target = e.target;
      let insideBody = false;
      while (target && target !== windowEl) {
        if (target === bodyEl) {
          insideBody = true;
          break;
        }
        target = target.parentElement;
      }
      if (!insideBody) {
        e.preventDefault();
        return;
      }
      const scrollTop = bodyEl.scrollTop;
      const scrollHeight = bodyEl.scrollHeight;
      const clientHeight = bodyEl.clientHeight;
      const delta = e.deltaY;
      const atTop = scrollTop <= 0 && delta < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && delta > 0;
      if (atTop || atBottom) {
        e.preventDefault();
      }
    };
    windowEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => windowEl.removeEventListener("wheel", handleWheel);
  }, [isOpen, isMinimized]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, suggestions]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Hide chatbot on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || isLoading || isRequestPending.current) return;
    isRequestPending.current = true;
    setInput("");
    const userMsg = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setSuggestions([]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages.filter((m) => m !== WELCOME), userMsg].map(
            ({ role, content }) => ({ role, content })
          ),
        }),
      });
      const data = await res.json();
      if (data.reply || data.message) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply || data.message },
        ]);
        setSuggestions(
          Array.isArray(data.suggestions) && data.suggestions.length > 0
            ? data.suggestions
            : Array.isArray(data.followUps) && data.followUps.length > 0
              ? data.followUps
              : []
        );
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I couldn't process that request. Please try again or reach out to info@gatexpay.in.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please check your network and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      isRequestPending.current = false;
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };
  return (
    <div className="chatbot-root">
      {/* ── Chatbot Window ────────────────────────────────────────── */}
      {isOpen && (
        <div
          ref={chatbotWindowRef}
          className={`cb-window ${isMinimized ? "is-minimized" : ""}`}
          role="dialog"
          aria-label="GateXPay AI Chatbot"
        >
          {/* Header */}
          <div className="cb-header">
            <div className="cb-header-info">
              <div className="cb-avatar-wrap">
                <Bot size={20} className="cb-avatar-bot" />
                <span className="cb-status-dot" aria-hidden="true" />
              </div>
              <div className="cb-header-text">
                <div className="cb-header-title-row">
                  <span className="cb-header-title">GateXPay Assistant</span>
                  <span className="cb-header-badge">AI</span>
                </div>
                <div className="cb-header-subtitle-row">
                  <span className="cb-subtitle-pulse-dot" aria-hidden="true" />
                  <span className="cb-header-subtitle">
                    Online · Instant Support
                  </span>
                </div>
              </div>
            </div>

            <div className="cb-header-actions">
              <button
                type="button"
                className="cb-control-btn"
                onClick={() => setIsMinimized((prev) => !prev)}
                title={isMinimized ? "Maximize" : "Minimize"}
                aria-label="Toggle minimize"
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minus size={15} />}
              </button>
              <button
                type="button"
                className="cb-control-btn cb-close-btn"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Body */}
              <div className="cb-body">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`cb-msg-row ${m.role === "user" ? "is-user-row" : "is-bot-row"}`}
                  >
                    {m.role === "assistant" && (
                      <div className="cb-msg-avatar">
                        <Bot size={14} />
                      </div>
                    )}
                    <div
                      className={`cb-msg-bubble ${m.role === "user" ? "is-user-bubble" : "is-bot-bubble"}`}
                    >
                      <MsgContent content={m.content} />
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="cb-msg-row is-bot-row">
                    <div className="cb-msg-avatar">
                      <Bot size={14} />
                    </div>
                    <div className="cb-msg-bubble is-bot-bubble cb-typing-bubble">
                      <span className="cb-dot" />
                      <span className="cb-dot" />
                      <span className="cb-dot" />
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Suggestions Chips */}
              {suggestions.length > 0 && !isLoading && (
                <div className="cb-suggestions">
                  <div className="cb-suggestions-label">
                    <Sparkles size={12} />
                    <span>Suggested Questions</span>
                  </div>
                  <div className="cb-suggestions-chips">
                    {suggestions.map((q, i) => (
                      <button
                        key={i}
                        type="button"
                        className="cb-chip-btn"
                        onClick={() => send(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="cb-input-box">
                <input
                  ref={inputRef}
                  type="text"
                  className="cb-input"
                  placeholder="Ask about GateXPay services..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="cb-send-btn"
                  onClick={() => send()}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  title="Send"
                >
                  <Send size={15} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Floating Launcher Trigger ────────────────────────────── */}
      <button
        type="button"
        className={`cb-launcher-btn ${isOpen ? "is-open" : ""}`}
        onClick={() => {
          setIsOpen((prev) => {
            const next = !prev;
            if (next) setShowBadge(false);
            return next;
          });
          setIsMinimized(false);
        }}
        aria-label={isOpen ? "Close AI Chatbot" : "Open GateXPay AI Assistant"}
        title="Chat with GateXPay AI"
      >
        {isOpen ? (
          <X size={22} className="cb-launcher-icon" />
        ) : (
          <MessageCircle size={24} className="cb-launcher-icon" />
        )}


      </button>
    </div>
  );
}
