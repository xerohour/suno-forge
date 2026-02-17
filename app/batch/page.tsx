"use client";

import { useState } from "react";
import {
  Settings2,
  History,
  MoreVertical,
  Zap,
  Copy,
  Trash2,
  Castle,
  Layers,
  Plus,
  Library,
  User
} from "lucide-react";
import Link from "next/link";
import { BottomNav, type NavItem } from "@/components/BottomNav";

export default function Batch() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data for initial view or empty state
  const [jobs, setJobs] = useState([
    {
      id: "SF-9012",
      tags: ["Synthwave", "120 BPM", "Analog Bass"],
      prompt: '"Neon rain falling on the chrome streets, heartbeat echoing in the digital heat..."',
      status: "processing" // amber pulse
    },
    {
      id: "SF-9013",
      tags: ["Dark Techno", "142 BPM", "Industrial"],
      prompt: "[Instrumental Build-up] Deep resonance, mechanical shifting, distant sirens...",
      status: "ready" // emerald
    },
    {
      id: "SF-9014",
      tags: ["Lo-fi Hip Hop", "85 BPM", "Chill"],
      prompt: '"Coffee steam rises in the early light, thinking about the city through the night..."',
      status: "processing" // amber
    },
    {
      id: "SF-9015",
      tags: ["Epic Orchestral", "Mixed BPM"],
      prompt: "Staccato strings building tension, rising brass section, cinematic finale...",
      status: "processing" // amber
    }
  ]);

  const navItems: NavItem[] = [
    { label: "Forge", icon: Castle, href: "/studio" },
    { label: "Batch", icon: Layers, href: "/batch", isActive: true },
    { label: "Library", icon: Library, href: "/vision" },
    { label: "Profile", icon: User, href: "#" },
  ];

  async function generateBatch() {
    setLoading(true);
    try {
      const res = await fetch("/api/batch", {
        method: "POST",
        body: JSON.stringify({
          config: { genre: "random", mood: "mix" }, // Default config
          count: 4,
        }),
      });

      const data = await res.json();
      if (data.prompts) {
        // Map new prompts to job structure
        const newJobs = data.prompts.map((p: string, i: number) => ({
          id: `SF-${9016 + i}`,
          tags: ["Generated", "120 BPM"],
          prompt: p,
          status: "ready"
        }));
        setJobs(prev => [...newJobs, ...prev]);
        setResults(data.prompts);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto border-x border-primary/10 bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Settings2 className="text-primary w-6 h-6" />
            <h1 className="text-xl font-bold tracking-tight">Batch Forge</h1>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
              <History className="text-slate-400 w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
              <MoreVertical className="text-slate-400 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-1 px-4 pb-4">
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-2 text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Jobs</p>
            <p className="text-lg font-bold text-primary">{jobs.length}</p>
          </div>
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-2 text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Credits</p>
            <p className="text-lg font-bold text-primary">240</p>
          </div>
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-2 text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">ETA</p>
            <p className="text-lg font-bold text-primary">4m 30s</p>
          </div>
        </div>

        {/* Main CTA */}
        <div className="px-4 pb-4">
          <button
            onClick={generateBatch}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-70"
          >
            <Zap className="w-5 h-5 fill-current" />
            <span>{loading ? "Forging..." : `Run All Batch Jobs (${jobs.length})`}</span>
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-3 pb-24">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em]">Pending Queue</h3>
          <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">Auto-Save ON</span>
        </div>

        {jobs.map((job) => (
          <div key={job.id} className="group relative bg-white dark:bg-[#231830] border border-primary/5 hover:border-primary/30 rounded-xl p-3 transition-all">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500">#{job.id}</span>
                <div className={`h-1.5 w-1.5 rounded-full ${job.status === 'processing' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
              </div>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-primary/10 rounded text-slate-400 hover:text-primary transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-red-500/10 rounded text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {job.tags.map((tag, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-400 italic line-clamp-2 leading-relaxed border-l-2 border-primary/30 pl-3">
              {job.prompt}
            </p>
          </div>
        ))}

        <div className="h-20 flex items-center justify-center opacity-30">
          <div className="flex flex-col items-center gap-2">
            <div className="h-1 w-12 bg-primary/40 rounded-full"></div>
            <p className="text-[10px] font-bold tracking-widest uppercase">End of Batch</p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNav
        items={navItems}
        className="absolute bottom-0 w-full bg-[#261933] border-t border-[#362348] px-2 pt-2 pb-6"
        inactiveIconClassName="text-[#ad92c9] group-hover:text-primary"
        inactiveLabelClassName="text-[#ad92c9]"
        activeIconClassName="text-white"
        activeLabelClassName="text-white"
        centerAction={
          <button className="bg-primary text-white p-4 rounded-full shadow-lg shadow-primary/40 ring-4 ring-background-dark active:scale-95 transition-all">
            <Plus className="w-6 h-6" />
          </button>
        }
      />

      {/* Quick Action Toast (Mobile UI detail) */}
      <div className="absolute bottom-28 left-4 right-4 bg-primary/10 border border-primary/30 backdrop-blur-md px-4 py-2 rounded-lg flex items-center justify-between pointer-events-none opacity-0 transition-opacity">
        <p className="text-xs font-medium text-primary">Job #SF-9012 duplicated</p>
        <button className="text-xs font-bold text-primary uppercase">Undo</button>
      </div>
    </div>
  );
}
