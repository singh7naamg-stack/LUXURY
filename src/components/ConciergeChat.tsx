import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Mic } from 'lucide-react';
import { SERVICES } from '../constants';

type Msg = { id: number; role: 'aria' | 'you'; text: string };

const GREETING =
  "Good day, I'm Aria — your personal LUX concierge. Tell me what you need and I'll take care of it: a hotel or restaurant booking, a flight, a rare find, a chauffeur, or one of our home services. How may I assist?";

const CHIPS = [
  'Book a hotel for 2 nights',
  'Reserve a table tonight',
  'Find me Nike Air Jordans',
  'Arrange a chauffeur',
] as const;

/** Pull a likely place / item name out of the request. */
function extractSubject(raw: string): string {
  let s = ' ' + raw + ' ';
  s = s.replace(
    /\b(hey|hi|hello|aria|please|can you|could you|would you|i want|i'd like|i would like|i need|kindly|for me|book|reserve|find|get|order|buy|arrange|a|an|the|me|my|to|at|in|for|tonight|tomorrow|today|this|that|weekend|nights?|night|table|reservation|room|stay|flight|ticket|of)\b/gi,
    ' ',
  );
  s = s.replace(/\b\d+\b/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  if (!s) return '';
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractNights(raw: string): string {
  const m = raw.match(/(\d+)\s*nights?/i);
  return m ? `${m[1]}-night` : '2-night';
}

function extractTime(raw: string): string {
  const m = raw.match(/\b(\d{1,2}(:\d{2})?\s*(am|pm))\b/i) || raw.match(/\b(tonight|tomorrow|noon)\b/i);
  return m ? ` for ${m[0]}` : ' this evening';
}

/** Return one or more messages that simulate the concierge acting on a request. */
function planReply(input: string): string[] {
  const q = input.toLowerCase();
  const has = (...ks: string[]) => ks.some((k) => q.includes(k));
  const subject = extractSubject(input);

  if (has('hi', 'hello', 'hey', 'good morning', 'good evening', 'salaam'))
    return [
      "A pleasure to meet you. I'm at your service — a stay, a table, a flight, a special purchase, or a chauffeur? Just say the word.",
    ];

  if (has('what can you', 'help', 'who are you', 'how do you work', 'capable'))
    return [
      "I can arrange almost anything, discreetly:\n\n• Hotels & private stays\n• Restaurant reservations\n• Flights & travel\n• Sourcing rare products & gifts\n• Chauffeur & luxury cars\n• Yachts & private experiences\n• Our home services — chef, doctor, spa & more\n\nTell me what you'd like, and I'll reach out on your behalf and confirm.",
    ];

  if (has('hotel', 'stay', 'suite', 'resort', 'room', 'nights', 'check in', 'checkin'))
    return [
      `Certainly. Allow me a moment while I reach out to ${subject || 'the property'} for a ${extractNights(input)} stay…`,
      `✅ Confirmed — I've secured a suite at ${subject || 'the hotel'} and noted your preferences. The reservation and directions are on their way to your WhatsApp. Would you like a chauffeur for arrival as well?`,
    ];

  if (has('table', 'restaurant', 'dinner', 'lunch', 'reservation', 'book a table', 'dine'))
    return [
      `With pleasure. Contacting ${subject || 'the restaurant'} to arrange a table${extractTime(input)}…`,
      `✅ Your table${extractTime(input)} at ${subject || 'the restaurant'} is confirmed. I've requested a quiet corner and sent the details to your WhatsApp. Shall I organise a car?`,
    ];

  if (has('flight', 'fly', 'ticket', 'business class', 'first class', 'jet'))
    return [
      `Right away. Searching the best fares and cabins for ${subject || 'your trip'}…`,
      `✅ I've found excellent options and can hold a business-class seat now. I've sent the itinerary to your WhatsApp for your approval — shall I ticket it?`,
    ];

  if (has('find', 'buy', 'order', 'get me', 'purchase', 'nike', 'jordan', 'watch', 'bag', 'gift', 'sneaker', 'perfume', 'dress'))
    return [
      `Of course. Searching boutiques and stores for ${subject || 'the item'} and checking live availability…`,
      `✅ I've located ${subject || 'it'} at two nearby boutiques and confirmed stock in your size. I can have it delivered to you today — shall I proceed with the purchase?`,
    ];

  if (has('chauffeur', 'driver', 'car', 'ride', 'rolls', 'bentley', 'lambo', 'limo', 'pick me'))
    return [
      `At once. Arranging a chauffeur-driven car for you…`,
      `✅ Your car and driver are booked and en route details will arrive on your WhatsApp shortly. Would you prefer a particular model — Rolls-Royce, Bentley, or an S-Class?`,
    ];

  if (has('yacht', 'boat', 'charter'))
    return [
      `A wonderful idea. Checking availability with our yacht partners…`,
      `✅ I can secure a private yacht with crew and refreshments. I've sent options and pricing to your WhatsApp — shall I confirm the booking?`,
    ];

  if (has('chef', 'doctor', 'nurse', 'salon', 'spa', 'clean', 'detailing', 'villa', 'service')) {
    const match = SERVICES.find((s) => q.includes(s.name.en.toLowerCase().split(' ')[0].toLowerCase()));
    const name = match ? match.name.en : 'that service';
    return [
      `Certainly. Arranging ${name} for you…`,
      `✅ I've booked ${name} and a specialist will attend at your preferred time. You can review it under “Services”, and I've sent a confirmation to your WhatsApp.`,
    ];
  }

  if (has('thank', 'thanks', 'shukran', 'perfect', 'great'))
    return ['My pleasure — it\'s what I\'m here for. Is there anything else I may arrange for you?'];

  // Generic: still act like an agent
  return [
    `Certainly. Let me look into ${subject || 'that'} for you…`,
    `✅ I've made the arrangements for ${subject || 'your request'} and sent the details to your WhatsApp. Would you like me to take care of anything else?`,
  ];
}

export function ConciergeChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, role: 'aria', text: GREETING }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<any>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing, open]);

  // Proactive greeting once per session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.sessionStorage.getItem('aria-greeted')) return;
    const t = window.setTimeout(() => setTeaser(true), 1800);
    return () => window.clearTimeout(t);
  }, []);

  const markGreeted = () => {
    if (typeof window !== 'undefined') window.sessionStorage.setItem('aria-greeted', '1');
  };

  const openChat = () => {
    setOpen(true);
    setTeaser(false);
    markGreeted();
  };

  // Post a sequence of concierge messages with typing pauses between them.
  const postSequence = (parts: string[]) => {
    const step = (i: number) => {
      if (i >= parts.length) return;
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        setMsgs((m) => [...m, { id: Date.now() + i, role: 'aria', text: parts[i] }]);
        window.setTimeout(() => step(i + 1), 450);
      }, i === 0 ? 700 : 1100);
    };
    step(0);
  };

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMsgs((m) => [...m, { id: Date.now(), role: 'you', text: value }]);
    setInput('');
    postSequence(planReply(value));
  };

  // Voice input (Web Speech API) — graceful if unsupported
  const startVoice = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setListening(false);
      send(text);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    rec.start();
  };

  const voiceSupported =
    typeof window !== 'undefined' &&
    ((window as any).webkitSpeechRecognition || (window as any).SpeechRecognition);

  return (
    <>
      {/* Proactive greeting bubble */}
      {teaser && !open && (
        <div className="fixed bottom-40 right-4 z-[60] w-[min(290px,calc(100vw-2rem))] rounded-2xl rounded-br-sm border border-gold/40 bg-luxury-gray p-4 shadow-2xl">
          <button
            onClick={() => {
              setTeaser(false);
              markGreeted();
            }}
            aria-label="Dismiss"
            className="absolute right-2 top-2 text-gray-500 transition-colors hover:text-white"
          >
            <X size={14} />
          </button>
          <button onClick={openChat} className="flex items-start gap-3 text-left">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Sparkles size={16} />
            </span>
            <span>
              <span className="block font-bold text-white">Aria · LUX Concierge</span>
              <span className="mt-1 block text-sm leading-relaxed text-gray-400">
                Good day. May I arrange a hotel, a table, or a special request for you?
              </span>
              <span className="mt-2 block text-[11px] font-bold uppercase tracking-widest text-gold">
                Tap to chat →
              </span>
            </span>
          </button>
        </div>
      )}

      {/* Launcher */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          setTeaser(false);
          markGreeted();
        }}
        aria-label="Chat with Aria"
        className="fixed bottom-24 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full gold-gradient text-black shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-40 right-4 z-[60] flex h-[470px] w-[min(370px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gold/30 bg-luxury-black shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-gold/25 bg-luxury-gray px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Sparkles size={16} />
            </div>
            <div className="leading-tight">
              <p className="font-bold text-white">Aria</p>
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-400">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                LUX Concierge · online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'you' ? 'justify-end' : 'justify-start'}`}>
                <p
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'you'
                      ? 'rounded-br-sm gold-gradient text-black'
                      : 'rounded-bl-sm border border-white/10 bg-luxury-gray text-gray-100'
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <p className="rounded-2xl rounded-bl-sm border border-white/10 bg-luxury-gray px-3.5 py-2.5 text-sm text-gray-400">
                  Aria is arranging…
                </p>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick chips */}
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => send(c)}
                className="border border-white/10 px-2.5 py-1 text-[11px] text-gray-400 transition-colors hover:border-gold/50 hover:text-white"
              >
                {c}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 px-3 py-2"
          >
            {voiceSupported && (
              <button
                type="button"
                onClick={startVoice}
                aria-label="Speak to Aria"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  listening
                    ? 'border-gold bg-gold/20 text-gold animate-pulse'
                    : 'border-white/10 text-gray-400 hover:text-gold'
                }`}
              >
                <Mic size={16} />
              </button>
            )}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={listening ? 'Listening…' : 'Ask Aria to arrange anything…'}
              className="flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-500"
            />
            <button
              type="submit"
              aria-label="Send"
              className="flex h-9 w-9 items-center justify-center rounded-full gold-gradient text-black"
            >
              <Send size={16} />
            </button>
          </form>
          <p className="pb-2 text-center text-[10px] text-gray-600">
            Concierge demo — requests are simulated for showcase.
          </p>
        </div>
      )}
    </>
  );
}
