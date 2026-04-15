import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Scan,
  Layers,
  AlertCircle,
  Maximize2,
  Sparkles,
  X,
  Zap,
  EyeOff,
  Volume2,
  MessageSquare,
  Construction,
  Send,
} from "lucide-react";

const INITIAL_VIEWS = [
  {
    id: "mosaic_portal",
    label: "Mosaic Portal",
    sublabel: "Geometry / Teal / Entry",
    prompt: `Architectural photography of a tiny house entrance with a massive stained-glass facade, geometric teal and blue mosaic patterns. Black steel vertical beams, river stone floor. Soft afternoon sun casting colored shadows --ar 16:9`,
    atmosphere: `Light breaks into fragments, painting the soul in teal geometry.`,
    palette: { bg: "#061a1d", accent: "#2dd4bf" },
  },
  {
    id: "cobmoosa_study",
    label: "The Heritage Study",
    sublabel: "Timber / Woven / History",
    prompt: `Interior tiny house office inspired by Ottawa tribe textures. Hand-hewn heavy timber beams, woven reed wall coverings, a large window looking into a Michigan forest. Modern desk, minimalist tech. Warm, respectful, earthy aesthetic --ar 16:9`,
    atmosphere: `A space for deep work, anchored by the weight of timber and the stories of the Odawa.`,
    palette: { bg: "#1c1917", accent: "#fb923c" },
  },
  {
    id: "night_owl_kitchen",
    label: "3AM Kitchen",
    sublabel: "Amber / Slate / Circadian",
    prompt: `Modern tiny house kitchen at night. Under-cabinet amber LED lighting, dark slate countertops, minimalist black fixtures. No overhead lights. High-end, moody, night-owl aesthetic. View of a starry sky through a thin window --ar 16:9`,
    atmosphere: `Optimized for the midnight mind. Soft amber glows where the day used to be.`,
    palette: { bg: "#020617", accent: "#f59e0b" },
  },
  {
    id: "solar_walkway",
    label: "The Kinetic Path",
    sublabel: "Solar / Glow / Sustainable",
    prompt: `Exterior shot of a tiny house at dusk with a sidewalk made of hexagonal glass solar panels glowing softly from within. The path leads to a modern house with a river stone base and black steel accents. Cinematic night lighting --ar 16:9`,
    atmosphere: `The ground drinks the sun all day and breathes it back as light at night.`,
    palette: { bg: "#0f172a", accent: "#38bdf8" },
  },
  {
    id: "forest_bath",
    label: "Forest Bath",
    sublabel: "Steam / Stone / Privacy",
    prompt: `Interior tiny house bathroom with river stone floor, dark slate walls, warm teak millwork, frosted glass privacy panels, black steel fixtures, soft steam in the air, filtered forest light entering from a narrow clerestory window, luxurious biophilic spa atmosphere, ultra realistic architectural photography --ar 16:9`,
    atmosphere: `A private ritual chamber where stone, steam, and light soften the edges of the day.`,
    palette: { bg: "#111827", accent: "#34d399" },
  },
  {
    id: "sleeping_niche",
    label: "Sleeping Niche",
    sublabel: "Linen / Walnut / Quiet",
    prompt: `Tiny house sleeping loft or niche with built-in walnut bed platform, soft linen bedding, warm indirect amber lighting, black steel detailing, minimal shelving, intimate cocoon-like proportions, view toward pine trees through a long horizontal window, serene high-end architectural interior --ar 16:9`,
    atmosphere: `A compact sanctuary shaped for rest, where darkness and warmth settle into perfect proportion.`,
    palette: { bg: "#1f1720", accent: "#fca5a5" },
  },
  {
    id: "lantern_courtyard",
    label: "Lantern Court",
    sublabel: "Courtyard / Glow / Reflection",
    prompt: `Exterior tiny house courtyard at dusk with shallow reflecting pool, perforated metal walls glowing with warm and teal interior light, black steel frame, river stone edges, cedar soffits, minimal grasses moving in the wind, cinematic luxury architectural photography, ultra realistic --ar 16:9`,
    atmosphere: `Light gathers in the courtyard like a held breath, reflecting the house back to itself.`,
    palette: { bg: "#0b1120", accent: "#67e8f9" },
  },
];

