import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, ExternalLink, Bot, User } from 'lucide-react';
import { getChatbotResponse } from '../../data/chatbotKnowledge';
import { PERSONAL } from '../../data/constants';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  handover?: boolean;
}

// Simple parser to render markdown links, bold text, and lists inside the chatbot
const FormattedMessage = ({ text }: { text: string }) => {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
      {lines.map((line, lineIdx) => {
        // Handle List Item
        const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
        const isNumbered = /^\d+\.\s/.test(line.trim());
        let cleanLine = line;

        if (isBullet) {
          cleanLine = line.trim().replace(/^[*_-]\s+/, '');
        } else if (isNumbered) {
          cleanLine = line.trim().replace(/^\d+\.\s+/, '');
        }

        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;

        // Process markdown in the line
        const tempText = cleanLine;
        
        // We will combine regex matches to find links and bold text
        const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
        while ((match = regex.exec(tempText)) !== null) {
          const matchIndex = match.index;
          // Add plain text before match
          if (matchIndex > lastIndex) {
            parts.push(tempText.substring(lastIndex, matchIndex));
          }

          const matchedStr = match[0];
          if (matchedStr.startsWith('**')) {
            // Bold text
            const content = matchedStr.slice(2, -2);
            parts.push(<strong key={matchIndex} className="font-extrabold text-white">{content}</strong>);
          } else {
            // Link
            const linkMatch = /\[(.*?)\]\((.*?)\)/.exec(matchedStr);
            if (linkMatch) {
              const linkText = linkMatch[1];
              const linkUrl = linkMatch[2];
              // Check if it's an internal route
              const isInternal = linkUrl.startsWith('/');
              parts.push(
                <a
                  key={matchIndex}
                  href={linkUrl}
                  target={isInternal ? '_self' : '_blank'}
                  rel={isInternal ? undefined : 'noopener noreferrer'}
                  className="text-primary hover:text-primary/80 font-bold underline inline-flex items-center gap-0.5"
                >
                  {linkText}
                  {!isInternal && <ExternalLink className="w-3 h-3 inline" />}
                </a>
              );
            }
          }
          lastIndex = regex.lastIndex;
        }

        if (lastIndex < tempText.length) {
          parts.push(tempText.substring(lastIndex));
        }

        const renderedContent = parts.length > 0 ? parts : tempText;

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-2">
              <span className="text-primary mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{renderedContent}</span>
            </div>
          );
        }

        if (isNumbered) {
          const num = line.match(/^\d+/)?.[0] || '1';
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-2">
              <span className="text-primary font-bold shrink-0">{num}.</span>
              <span>{renderedContent}</span>
            </div>
          );
        }

        return <p key={lineIdx}>{renderedContent}</p>;
      })}
    </div>
  );
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi there! 👋 I am **Ruke**, Al Amin Robin's AI Assistant.\n\nAsk me anything about Robin's technical skills, experience, projects, services, or how to hire him!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    'Show projects',
    'What are your services?',
    'What is your tech stack?',
    'How can I contact you?'
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsgId = Math.random().toString(36).substring(7);
    const newMsg: Message = { id: userMsgId, sender: 'user', text };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Trigger typing effect
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getChatbotResponse(text);
      
      const botMsgId = Math.random().toString(36).substring(7);
      setMessages(prev => [...prev, {
        id: botMsgId,
        sender: 'bot',
        text: response.text,
        handover: response.handover
      }]);

      if (response.suggestions) {
        setSuggestions(response.suggestions);
      }
    }, 900);
  };

  const handleWhatsAppRedirect = (userQuery: string) => {
    const defaultMsg = `Hi Robin! I was visiting your portfolio and wanted to ask about: "${userQuery}"`;
    const encoded = encodeURIComponent(defaultMsg);
    const whatsappUrl = `https://wa.me/${PERSONAL.whatsapp}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 font-sans group flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.85 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-full sm:w-[380px] h-[500px] sm:h-[550px] max-h-[70vh] sm:max-h-[85vh] bg-[#07070A]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col backdrop-blur-2xl mb-4 relative pointer-events-auto"
          >
            {/* Ambient background glows */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Neon Glow Bar */}
            <div className="h-[3px] w-full bg-gradient-to-r from-primary via-orange-500 to-primary/30 shrink-0" />

            {/* Chatbot Header */}
            <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center text-black shadow-lg shadow-primary/20 relative">
                  <Bot className="w-5.5 h-5.5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#07070A] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white tracking-wider">Ruke</h4>
                  <p className="text-[10px] text-emerald-400 font-semibold tracking-wide uppercase">Active Online</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant Ruke"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/10 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2 max-w-[80%]">
                    <div className={`p-4 rounded-3xl ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-primary to-orange-500 text-black font-semibold rounded-tr-none shadow-[0_4px_15px_rgba(250,131,52,0.15)]' 
                        : 'bg-white/[0.03] border border-white/5 rounded-tl-none border-l-2 border-l-primary/60'
                    }`}>
                      {msg.sender === 'user' ? (
                        <p className="text-sm sm:text-base leading-relaxed break-words">{msg.text}</p>
                      ) : (
                        <FormattedMessage text={msg.text} />
                      )}
                    </div>
                    
                    {/* Render WhatsApp Direct Handover Button */}
                    {msg.handover && (
                      <button
                        onClick={() => {
                          // Find last user message or fallback to generic
                          const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user')?.text || '';
                          handleWhatsAppRedirect(lastUserMsg);
                        }}
                        className="w-full py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold rounded-2xl border border-emerald-500/20 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] text-xs sm:text-sm"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.505 0 9.989-4.478 9.99-9.985A9.998 9.998 0 0 0 12.012 2zm4.957 14.22c-.274.774-1.42 1.428-1.957 1.517-.478.08-1.107.124-3.125-.717-2.58-1.074-4.223-3.69-4.35-3.864-.128-.174-1.042-1.385-1.042-2.637 0-1.253.657-1.867.89-2.112.234-.244.512-.306.684-.306.17 0 .343.002.493.009.157.007.368-.06.577.447.214.518.73 1.777.795 1.907.064.13.107.282.02.456-.086.173-.13.282-.26.433-.13.15-.27.337-.385.45-.128.127-.263.266-.113.522.15.257.662 1.09 1.417 1.76.974.868 1.794 1.14 2.05 1.267.258.127.408.106.56-.067.152-.174.654-.76.828-1.018.174-.257.348-.216.586-.128.238.09 1.513.713 1.773.844.26.13.433.195.498.306.064.11.064.63-.21 1.404z" />
                        </svg>
                        Chat Directly on WhatsApp
                      </button>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/10 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/5 rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-5 py-2.5 border-t border-white/5 bg-white/[0.01] flex flex-wrap gap-2 overflow-x-auto max-h-[80px]">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => {
                      if (sug === 'Chat on WhatsApp') {
                        // Redirect user using last query
                        const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user')?.text || '';
                        handleWhatsAppRedirect(lastUserMsg);
                      } else {
                        handleSendMessage(sug);
                      }
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      sug === 'Chat on WhatsApp'
                        ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-5 border-t border-white/5 bg-white/[0.02] flex items-center gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects, contact..."
                className="flex-1 bg-[#07070A] border border-white/10 rounded-2xl px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-semibold"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="w-11 h-11 bg-gradient-to-r from-primary to-orange-500 disabled:from-white/5 disabled:to-white/5 text-black disabled:text-gray-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 disabled:hover:scale-100 shadow-lg shadow-primary/10 disabled:shadow-none"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Eye-Catchy Label */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          onClick={() => setIsOpen(true)}
          className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl text-[11px] font-extrabold text-gray-200 shadow-[0_0_25px_rgba(0,0,0,0.9)] whitespace-nowrap hidden sm:flex items-center gap-2 border-primary/20 hover:border-primary/50 group-hover:translate-x-[-10px] transition-all duration-300 cursor-pointer pointer-events-auto"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span className="tracking-wide uppercase text-white/90">Ask Ruke! 🤖</span>
        </motion.div>
      )}

      {/* Floating Widget Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle chat assistant Ruke"
        className="w-14 h-14 bg-gradient-to-tr from-primary to-orange-500 text-black rounded-3xl flex items-center justify-center shadow-[0_0_20px_rgba(250,131,52,0.4)] border border-primary/30 hover:border-primary/60 hover:shadow-[0_0_35px_rgba(250,131,52,0.75)] relative overflow-visible transition-all duration-300 pointer-events-auto"
      >
        {/* Pulsing Glow Rings behind the button */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary to-orange-500 opacity-40 animate-ping -z-10" />
            <span className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary to-orange-500 opacity-20 animate-ping [animation-delay:0.4s] -z-10" />
          </>
        )}

        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none -z-5">
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </div>

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 relative z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6 relative z-10" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-[#07070A]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
