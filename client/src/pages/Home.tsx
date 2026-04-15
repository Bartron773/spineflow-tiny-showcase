import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Aperture,
  Loader2,
  Scan,
  Layers,
  AlertCircle,
  Maximize2,
  Info,
  MessageSquare,
  Send,
  X,
  User,
  Sparkles,
  ShieldCheck,
  Zap
} from "lucide-react";

/**
 * SPINEFLOW TINY: PRODUCTION KERNEL v4.0
 * -----------------------------------------------
 * Heritage: Hart, Michigan (49420)
 * Logic: Triple-Buffer Prefetching + tRPC-Ready Structure
 * Identity: Bart Salazar & Oliver (Redbone Hound)
 */

const INITIAL_VIEWS = [
  {
    id: "mosaic_portal",
    label: "Mosaic Portal",
    sublabel: "Geometry / Teal / Entry",
    prompt: `Architectural photography of a tiny house entrance with a massive stained-glass facade, geometric teal and blue mosaic patterns. Black steel vertical beams, river stone floor. Soft afternoon sun casting colored shadows --ar 16:9`,
    atmosphere: `Light breaks into fragments, painting the soul in teal geometry.`,
    material: "Dichroic Glass / Powder-coated Steel",
    palette: { bg: "#061a1d", accent: "#2dd4bf" },
    context: "An entry point designed to filter the world through Michigan-inspired teal geometry. It uses structural steel to ground the ethereal light play."
  },
  {
    id: "cobmoosa_study",
    label: "The Heritage Study",
    sublabel: "Timber / Woven / History",
    prompt: `Interior tiny house office inspired by Ottawa tribe textures. Hand-hewn heavy timber beams, woven reed wall coverings, a large window looking into a Michigan forest. Modern desk, minimalist tech. Warm, respectful, earthy aesthetic --ar 16:9`,
    atmosphere: `A space for deep work, anchored by the weight of timber and the stories of the Odawa.`,
    material: "Hand-hewn Oak / Reeds / Slate",
    palette: { bg: "#1c1917", accent: "#fb923c" },
    context: "A tribute to Chief Cobmoosa and the Odawa heritage. Woven textures provide acoustic dampening while the timber offers a 'Permanent' feel."
  },
  {
    id: "night_owl_kitchen",
    label: "3AM Kitchen",
    sublabel: "Amber / Slate / Circadian",
    prompt: `Modern tiny house kitchen at night. Under-cabinet amber LED lighting, dark slate countertops, minimalist black fixtures. No overhead lights. High-end, moody, night-owl aesthetic. View of a starry sky --ar 16:9`,
    atmosphere: `Optimized for the midnight mind. Soft amber glows where the day used to be.`,
    material: "Matte Black Quartz / Circadian LED",
    palette: { bg: "#020617", accent: "#f59e0b" },
    context: "Designed specifically for night owls. Zero blue light spill. It's a cockpit for 3 AM contemplation."
  },
  {
    id: "oliver_porch",
    label: "The Hound's Perch",
    sublabel: "Deck / Rain-Shield / View",
    prompt: `A deep, covered porch on a modern tiny house. Warm cedar wood, black steel railings. A redbone hound sits looking out over a misty meadow. The roof is extended to ensure no rain reaches the deck. --ar 16:9`,
    atmosphere: `A sanctuary for Oliver. The mist stays in the meadow; the porch stays dry.`,
    material: "Red Cedar / Extended Steel Overhang",
    palette: { bg: "#1a120b", accent: "#f97316" },
    context: "A specialized rain-shield porch. Oliver the Redbone Hound hates rain, so this design maximizes his outdoor time."
  }
];

