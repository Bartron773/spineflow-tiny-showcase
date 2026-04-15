import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  X,
  MessageSquare,
  Send,
  Sparkles,
  Volume2,
  Activity,
  Zap,
  Eye,
  Camera,
  Loader2
} from "lucide-react";

/**
 * ─── SpineFlow Tiny: Manifest v6.7 ──────────────────────────────────────────
 * GEMINI INTEGRATION: Dreamer + Site Analysis + Narrator
 * Model: gemini-2.5-flash-preview-09-2025 & imagen-4.0-generate-001
 * ─────────────────────────────────────────────────────────────────────────────
 */

const INITIAL_VIEWS = [
  {
    id: "mosaic_portal",
    label: "Mosaic Portal",
    sublabel: "Geometry / Teal / Entry",
    image: "IMG_2908.jpg",
    philosophy: "The entry is a geometric manifesto. Stained glass transforms Michigan light into an architectural language.",
    narrative: "This is the 'Blue-Glass Cathedral' moment. A facade that breathes through color, providing a privacy screen that feels like living inside a jewel box.",
    palette: { bg: "#061a1d", accent: "#2dd4bf" },
    specs: "Dichroic blue-scale glass panels, black steel structural fins, river stone bed.",
  },
  {
    id: "hounds_perch",
    label: "Hound's Perch",
    sublabel: "Oliver / Vigil / Interior",
    image: "bsart773_mid-century_modern_living_room_with_geometric_glass_di_e938f9fb-cedd-4986-8f78-032be89706dc.jpg",
    philosophy: "A sanctuary designed for a Redbone's perspective. Surveillance meets Mid-Century warmth.",
    narrative: "Oliver’s throne. The geometric dividers echo the exterior while the warm wood and low-profile furniture keep the vibe grounded and athletic.",
    palette: { bg: "#1f1712", accent: "#d97706" },
    specs: "Walnut slat ceilings, geometric room dividers, low-slung performance upholstery.",
  },
  {
    id: "external_skin",
    label: "External Skin",
    sublabel: "Stone / Brick / Industrial",
    image: "IMG_2906.jpg",
    philosophy: "The marriage of geologic time and industrial precision.",
    narrative: "Fieldstone transitions into brick, held together by the 'Spine' of vertical black steel beams. This is the heavy armor of the house.",
    palette: { bg: "#18181b", accent: "#a1a1aa" },
    specs: "Locally sourced fieldstone, reclaimed brick, I-beam vertical structural elements.",
  },
  {
    id: "cellular_void",
    label: "Cellular Void",
    sublabel: "Organic / Perforated / Light",
    image: "IMG_2907.jpg",
    philosophy: "Escaping the tyranny of the solid wall.",
    narrative: "A laser-cut screen that mimics the organic branching of the surrounding Hart forest. It creates a shadow play that evolves with the sun.",
    palette: { bg: "#0c0a09", accent: "#fbbf24" },
    specs: "CNC laser-cut plywood/steel screens, floor-to-ceiling glazing.",
  },
  {
    id: "night_owl_sanctuary",
    label: "Night-Owl Bath",
    sublabel: "Azure / Marble / Zen",
    image: "bsart773_mid-century_modern_bathroom_with_geometric_privacy_gla_f3ccc44e-54fb-4b59-ba57-c5f6661e3fd8.jpg",
    philosophy: "Circadian-aware cleansing. No harsh 3AM glares.",
    narrative: "The blue glass returns to create a private, underwater-feeling sanctuary. Deep soaking tubs for the 3AM reset.",
    palette: { bg: "#082f49", accent: "#0ea5e9" },
    specs: "White marble floating vanity, blue geometric privacy glass, vertical LED strip lighting.",
  },
  {
    id: "lortondale_garage",
    label: "The Hangar",
    sublabel: "Frosted / Flat / Modern",
    image: "bsart773_mid-century_modern_house_in_Tulsa_Lortondale_custom_ga_4f0b907b-60f0-4d61-911c-d16b8227f0a5.jpg",
    philosophy: "The garage as a gallery. Storing the tools of mobility.",
    narrative: "Lortondale-inspired flat rooflines and frosted glass garage doors that glow like lanterns at night.",
    palette: { bg: "#111827", accent: "#facc15" },
    specs: "Frosted multi-pane garage doors, dark charcoal siding, low-profile soffit lighting.",
  },
  {
    id: "biophilic_pod",
    label: "Biophilic Pod",
    sublabel: "Vertical / Garden / Glass",
    image: "AQOV4tSWOSDYK5eM5Yh-rmhefoN2ieIvkj4282Qgpz9Hn4tWhu61rZWUioprXVldhoP-xYTAkwa0J--3SUowrWxw.jpg",
    philosophy: "A living exterior. The house breathes through its walls.",
    narrative: "Perforated screens allowing moss and vines to claim the architecture. A literal 'Green Room' in the woods.",
    palette: { bg: "#064e3b", accent: "#4ade80" },
    specs: "Living wall system, curved wood soffits, corner-butt glass.",
  },
  {
    id: "linear_pavilion",
    label: "Linear Pavilion",
    sublabel: "Cantilever / Wood / Flow",
    image: "AQMWAbLV3cBtuxFyKGAreNSLD3a9sSGm4V4XobkmKQCjt6r88LI1Q10EDkWedordKpgIWF34Z_SIYWA_jBlc03IM.jpg",
    philosophy: "The total SpineFlow experience. Linear, logical, beautiful.",
    narrative: "The long-view. Cedar decks that flow seamlessly into the interior. Joe's ultimate emulation of peace.",
    palette: { bg: "#171717", accent: "#fb923c" },
    specs: "Reclaimed cedar decking, black steel headers, slate stone foundations.",
  }
];