const TEXT_MODEL = "gemini-2.5-flash-preview-09-2025";
const TTS_MODEL = "gemini-2.5-flash-preview-tts";
const IMAGE_MODEL = "imagen-4.0-generate-001";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const safeJsonParse = (text: string) => {
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};

export default function SpineFlowTiny() {
  const [views, setViews] = useState(INITIAL_VIEWS);
  const [active, setActive] = useState(0);
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [cinematicMode, setCinematicMode] = useState(false);

  const [materialSpecs, setMaterialSpecs] = useState<Record<string, string>>({});
  const [fetchingSpecs, setFetchingSpecs] = useState(false);
  const [showSynthesis, setShowSynthesis] = useState(false);
  const [synthesisInput, setSynthesisInput] = useState("");
  const [synthesizing, setSynthesizing] = useState(false);

  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistoryByView, setChatHistoryByView] = useState<
    Record<string, { role: "user" | "ai"; text: string }[]>
  >({});
  const [isTyping, setIsTyping] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);

  const mountedRef = useRef(true);
  const inFlightRef = useRef(new Set<string>());
  const audioContextRef = useRef<AudioContext | null>(null);
  const apiKey = "";

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const view = views[active];
  const activeChat = chatHistoryByView[view.id] || [];

  const addNode = useCallback((node: (typeof INITIAL_VIEWS)[number]) => {
    setViews((prev) => {
      const next = [...prev, node];
      queueMicrotask(() => setActive(next.length - 1));
      return next;
    });
  }, []);

  const fetchGemini = async (
    query: string,
    system: string,
    model = TEXT_MODEL,
    mimeType = "text/plain",
    chatContext: { role: "user" | "model"; parts: { text: string }[] }[] = []
  ) => {
    let retries = 0;

    while (retries < 5) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents:
                chatContext.length > 0
                  ? [...chatContext, { role: "user", parts: [{ text: query }] }]
                  : [{ parts: [{ text: query }] }],
              systemInstruction: { parts: [{ text: system }] },
              generationConfig: { responseMimeType: mimeType },
            }),
          }
        );

        if (!response.ok) {
          if (![429, 500, 502, 503, 504].includes(response.status)) {
            throw new Error(`NON_RETRYABLE_${response.status}`);
          }
          throw new Error(`RETRYABLE_${response.status}`);
        }

        const data = await response.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (message.includes("NON_RETRYABLE")) throw err;
        retries += 1;
        await sleep(2 ** retries * 1000);
      }
    }

    throw new Error("MAX_RETRIES");
  };

  const speakOracle = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);

    try {
      const textToSpeak = `Establishing node: ${view.label}. ${view.atmosphere}. Construction involves ${view.sublabel}. Welcome home.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Say in a calm, professional, high-end architectural narrator voice: ${textToSpeak}`,
                  },
                ],
              },
            ],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: "Charon" },
                },
              },
            },
          }),
        }
      );

      const result = await response.json();
      const audioData = result?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!audioData) throw new Error("NO_AUDIO_DATA");

      const binaryString = window.atob(audioData);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }

      const audioBuffer = await audioContextRef.current.decodeAudioData(bytes.buffer);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => mountedRef.current && setIsSpeaking(false);
      source.start();
    } catch (err) {
      console.error("TTS failed:", err);
      if (mountedRef.current) setIsSpeaking(false);
    }
  };

  const fetchMaterialSpecs = async () => {
    if (fetchingSpecs || materialSpecs[view.id]) return;
    setFetchingSpecs(true);

    try {
      const system =
        "You are an architectural technologist. Provide a concise manifest of materials and finishes for the room described. Be specific. Max 120 words.";
      const result = await fetchGemini(`Manifest construction for: ${view.prompt}`, system);

      if (mountedRef.current) {
        setMaterialSpecs((prev) => ({ ...prev, [view.id]: result }));
      }
    } catch (err) {
      console.error("Specs failed:", err);
    } finally {
      if (mountedRef.current) setFetchingSpecs(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim() || isTyping) return;

    const input = chatInput;
    const currentId = view.id;
    setChatInput("");
    setIsTyping(true);

    const userMsg = { role: "user" as const, text: input };
    setChatHistoryByView((prev) => ({
      ...prev,
      [currentId]: [...(prev[currentId] || []), userMsg],
    }));

    try {
      const system = `You are a spatial design oracle. The user is exploring a room called "${view.label}". 
      Respond poetically but technically about the design intent, materials, and spatial experience. 
      Keep responses under 100 words. Reference the atmosphere: "${view.atmosphere}"`;

      const chatContext = (chatHistoryByView[currentId] || []).map((msg) => ({
        role: msg.role === "user" ? ("user" as const) : ("model" as const),
        parts: [{ text: msg.text }],
      }));

      const aiResponse = await fetchGemini(input, system, TEXT_MODEL, "text/plain", chatContext);

      if (mountedRef.current) {
        setChatHistoryByView((prev) => ({
          ...prev,
          [currentId]: [
            ...(prev[currentId] || []),
            { role: "ai" as const, text: aiResponse },
          ],
        }));
      }
    } catch (err) {
      console.error("Chat failed:", err);
    } finally {
      if (mountedRef.current) setIsTyping(false);
    }
  };

  const synthesizeNode = async () => {
    if (synthesizing || !synthesisInput.trim()) return;
    setSynthesizing(true);

    try {
      const system = `You are an architectural visionary. The user is describing a new spatial expansion for the SpineFlow Tiny house. 
      Create a JSON object with: { id, label, sublabel, prompt, atmosphere, palette: { bg, accent } }. 
      Make it poetic and technically precise.`;

      const jsonResponse = await fetchGemini(
        synthesisInput,
        system,
        TEXT_MODEL,
        "application/json"
      );

      const newNode = safeJsonParse(jsonResponse);
      addNode(newNode);
      setShowSynthesis(false);
      setSynthesisInput("");
    } catch (err) {
      console.error("Synthesis failed:", err);
    } finally {
      if (mountedRef.current) setSynthesizing(false);
    }
  };

  const generateImage = async (
    index: number,
    options?: { forceRetry?: boolean }
  ) => {
    const targetView = views[index];
    if (!targetView) return;

    const key = targetView.id;
    if (inFlightRef.current.has(key) || (images[key] && !options?.forceRetry)) return;

    inFlightRef.current.add(key);
    setLoading((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: "" }));

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generate?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: targetView.prompt,
            config: { number_of_images: 1, output_mime_type: "image/jpeg" },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Image generation failed: ${response.status}`);
      }

      const data = await response.json();
      const imageUrl = data?.candidates?.[0]?.image?.uri;

      if (!imageUrl) throw new Error("No image URI returned");

      if (mountedRef.current) {
        setImages((prev) => ({ ...prev, [key]: imageUrl }));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (mountedRef.current) {
        setErrors((prev) => ({ ...prev, [key]: message }));
      }
    } finally {
      inFlightRef.current.delete(key);
      if (mountedRef.current) {
        setLoading((prev) => ({ ...prev, [key]: false }));
      }
    }
  };

  useEffect(() => {
    generateImage(active);
  }, [active]);

  return (
    <div
      className="min-h-screen w-full overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: view.palette.bg }}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="relative w-full h-screen flex flex-col lg:flex-row gap-8 lg:gap-12 p-8 lg:p-16">
        <div className="w-full lg:w-1/3 flex flex-col justify-between order-2 lg:order-1">
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: view.palette.accent }}
                  />
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.5em]"
                    style={{ color: view.palette.accent }}
                  >
                    Node_{active + 1}_of_{views.length}
                  </span>
                </div>
                <h1 className="font-serif text-5xl font-light tracking-tight text-white mb-2">
                  {view.label}
                </h1>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                  {view.sublabel}
                </p>
              </div>

              <button
                onClick={speakOracle}
                disabled={isSpeaking}
                className="p-4 rounded-full border border-white/10 hover:border-white/20 text-white/40 hover:text-white transition-all"
              >
                <Volume2 size={24} />
              </button>
            </div>

            <p className="font-serif text-2xl italic text-white/70 leading-relaxed mb-12">
              "{view.atmosphere}"
            </p>

            <div className="flex gap-4 mb-12">
              <button
                onClick={() => setBlueprintMode(!blueprintMode)}
                className={`px-6 py-3 rounded-full font-mono text-[9px] uppercase tracking-widest border transition-all ${
                  blueprintMode
                    ? "bg-white/10 border-white/30 text-white"
                    : "border-white/10 text-white/40 hover:border-white/20"
                }`}
              >
                <Layers className="inline mr-2" size={14} />
                Blueprint
              </button>
              <button
                onClick={() => setShowChat(true)}
                className="px-6 py-3 rounded-full font-mono text-[9px] uppercase tracking-widest border border-white/10 text-white/40 hover:border-white/20 transition-all"
              >
                <MessageSquare className="inline mr-2" size={14} />
                Dialogue
              </button>
              <button
                onClick={() => setShowSynthesis(true)}
                className="px-6 py-3 rounded-full font-mono text-[9px] uppercase tracking-widest border border-white/10 text-white/40 hover:border-white/20 transition-all"
              >
                <Sparkles className="inline mr-2" size={14} />
                Synthesize
              </button>
            </div>

            <div className="flex flex-col gap-6 pt-4">
              <button
                onClick={fetchMaterialSpecs}
                disabled={fetchingSpecs}
                className="w-fit px-8 py-5 rounded-2xl bg-white/5 border border-white/10 font-mono text-[10px] uppercase tracking-widest flex items-center gap-4 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                {fetchingSpecs ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Construction size={18} />
                )}
                Material_Manifest ✨
              </button>

              {materialSpecs[view.id] && (
                <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10">
                  <div className="font-mono text-[8px] uppercase tracking-[0.5em] text-emerald-400 mb-6">
                    Execution_Spec
                  </div>
                  <p className="font-serif text-lg text-white/60 leading-relaxed whitespace-pre-wrap">
                    {materialSpecs[view.id]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex-grow h-[45vh] lg:h-[80vh] relative group order-1 lg:order-2">
          <div className="absolute inset-0 rounded-[3.5rem] overflow-hidden border border-white/10 bg-zinc-950/50 shadow-2xl">
            {images[view.id] ? (
              <img
                src={images[view.id]}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                  blueprintMode
                    ? "grayscale brightness-150 contrast-125 opacity-30 scale-105"
                    : ""
                }`}
                alt={view.label}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
                <Scan className="text-white/5 animate-pulse" size={160} />
                <span className="font-mono text-[11px] uppercase tracking-[0.6em] opacity-30">
                  Establishing_Connection...
                </span>
              </div>
            )}

            {loading[view.id] && !images[view.id] && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <Loader2 className="animate-spin text-white/70" size={36} />
              </div>
            )}

            {showChat && (
              <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-2xl p-12 lg:p-16 flex flex-col">
                <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-400 flex items-center gap-2">
                      <MessageSquare size={14} /> Neural_Dialogue ✨
                    </span>
                    <span className="font-serif italic text-white/30 mt-1">
                      Context: {view.label}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-white/40 hover:text-white transition-all"
                  >
                    <X size={28} />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto mb-8 space-y-8 no-scrollbar">
                  {activeChat.length === 0 && (
                    <p className="text-white/20 font-serif italic text-2xl text-center mt-20">
                      "How does this space intend to serve me?"
                    </p>
                  )}
                  {activeChat.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[75%] px-8 py-5 rounded-[2rem] ${
                          msg.role === "user"
                            ? "bg-white/10 text-white/90"
                            : "bg-cyan-500/10 border border-cyan-500/20 text-cyan-50 italic font-serif text-xl"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="text-cyan-400 animate-pulse font-mono text-[9px] tracking-widest">
                      Processing_Spatial_Intent...
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleChat()}
                    placeholder="Ask the room about its design philosophy..."
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-10 py-6 font-serif text-xl focus:outline-none focus:border-cyan-500/50"
                  />
                  <button
                    onClick={handleChat}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-cyan-400 hover:scale-110 transition-all"
                  >
                    <Send size={24} />
                  </button>
                </div>
              </div>
            )}

            {errors[view.id] && !loading[view.id] && !images[view.id] && (
              <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/95 p-12 text-center">
                <AlertCircle className="text-red-500 mb-8" size={60} />
                <h2 className="font-mono text-sm mb-6 tracking-widest text-red-400 uppercase">
                  Signal_Loss_Detected
                </h2>
                <button
                  onClick={() => generateImage(active, { forceRetry: true })}
                  className="font-mono text-[10px] uppercase border border-red-500/30 px-10 py-5 rounded-full hover:bg-red-500/10 transition-all"
                >
                  Retry_Link
                </button>
              </div>
            )}
          </div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-6 z-40">
            <button
              onClick={() => setActive((p) => (p - 1 + views.length) % views.length)}
              className="w-20 h-20 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all shadow-2xl"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % views.length)}
              className="w-20 h-20 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all shadow-2xl"
            >
              <ChevronRight size={36} />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => setCinematicMode(!cinematicMode)}
        className="fixed bottom-10 right-10 z-[100] p-5 rounded-full bg-zinc-900 border border-white/10 text-white/40 hover:text-white shadow-2xl transition-all"
      >
        {cinematicMode ? <EyeOff size={24} /> : <Maximize2 size={24} />}
      </button>

      {cinematicMode && (
        <div className="fixed inset-0 z-[150] bg-black">
          {images[view.id] && (
            <img src={images[view.id]} className="w-full h-full object-cover opacity-80" alt={view.label} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-20 left-20">
            <h2 className="font-serif text-8xl font-extralight tracking-tighter italic text-white/90 mb-4">
              {view.label}
            </h2>
            <p className="font-mono text-sm tracking-[0.8em] text-white/30 uppercase">
              {view.sublabel}
            </p>
          </div>
          <button
            onClick={() => setCinematicMode(false)}
            className="absolute top-10 right-10 p-6 rounded-full text-white/40 hover:text-white transition-all"
          >
            <X size={40} />
          </button>
        </div>
      )}

      {showSynthesis && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-zinc-950 rounded-[3rem] p-12 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col">
                <h3 className="font-mono text-xs uppercase tracking-[0.4em] text-cyan-400">
                  Node_Synthesis ✨
                </h3>
                <span className="font-mono text-[9px] text-white/20 uppercase mt-1">
                  Expanding Latent Architecture
                </span>
              </div>
              <button
                onClick={() => setShowSynthesis(false)}
                className="text-white/40 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <textarea
              className="w-full bg-white/5 rounded-[2rem] p-8 text-xl font-serif italic text-white/90 border border-white/10 focus:outline-none focus:border-cyan-500/50 resize-none h-48 mb-10 transition-all"
              placeholder="Describe a spatial expansion... e.g. 'A library of liquid light'..."
              value={synthesisInput}
              onChange={(e) => setSynthesisInput(e.target.value)}
            />

            <button
              onClick={synthesizeNode}
              disabled={synthesizing || !synthesisInput.trim()}
              className="w-full py-6 rounded-[2rem] bg-cyan-500/10 border border-cyan-500/20 font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-400 flex items-center justify-center gap-6 hover:bg-cyan-500/20 transition-all disabled:opacity-10"
            >
              {synthesizing ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              Synthesize_Node ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
