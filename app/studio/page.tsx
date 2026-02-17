"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Music,
  BookOpen,
  SlidersHorizontal,
  Zap,
  Home,
  Bot,
  Library,
  UserCircle
} from "lucide-react";
import Link from "next/link";
import { PROMPT_PACKS } from "@/lib/promptPacks";

// Chips data defined outside component to avoid recreation on every render
const STYLE_CHIPS = [
  "Lo-fi",
  "Synthwave",
  "Heavy Metal",
  "Jazz Fusion",
  "Hyperpop"
];

export default function Studio() {
  // State
  const [style, setStyle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [randomness, setRandomness] = useState(6.4);
  const [complexity, setComplexity] = useState(82);
  const [experimental, setExperimental] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChipClick = (chip: string) => {
    setStyle(chip);
  };

  async function generate() {
    setLoading(true);
    try {
      // Map simple UI state to the complex API payload
      // We'll use defaults for fields not exposed in the UI
      const payload = {
        title: "Untitled Track",
        genre: style || "pop",
        mood: "energetic", // Default or derived
        lyrics: lyrics,
        // We could pass randomness/complexity if the API supported it
        // For now we just pass what we have
        styleTags: [style],
        experimental: experimental
      };

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Generation failed');
      }

      const data = await res.json();
      console.log("Generated:", data);
      // In a real app we'd probably redirect to a result page or show the result
      // The design doesn't show the result state, but for now we just log it
      // or maybe show a toast.
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-[430px] mx-auto bg-background-light dark:bg-background-dark overflow-x-hidden border-x border-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4">
        <button className="text-primary p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold tracking-tight text-center flex-1 pr-6">Studio</h1>
        <div className="w-6"></div> {/* Spacer for centering */}
      </header>

      {/* Main Form Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-32 space-y-8 pt-4 custom-scrollbar">
        {/* Musical Style Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Music className="text-primary w-5 h-5" />
            <h2 className="text-lg font-bold leading-tight tracking-tight">Musical Style</h2>
          </div>
          <div className="relative group">
            <input
              className="w-full rounded-xl border border-primary/20 bg-primary/5 px-4 py-4 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
              placeholder="Enter style (e.g. Cyberpunk Jazz)..."
              type="text"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
          </div>
          {/* Style Suggestions Chips */}
          <div className="flex gap-2 overflow-x-auto custom-scrollbar -mx-1 px-1 py-1">
            {STYLE_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors ${
                  style === chip
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-primary/10 border border-primary/20 hover:bg-primary/20 text-slate-700 dark:text-slate-200"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* Lyrics Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary w-5 h-5" />
            <h2 className="text-lg font-bold leading-tight tracking-tight">Lyrics</h2>
          </div>
          <div className="relative">
            <textarea
              className="w-full rounded-xl border border-primary/20 bg-primary/5 p-4 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
              placeholder="Paste your lyrics here or describe a story..."
              rows={6}
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
            ></textarea>
          </div>
        </section>

        {/* Mutation Controls Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="text-primary w-5 h-5" />
            <h2 className="text-lg font-bold leading-tight tracking-tight">Mutation Controls</h2>
          </div>
          <div className="space-y-6 bg-primary/5 rounded-2xl p-5 border border-primary/10">
            {/* Randomness Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Randomness</label>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{randomness}</span>
              </div>
              <input
                className="w-full h-1.5 bg-primary/20 rounded-full appearance-none cursor-pointer accent-primary"
                max="10"
                min="0"
                step="0.1"
                type="range"
                value={randomness}
                onChange={(e) => setRandomness(parseFloat(e.target.value))}
              />
            </div>
            {/* Complexity Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Complexity</label>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {complexity > 75 ? "High" : complexity > 40 ? "Medium" : "Low"}
                </span>
              </div>
              <input
                className="w-full h-1.5 bg-primary/20 rounded-full appearance-none cursor-pointer accent-primary"
                max="100"
                min="0"
                step="1"
                type="range"
                value={complexity}
                onChange={(e) => setComplexity(parseInt(e.target.value))}
              />
            </div>
            <hr className="border-primary/10"/>
            {/* Experimental Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Experimental Mode</span>
                <span className="text-xs text-slate-500">Unstable but creative rhythms</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={experimental}
                  onChange={(e) => setExperimental(e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Generate Button & Nav */}
      <div className="fixed bottom-0 w-full max-w-[430px] p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent z-30">
        <button
          onClick={generate}
          disabled={loading}
          className="neon-glow w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-70"
        >
          <Zap className="w-5 h-5 fill-current" />
          {loading ? "Generating..." : "Generate Music"}
        </button>

        {/* Bottom Navigation */}
        <nav className="flex justify-around items-center pt-6 pb-2 text-slate-400 dark:text-slate-500">
          <Link href="/" className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium uppercase tracking-widest">Home</span>
          </Link>
          <Link href="/studio" className="flex flex-col items-center gap-1 text-primary">
            <Bot className="w-6 h-6" />
            <span className="text-[10px] font-medium uppercase tracking-widest">Studio</span>
          </Link>
          <Link href="/vision" className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
            <Library className="w-6 h-6" />
            <span className="text-[10px] font-medium uppercase tracking-widest">Library</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-1 hover:text-primary transition-colors">
            <UserCircle className="w-7 h-7" />
            <span className="text-[10px] font-medium uppercase tracking-widest">Profile</span>
          </Link>
        </nav>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-20 right-[-50px] w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-40 left-[-50px] w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