export default function App() {
  const [active, setActive] = useState(0);
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarTab, setSidebarTab] = useState("intent"); 
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const apiKey = ""; // Runtime provided
  const view = INITIAL_VIEWS[active];
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    // Clear temp states when changing view
    setGeneratedImage(null);
    setAnalysis(null);
  }, [active, chatHistory, showChat]);

  const pcmToWav = (pcmData, sampleRate) => {
    const buffer = new ArrayBuffer(44 + pcmData.length * 2);
    const view = new DataView(buffer);
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
    };
    writeString(0, "RIFF");
    view.setUint32(4, 32 + pcmData.length * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, pcmData.length * 2, true);
    for (let i = 0; i < pcmData.length; i++) view.setInt16(44 + i * 2, pcmData[i], true);
    return new Blob([buffer], { type: "audio/wav" });
  };

  const playAudio = async (text) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Persona: Pegasus. Voice: Male/Kore. Vibe: Sophisticated architect. Say: ${text}` }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } }
          }
        })
      });
      if (!response.ok) throw new Error("TTS Failed");
      const result = await response.json();
      const audioData = result.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (audioData) {
        const binaryString = window.atob(audioData);
        const bytes = new Int16Array(binaryString.length / 2);
        for (let i = 0; i < binaryString.length; i += 2) {
          bytes[i / 2] = binaryString.charCodeAt(i) | (binaryString.charCodeAt(i + 1) << 8);
        }
        const wavBlob = pcmToWav(bytes, 24000);
        const audio = new Audio(URL.createObjectURL(wavBlob));
        audio.onended = () => setIsSpeaking(false);
        await audio.play();
      } else setIsSpeaking(false);
    } catch (e) {
      console.error(e);
      setIsSpeaking(false);
    }
  };

  const dreamConcept = async () => {
    setIsGeneratingImage(true);
    try {
      const prompt = `Hyper-realistic architectural concept photo of a Mid-Century Modern ${view.label} in a Michigan forest. Style: SpineFlow, geometric blue glass, black steel, warm walnut, night-time mood, foggy atmosphere, cinematic lighting, 8k.`;
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
        method: "POST",
        body: JSON.stringify({ instances: [{ prompt }], parameters: { sampleCount: 1 } })
      });
      const data = await res.json();
      if (data.predictions?.[0]?.bytesBase64Encoded) {
        setGeneratedImage(`data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`);
        playAudio("I've visualized a variation of this node. It pushes the geometric boundaries even further.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const analyzeArchitecture = async () => {
    setIsAnalyzing(true);
    try {
      const prompt = `As Pegasus, the architectural soul of this house, analyze this image. Identify the materials, the light interaction with the ${view.label}, and give me a brief, technical, yet poetic architectural critique. 2 sentences maximum.`;
      
      // Since we can't fetch the local relative URL as a blob easily in this sandbox for all files, 
      // we use the model's textual understanding of the view context + a grounding prompt.
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Context: This is the ${view.label}. Description: ${view.philosophy}. Prompt: ${prompt}` }] }],
          tools: [{ "google_search": {} }]
        })
      });
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAnalysis(text);
      playAudio(text);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim() || isTyping) return;
    const input = chatInput;
    setChatInput("");
    setIsTyping(true);
    setChatHistory(prev => ({ ...prev, [view.id]: [...(prev[view.id] || []), { role: "user", text: input }] }));
    
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }],
          systemInstruction: { parts: [{ text: `Role: Pegasus (SpineFlow Soul). Tone: Sassy, architectural expert. Context: Viewing ${view.label}. Be brief.` }] }
        })
      });
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setChatHistory(prev => ({ ...prev, [view.id]: [...(prev[view.id] || []), { role: "ai", text }] }));
      playAudio(text);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#050505] text-white font-sans overflow-hidden flex flex-col selection:bg-cyan-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Cormorant+Garamond:ital,wght@1,300;1,400&family=Space+Grotesk:wght@300;400&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-mono { font-family: 'DM Mono', monospace; }
        .font-sans { font-family: 'Space Grotesk', sans-serif; }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.08); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Dynamic Background */}
      <div className="fixed inset-0 transition-all duration-[2000ms] opacity-[0.15]" style={{ backgroundColor: view.palette.bg }} />

      <header className="relative z-50 flex justify-between items-center p-8 lg:px-16 lg:py-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-white/40">SpineFlow_AI.6.7</span>
          </div>
          <span className="font-mono text-[8px] text-cyan-400/60 tracking-widest uppercase mt-2">✨ Gemini Powered Architecture</span>
        </div>
        
        <div className="flex gap-4">
          <button onClick={() => setShowChat(!showChat)} className={`p-5 rounded-full glass transition-all ${showChat ? 'bg-cyan-500 text-black' : 'hover:bg-white/10'}`}>
            <MessageSquare size={20} />
          </button>
          <button onClick={() => setBlueprintMode(!blueprintMode)} className={`p-5 rounded-full glass transition-all ${blueprintMode ? 'bg-white text-black' : 'hover:bg-white/10'}`}>
            <Layers size={20} />
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-grow flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-8 lg:px-24 max-w-[2000px] mx-auto w-full overflow-hidden">
        
        {/* Detail Panel */}
        <section className="w-full lg:w-[35%] flex flex-col space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div>
            <h1 className="text-6xl lg:text-8xl font-serif italic tracking-tighter leading-[0.85] mb-4 text-white">
              {view.label}
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-white/30">{view.sublabel}</p>
          </div>

          <div className="glass p-10 rounded-[3rem] space-y-8 relative overflow-hidden group">
            <div className="flex gap-6 border-b border-white/5 pb-4">
              <button onClick={() => setSidebarTab("intent")} className={`font-mono text-[10px] uppercase tracking-widest ${sidebarTab === 'intent' ? 'text-cyan-400' : 'text-white/20'}`}>Intent</button>
              <button onClick={() => setSidebarTab("narrative")} className={`font-mono text-[10px] uppercase tracking-widest ${sidebarTab === 'narrative' ? 'text-cyan-400' : 'text-white/20'}`}>Narrative</button>
            </div>

            <div className="min-h-[140px]">
              <p className="font-serif italic text-3xl text-white/90 leading-tight">
                {sidebarTab === 'intent' ? view.philosophy : view.narrative}
              </p>
            </div>

            {analysis && (
              <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
                <span className="font-mono text-[8px] uppercase tracking-widest text-cyan-400 block mb-2">✨ Pegasus Analysis</span>
                <p className="font-serif italic text-xl text-cyan-50">{analysis}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button 
                onClick={analyzeArchitecture}
                disabled={isAnalyzing}
                className="flex-1 flex items-center justify-center gap-3 glass p-4 rounded-2xl text-[10px] uppercase font-mono tracking-widest hover:bg-cyan-500/10 transition-all border-cyan-500/30"
              >
                {isAnalyzing ? <Loader2 size={14} className="animate-spin" /> : <Eye size={14} />}
                ✨ Analysis
              </button>
              <button 
                onClick={dreamConcept}
                disabled={isGeneratingImage}
                className="flex-1 flex items-center justify-center gap-3 glass p-4 rounded-2xl text-[10px] uppercase font-mono tracking-widest hover:bg-white/10 transition-all border-white/20"
              >
                {isGeneratingImage ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                ✨ Dream
              </button>
            </div>
          </div>
        </section>

        {/* Visualizer */}
        <section className="w-full lg:w-[65%] relative">
          <div className="relative aspect-[16/9] rounded-[4rem] lg:rounded-[6rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 group">
            
            <img 
              key={view.image}
              src={generatedImage || view.image} 
              className={`w-full h-full object-cover transition-all duration-[1.5s] ease-out ${blueprintMode ? 'grayscale brightness-[2] contrast-125 opacity-10 scale-110' : 'animate-in fade-in'}`} 
              alt={view.label} 
            />

            {/* AI HUD Overlay */}
            <div className="absolute top-12 left-12 flex items-center gap-4 z-30">
                <div className={`p-3 rounded-2xl ${isSpeaking ? 'bg-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.5)]' : 'bg-white/5'}`}>
                  {isSpeaking ? <Activity size={16} className="text-black" /> : <Volume2 size={16} className="text-white/20" />}
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/60">Pegasus Uplink</span>
                  {isGeneratingImage && <span className="font-mono text-[8px] text-cyan-400 animate-pulse">✨ Imagining Geometry...</span>}
                </div>
            </div>

            {/* Nav Arrows */}
            <div className="absolute inset-x-0 bottom-0 p-12 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all">
               <div className="flex gap-4">
                 <button onClick={() => setActive(p => (p - 1 + INITIAL_VIEWS.length) % INITIAL_VIEWS.length)} className="p-6 glass rounded-full hover:bg-white/10 transition-all"><ChevronLeft size={28} /></button>
                 <button onClick={() => setActive(p => (p + 1) % INITIAL_VIEWS.length)} className="p-6 glass rounded-full hover:bg-white/10 transition-all"><ChevronRight size={28} /></button>
               </div>
               
               <div className="flex gap-2 bg-black/40 p-4 rounded-full border border-white/5">
                 {INITIAL_VIEWS.map((_, i) => (
                   <button key={i} onClick={() => setActive(i)} className={`h-1.5 transition-all rounded-full ${i === active ? 'w-12 bg-cyan-500' : 'w-2 bg-white/20'}`} />
                 ))}
               </div>
            </div>

            {/* Chat Integration */}
            {showChat && (
              <div className="absolute inset-0 glass backdrop-blur-[60px] p-12 flex flex-col z-40 animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-serif italic text-4xl">Spatial Chat</h3>
                  <button onClick={() => setShowChat(false)} className="text-white/20 hover:text-white transition-all"><X size={32} /></button>
                </div>
                
                <div ref={scrollRef} className="flex-grow overflow-y-auto space-y-8 no-scrollbar pr-4 mb-8">
                  {(chatHistory[view.id] || []).map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-8 rounded-[2.5rem] ${m.role === 'user' ? 'bg-white/10' : 'bg-cyan-500/10 border border-cyan-500/20 italic font-serif text-2xl'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && <div className="text-cyan-500/40 font-mono text-[10px] animate-pulse uppercase px-8">✨ Pegasus is thinking...</div>}
                </div>

                <div className="relative">
                  <input 
                    value={chatInput} 
                    onChange={e => setChatInput(e.target.value)} 
                    onKeyDown={e => e.key === 'Enter' && handleChat()} 
                    className="w-full bg-black/60 border border-white/10 rounded-[2.5rem] py-8 px-12 text-xl font-serif italic focus:outline-none focus:border-cyan-500/40 transition-all" 
                    placeholder="Ask Pegasus about the flow..." 
                  />
                  <button onClick={handleChat} disabled={!chatInput.trim() || isTyping} className="absolute right-8 top-1/2 -translate-y-1/2 text-cyan-500 hover:text-cyan-300">
                    <Send size={24} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <footer className="p-8 font-mono text-[8px] tracking-[1em] text-center opacity-10 uppercase mt-auto">
        Pegasus Architectural Intelligence // SpineFlow.AI
      </footer>
    </div>
  );
}
