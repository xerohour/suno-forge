"use client";

import { useState, useRef } from "react";
import {
  ArrowLeft,
  Info,
  Camera,
  Sparkles,
  AudioWaveform,
  Wand2,
  Aperture,
  Library,
  User,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function Vision() {
  const [description, setDescription] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [status, setStatus] = useState<"idle" | "ready" | "analyzing" | "done">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate reading file - just use filename for "image analysis" simulation
      const filename = file.name.split('.')[0].replace(/-/g, ' ');
      setDescription(`An image of ${filename}`);
      setStatus("ready");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
       const filename = file.name.split('.')[0].replace(/-/g, ' ');
       setDescription(`An image of ${filename}`);
       setStatus("ready");
    }
  };

  async function generateMusic() {
    if (!description) return;

    setStatus("analyzing");
    setGeneratedPrompt("Analyzing visual data...");

    try {
      const res = await fetch("/api/vision", {
        method: "POST",
        body: JSON.stringify({ description }),
      });

      const data = await res.json();
      // The API returns { prompt: { ... } } or similar.
      // app/api/vision/route.ts returns { prompt: ... } which is an object or string.
      // Let's assume it returns an object and we stringify it or take a specific field.
      // Looking at app/batch/page.tsx, it treats prompts as strings.
      // Looking at app/studio/page.tsx, generatedResult is an object.
      // app/api/vision/route.ts returns { prompt: buildPrompt(...) }. buildPrompt returns Prompt object.
      // We'll format it for the textarea.

      const promptText = data.prompt ?
        `Title: ${data.prompt.title}\nStyle: ${data.prompt.style}\n\n${data.prompt.lyrics || data.prompt.style}`
        : "Failed to generate prompt.";

      setGeneratedPrompt(promptText);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setGeneratedPrompt("Error generating prompt.");
      setStatus("idle");
    }
  }

  return (
    <div className="vision-theme min-h-screen bg-background-light dark:bg-background-dark font-display text-white selection:bg-primary/30">
      {/* Main Container (iOS Phone Frame Emulation) */}
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto border-x border-primary/10 bg-background-light dark:bg-background-dark shadow-2xl">
        {/* Header */}
        <header className="flex items-center px-6 pt-12 pb-4 justify-between sticky top-0 bg-background-dark/80 backdrop-blur-md z-10">
          <Link href="/" className="text-white hover:text-primary transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h2 className="text-lg font-bold tracking-tight uppercase">Vision</h2>
          <button className="text-white hover:text-primary transition-colors" aria-label="Vision Info">
            <Info className="w-6 h-6" />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 px-6 flex flex-col items-center pb-32">
          <div className="w-full text-center mt-4">
            <h1 className="text-3xl font-bold tracking-tighter text-white">Vision <span className="text-primary">Prompting</span></h1>
            <p className="text-primary/60 text-sm mt-1 uppercase tracking-widest font-medium">Image to Sonic AI</p>
          </div>

          {/* Hexagonal Upload Zone */}
          <div
            className="mt-10 relative w-64 h-72 flex items-center justify-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
            {/* Hexagon Shape */}
            <div
              className="relative w-full h-full hexagon-border bg-primary/10 border border-primary/30 flex flex-col items-center justify-center group cursor-pointer hover:bg-primary/20 transition-all duration-500"
              onClick={() => fileInputRef.current?.click()}
            >
              {/* Inner Hexagon for Border Effect */}
              <div className="absolute inset-1 hexagon-border border border-primary/20 pointer-events-none"></div>

              <div className="z-10 flex flex-col items-center gap-4">
                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary shadow-[0_0_20px_rgba(13,242,242,0.4)]">
                  <Camera className="text-primary text-4xl w-8 h-8" />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-lg">{description ? "Image Selected" : "Drop Image"}</p>
                  <p className="text-primary/60 text-xs mt-1 uppercase tracking-tighter">
                    {description ? description.replace("An image of ", "") : "Visual Inspiration"}
                  </p>
                </div>
                <button className="mt-2 bg-primary text-background-dark text-xs font-bold py-2 px-4 rounded-full hover:scale-105 transition-transform">
                  SELECT FILE
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          {/* AI Status Indicator */}
          <div className="mt-12 flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 ${status === 'analyzing' ? 'duration-500' : 'duration-1000'}`}></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
              {status === 'idle' ? "Waiting for Input" : status === 'ready' ? "Ready for Analysis" : status === 'analyzing' ? "Analyzing..." : "Analysis Complete"}
            </span>
          </div>

          {/* Generated Prompt Area */}
          <div className="w-full mt-6 space-y-3">
            <div className="flex justify-between items-end px-1">
              <label htmlFor="generated-prompt" className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Generated Music Prompt</label>
              <Sparkles className="text-primary/40 w-4 h-4" />
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <textarea
                id="generated-prompt"
                className="relative w-full bg-background-dark/50 border border-primary/20 rounded-xl p-4 text-white placeholder:text-white/20 focus:ring-1 focus:ring-primary focus:border-primary min-h-[120px] pulse-border outline-none text-sm leading-relaxed"
                placeholder="Waiting for image analysis..."
                readOnly={status === 'analyzing'}
                value={generatedPrompt}
                onChange={(e) => setGeneratedPrompt(e.target.value)}
              ></textarea>
            </div>
            <p className="text-[10px] text-white/40 italic text-center px-4">The AI will extract mood, textures, and rhythm from your visual input.</p>
          </div>
        </main>

        {/* Footer Action */}
        <footer className="absolute bottom-[80px] w-full px-6 bg-gradient-to-t from-background-dark to-transparent z-20">
          <button
            onClick={generateMusic}
            disabled={status === 'analyzing' || !description}
            aria-busy={status === 'analyzing'}
            className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(13,242,242,0.4)] disabled:opacity-50 disabled:shadow-none"
          >
            {status === 'analyzing' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <AudioWaveform className="w-5 h-5 font-bold" />
            )}
            <span className="uppercase tracking-widest">
              {status === 'analyzing' ? "Analyzing..." : "Generate Music"}
            </span>
          </button>
        </footer>

        {/* Navigation Bar Component */}
        <nav className="flex gap-2 border-t border-primary/10 bg-background-dark/95 px-4 pb-8 pt-3 backdrop-blur-lg absolute bottom-0 w-full z-30">
          <Link href="/studio" className="flex flex-1 flex-col items-center justify-end gap-1 text-primary/40 hover:text-primary transition-colors">
            <Wand2 className="w-6 h-6" />
            <p className="text-[10px] font-bold leading-normal tracking-widest uppercase">Forge</p>
          </Link>
          <Link href="/vision" className="flex flex-1 flex-col items-center justify-end gap-1 text-primary">
            <Aperture className="w-6 h-6" />
            <p className="text-[10px] font-bold leading-normal tracking-widest uppercase">Vision</p>
          </Link>
          <Link href="/library" className="flex flex-1 flex-col items-center justify-end gap-1 text-primary/40 hover:text-primary transition-colors">
            <Library className="w-6 h-6" />
            <p className="text-[10px] font-bold leading-normal tracking-widest uppercase">Library</p>
          </Link>
          <Link href="#" className="flex flex-1 flex-col items-center justify-end gap-1 text-primary/40 hover:text-primary transition-colors">
            <User className="w-6 h-6" />
            <p className="text-[10px] font-bold leading-normal tracking-widest uppercase">Profile</p>
          </Link>
        </nav>

        {/* iOS Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-40"></div>
      </div>
    </div>
  );
}
