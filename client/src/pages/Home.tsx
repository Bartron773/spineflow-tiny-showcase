import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Wifi,
  Layers,
  Maximize2,
  ChevronDown,
  Lightbulb,
  BookOpen,
} from "lucide-react";
import { ENHANCED_VIEWS } from "@/data/nodeContent";

/**
 * SpineFlow Tiny: Enhanced Architectural Showcase
 * 
 * A living architectural interface where each node is a spatial idea you can explore.
 * Each node represents a moment in the house: a room, a threshold, a material transition, or an atmosphere.
 * 
 * Features:
 * - Rich material specifications for each node
 * - Expanded narrative and design philosophy
 * - Interactive expandable sections for deeper exploration
 * - Conversational prompts to engage users
 * - Direct CDN image URLs for reliable image loading
 */

export default function SpineFlowTiny() {
  const [views] = useState(ENHANCED_VIEWS);
  const [active, setActive] = useState(0);
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showSpecifications, setShowSpecifications] = useState(false);

  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const view = views[active];

  const next = () => setActive((prev) => (prev + 1) % views.length);
  const prev = () => setActive((prev) => (prev - 1 + views.length) % views.length);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-black font-sans text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Cormorant+Garamond:ital,wght@1,300;1,400&family=Space+Grotesk:wght@300;400&display=swap');

        .view-content {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blueprint-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .spec-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spec-panel.expanded {
          max-height: 2000px;
        }

        .expandable-section {
          border-left: 2px solid rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }

        .expandable-section.active {
          border-left-color: currentColor;
          background-color: rgba(255,255,255,0.02);
        }
      `}</style>

      {/* Dynamic Background */}
      <div
        className="fixed inset-0 transition-colors duration-1000 opacity-60"
        style={{ backgroundColor: view.palette.bg }}
      />
      {blueprintMode && (
        <div className="blueprint-grid pointer-events-none fixed inset-0 animate-pulse opacity-40" />
      )}

      <div className="relative z-10 mx-auto flex h-full max-w-[393px] flex-col px-7 pt-14 pb-8">
        {/* robotOS Header */}
        <div className="mb-10 flex items-center justify-between opacity-60">
          <div className="flex flex-col">
            <span className="font-mono text-[8px] uppercase tracking-[0.4em]">
              SpineFlow_Tiny
            </span>
            <span className="font-mono text-[9px]">43.69°N / 86.36°W</span>
          </div>

          <div className="flex items-center gap-4">
            <Layers
              className={`cursor-pointer transition-all ${
                blueprintMode ? "scale-110 text-cyan-400" : "text-white/40"
              }`}
              size={18}
              onClick={() => setBlueprintMode((prev) => !prev)}
            />
            <Wifi size={16} />
          </div>
        </div>

        {/* Dynamic Header */}
        <div key={`header-${active}`} className="view-content mb-6">
          <div className="mb-2 flex items-center gap-2">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: view.palette.accent }}
            />
            <span
              className="font-mono text-[9px] uppercase tracking-[0.5em]"
              style={{ color: view.palette.accent }}
            >
              Node_{active + 1}_of_{views.length}
            </span>
          </div>

          <h1 className="font-serif text-4xl font-light tracking-tight mb-1">
            {view.label}
          </h1>
          <p className="font-mono text-[9px] uppercase tracking-widest opacity-40">
            {view.sublabel}
          </p>
        </div>

        {/* Viewfinder Display */}
        <div className="group relative w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 shadow-2xl">
          <img
            src={view.imageUrl}
            alt={view.label}
            className={`absolute inset-0 h-full w-full object-cover duration-1000 animate-in fade-in zoom-in-105 ${
              blueprintMode
                ? "grayscale brightness-150 contrast-150 opacity-30"
                : ""
            }`}
          />

          {/* Technical HUD */}
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6">
            <div className="flex items-start justify-between opacity-30">
              <div className="h-[1px] w-10 bg-white" />
              <div className="text-right">
                <div className="mb-1 font-mono text-[7px]">NEURAL_ENGINE_4.0</div>
                <div className="font-mono text-[7px]">HART_UNIT_0{active + 1}</div>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md">
                <div className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                <span className="font-mono text-[7px] uppercase tracking-widest text-white/80">
                  Telemetry_Safe
                </span>
              </div>
              <div className="h-[1px] w-10 bg-white opacity-30" />
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <div key={`narrative-${active}`} className="view-content mt-8 flex-grow overflow-y-auto">
          <p className="mb-6 min-h-[60px] font-serif text-xl italic leading-snug text-white/80">
            "{view.atmosphere}"
          </p>

          {/* Interactive Sections */}
          <div className="space-y-3 mb-6">
            {/* Design Philosophy */}
            <div
              className={`expandable-section p-3 rounded-lg cursor-pointer ${
                expandedSection === "philosophy" ? "active" : ""
              }`}
              onClick={() => toggleSection("philosophy")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb size={16} />
                  <span className="font-mono text-[9px] uppercase tracking-widest">
                    Design Philosophy
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    expandedSection === "philosophy" ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className={`spec-panel ${expandedSection === "philosophy" ? "expanded" : ""}`}
              >
                <p className="mt-3 text-[11px] leading-relaxed text-white/70">
                  {view.designPhilosophy}
                </p>
              </div>
            </div>

            {/* Spatial Intent */}
            <div
              className={`expandable-section p-3 rounded-lg cursor-pointer ${
                expandedSection === "spatial" ? "active" : ""
              }`}
              onClick={() => toggleSection("spatial")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span className="font-mono text-[9px] uppercase tracking-widest">
                    Spatial Intent
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    expandedSection === "spatial" ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div className={`spec-panel ${expandedSection === "spatial" ? "expanded" : ""}`}>
                <p className="mt-3 text-[11px] leading-relaxed text-white/70">
                  {view.spatialIntent}
                </p>
              </div>
            </div>

            {/* Material Specifications Toggle */}
            <button
              onClick={() => setShowSpecifications(!showSpecifications)}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
              style={{
                backgroundColor: showSpecifications ? `${view.palette.accent}15` : "transparent",
                borderColor: showSpecifications ? view.palette.accent : "rgba(255,255,255,0.1)",
              }}
            >
              <span
                className="font-mono text-[9px] uppercase tracking-widest"
                style={{ color: showSpecifications ? view.palette.accent : "inherit" }}
              >
                Material Specifications
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${showSpecifications ? "rotate-180" : ""}`}
                style={{ color: showSpecifications ? view.palette.accent : "inherit" }}
              />
            </button>

            {/* Specifications Panel */}
            <div
              className={`spec-panel ${showSpecifications ? "expanded" : ""}`}
            >
              <div className="space-y-3 pt-3">
                {view.specifications.map((spec: typeof view.specifications[0], idx: number) => (
                  <div key={idx} className="pl-3 border-l-2 border-white/20">
                    <h4
                      className="font-mono text-[9px] uppercase tracking-widest mb-1"
                      style={{ color: view.palette.accent }}
                    >
                      {spec.title}
                    </h4>
                    <p className="text-[10px] leading-relaxed text-white/60">
                      {spec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contextual Narrative */}
            <div
              className={`expandable-section p-3 rounded-lg cursor-pointer ${
                expandedSection === "narrative" ? "active" : ""
              }`}
              onClick={() => toggleSection("narrative")}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest">
                  Contextual Narrative
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    expandedSection === "narrative" ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div className={`spec-panel ${expandedSection === "narrative" ? "expanded" : ""}`}>
                <p className="mt-3 text-[11px] leading-relaxed text-white/70">
                  {view.contextualNarrative}
                </p>
              </div>
            </div>

            {/* Interactive Prompts */}
            <div
              className={`expandable-section p-3 rounded-lg cursor-pointer ${
                expandedSection === "prompts" ? "active" : ""
              }`}
              onClick={() => toggleSection("prompts")}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest">
                  Explore Further
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    expandedSection === "prompts" ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div className={`spec-panel ${expandedSection === "prompts" ? "expanded" : ""}`}>
                <div className="mt-3 space-y-2">
                  {view.interactivePrompts.map((prompt: string, idx: number) => (
                    <p key={idx} className="text-[10px] leading-relaxed text-white/60 italic">
                      • {prompt}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Nodes */}
          <div className="flex justify-center gap-1.5 mb-6">
            {views.map((item: typeof ENHANCED_VIEWS[0], index: number) => (
              <div
                key={item.id}
                className="h-0.5 rounded-full transition-all duration-700"
                style={{
                  width: active === index ? "24px" : "4px",
                  backgroundColor:
                    active === index ? view.palette.accent : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="flex h-14 flex-1 items-center justify-center rounded-2xl border border-white/5 bg-white/5 transition-all hover:bg-white/10 active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={next}
              className="flex h-14 flex-1 items-center justify-center rounded-2xl border border-white/5 bg-white/5 transition-all hover:bg-white/10 active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Footer Readout */}
        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 opacity-20">
          <span className="font-mono text-[7px] uppercase leading-none tracking-[0.5em]">
            robotOS_v4.1_Images_Live
          </span>
          <Maximize2 size={12} />
        </div>
      </div>
    </div>
  );
}