export default function App() {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  
  // Neural Link (Chat) State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "Neural Link established. I am grounded in the Hart 49420 dataset. How shall we interrogate the space today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const mountedRef = useRef(true);
  const inFlightRef = useRef(new Set<string>());

  const view = useMemo(() => INITIAL_VIEWS[active], [active]);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isChatOpen) scrollToBottom();
  }, [messages, isChatOpen, scrollToBottom]);

  // Image Generation with Locking
  const generateImage = useCallback(async (idx: number, force = false) => {
    const v = INITIAL_VIEWS[idx];
    if (!v || (!force && (images[v.id] || loading[v.id] || inFlightRef.current.has(v.id)))) return;

    inFlightRef.current.add(v.id);
    setLoading(p => ({ ...p, [v.id]: true }));
    
    const apiKey = ""; 
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instances: [{ prompt: v.prompt }],
            parameters: { sampleCount: 1 },
          }),
        }
      );
      const result = await response.json();
      const base64 = result?.predictions?.[0]?.bytesBase64Encoded;
      if (base64) setImages(p => ({ ...p, [v.id]: `data:image/png;base64,${base64}` }));
    } catch (e) {
      setErrors(p => ({ ...p, [v.id]: "Neural sync failed." }));
    } finally {
      inFlightRef.current.delete(v.id);
      setLoading(p => ({ ...p, [v.id]: false }));
    }
  }, [images, loading]);

  // Prefetch logic (Active + Next)
  useEffect(() => {
    generateImage(active);
    generateImage((active + 1) % INITIAL_VIEWS.length);
  }, [active, generateImage]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMsg = chatInput;
    setChatInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    const apiKey = "";
    const systemPrompt = `You are the SpineFlow Tiny Neural Interrogator. You are intelligent, architecturally minded, and sassy. 
    Current Node: ${view.label}. 
    Context: ${view.context}. 
    Owner: Bart Salazar (Tech Visionary, Night Owl). 
    Dog: Oliver (Redbone Hound, hates rain).
    Respond with high technical intelligence (2 sentences max).`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMsg }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          }),
        }
      );
      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Signal lost.";
      if (mountedRef.current) {
        setMessages(prev => [...prev, { role: "assistant", content: botText }]);
      }
    } catch (err) {
      if (mountedRef.current) {
        setMessages(prev => [...prev, { role: "assistant", content: "Kernel error. Check logs." }]);
      }
    } finally {
      if (mountedRef.current) setIsTyping(false);
    }
  };

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-zinc-950 font-sans text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Space+Grotesk:wght@300;400&display=swap');
        .blueprint-grid {
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
        }
      `}</style>

      {/* Ambiance Layer */}
      <div className="fixed inset-0 transition-all duration-1000" style={{ backgroundColor: view.palette.bg, opacity: 0.25 }} />
      {blueprintMode && <div className="blueprint-grid fixed inset-0 animate-pulse opacity-50" />}

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-[400px] flex-col px-8 pt-16 pb-10">
        
        {/* Header Readout */}
        <div className="mb-10 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] opacity-40">
          <div className="flex items-center gap-2">
            <Zap size={10} className="text-yellow-500" />
            <span>SpineFlow_v4.0</span>
          </div>
          <div className="flex gap-4">
            <Info className={`cursor-pointer ${showMaterials ? 'text-white opacity-100' : ''}`} onClick={() => setShowMaterials(!showMaterials)} size={16} />
            <Layers className={`cursor-pointer ${blueprintMode ? 'text-cyan-400 opacity-100' : ''}`} onClick={() => setBlueprintMode(!blueprintMode)} size={16} />
          </div>
        </div>

        {/* Title Block */}
        <div className="mb-8">
          <h1 className="font-sans text-4xl font-light tracking-tight">{view.label}</h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">{view.sublabel}</p>
        </div>

        {/* Primary Viewport */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-900/50 shadow-2xl backdrop-blur-sm">
          {images[view.id] ? (
            <img 
              src={images[view.id]} 
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${blueprintMode ? 'grayscale brightness-125 opacity-40' : 'animate-in fade-in'}`}
              alt={view.label}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Scan size={64} className="animate-pulse" />
            </div>
          )}

          {loading[view.id] && !images[view.id] && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md">
              <Loader2 className="animate-spin text-white/20 mb-3" size={32} />
              <span className="font-mono text-[8px] uppercase tracking-widest opacity-40">Baking_Neural_Mesh</span>
            </div>
          )}

          {/* Material Specs HUD */}
          {showMaterials && (
            <div className="absolute inset-0 z-20 bg-black/90 p-10 flex flex-col justify-center animate-in fade-in">
              <h2 className="font-mono text-[10px] uppercase text-cyan-400 mb-8 tracking-[0.4em]">Node_Specs</h2>
              <div className="space-y-6 font-mono text-[11px]">
                <div className="border-b border-white/5 pb-2">
                  <p className="opacity-30 mb-1">COMPOSITION</p>
                  <p>{view.material}</p>
                </div>
                <div className="border-b border-white/5 pb-2">
                  <p className="opacity-30 mb-1">LOCATION</p>
                  <p>Hart, MI [49420]</p>
                </div>
              </div>
              <button onClick={() => setShowMaterials(false)} className="mt-12 text-[9px] uppercase tracking-widest opacity-40 hover:opacity-100">Dismiss</button>
            </div>
          )}
        </div>

        {/* Narrative & Controls */}
        <div className="mt-8 flex-grow">
          <p className="text-white/60 font-light italic text-lg leading-relaxed mb-10">"{view.atmosphere}"</p>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={() => setActive(p => (p - 1 + INITIAL_VIEWS.length) % INITIAL_VIEWS.length)} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10"><ChevronLeft size={20}/></button>
              <button onClick={() => setActive(p => (p + 1) % INITIAL_VIEWS.length)} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10"><ChevronRight size={20}/></button>
            </div>
            
            <button 
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-mono text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-colors"
            >
              <MessageSquare size={16} /> Interrogate
            </button>
          </div>
        </div>
      </div>

      {/* Interrogation Layer (Chat) */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-zinc-950 animate-in slide-in-from-bottom-full duration-500">
          <div className="flex items-center justify-between p-8 border-b border-white/5 bg-black/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-cyan-400" size={20} />
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest">Neural_Link_Active</h3>
                <p className="text-[9px] opacity-30 font-mono">Node: {view.id}</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X size={20}/></button>
          </div>

          <div className="flex-grow overflow-y-auto p-8 space-y-8 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${m.role === 'user' ? 'bg-zinc-800' : 'bg-white/5'} p-6 rounded-3xl border border-white/5 shadow-xl`}>
                   <div className="flex items-center gap-2 mb-2 opacity-30 font-mono text-[8px] uppercase">
                    {m.role === 'user' ? <User size={10}/> : <Sparkles size={10}/>}
                    <span>{m.role === 'user' ? 'Bart' : 'SpineFlow'}</span>
                   </div>
                   <p className={`text-sm leading-relaxed ${m.role === 'assistant' ? 'font-serif text-lg italic' : ''}`}>
                    {m.content}
                   </p>
                </div>
              </div>
            ))}
            {isTyping && <div className="animate-pulse bg-white/5 w-12 h-12 rounded-full flex items-center justify-center"><Loader2 className="animate-spin opacity-20" size={16}/></div>}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleChat} className="p-8 bg-zinc-900/50 border-t border-white/5">
            <div className="relative group">
              <input 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Inquire about the mesh..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm font-light focus:outline-none focus:border-cyan-400 transition-all"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 hover:scale-110 transition-transform">
                <Send size={20}/>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
