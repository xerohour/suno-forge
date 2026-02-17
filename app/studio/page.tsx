'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MOODS,
  INSTRUMENTS,
  PRODUCTION_TERMS,
  VOCAL_TONE_TEXTURE,
  VOCAL_DELIVERY,
} from '@/lib/styleEngine';

const structuralTags = [
  '[Intro]',
  '[Verse]',
  '[Pre-Chorus]',
  '[Chorus]',
  '[Bridge]',
  '[Solo]',
  '[Outro]',
  '[End]',
  '[Build]',
  '[Drop]',
];

const vocalOptions = [...VOCAL_TONE_TEXTURE, ...VOCAL_DELIVERY];

export default function Studio() {
  const [genre, setGenre] = useState('synthwave');
  const [mood, setMood] = useState('nostalgic');
  const [tempo, setTempo] = useState('90');
  const [instrumentation, setInstrumentation] = useState('analog polysynth pads');
  const [vocalStyle, setVocalStyle] = useState('airy female vocal');
  const [production, setProduction] = useState('tape-saturated');
  const [lyrics, setLyrics] = useState('[Verse 1]\nCrystal canyons in the night\n[Chorus]\nNeon dreams take flight');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const lyricsRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (tag: string) => {
    const textarea = lyricsRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText = `${text.substring(0, start)}\n${tag}\n${text.substring(
        end
      )}`;
      setLyrics(newText);
      textarea.focus();
    }
  };

  async function generate() {
    setLoading(true);
    setGeneratedPrompt('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          genre: genre,
          mood: mood,
          tempo: parseInt(tempo, 10),
          instrumentation: instrumentation,
          vocalStyle: vocalStyle,
          production: production,
          lyrics: lyrics,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Generation failed');
      }

      const data = await res.json();

      const formattedOutput = `
Display Name:
\`\`\`
${data.prompt.title}
\`\`\`

Technical Name:
\`\`\`
${data.prompt.technicalName}
\`\`\`

Style Prompt:
\`\`\`
${data.prompt.style}
\`\`\`

Lyrics:
\`\`\`
${data.prompt.lyrics}
\`\`\`
`;
      setGeneratedPrompt(formattedOutput);
    } catch (e: any) {
      setGeneratedPrompt(`Error: ${e.message}`);
    }

    setLoading(false);
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">SunoForge Studio</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Prompt Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="style">Style / Genre</Label>
                <Input
                  id="style"
                  placeholder="e.g., synthwave, indie folk"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mood">Mood / Energy</Label>
                 <Select onValueChange={setMood} value={mood}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mood..." />
                  </SelectTrigger>
                  <SelectContent>
                    {MOODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tempo">Tempo (BPM)</Label>
                <Input
                  id="tempo"
                  type="number"
                  placeholder="e.g., 90"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instrumentation">Key Instruments</Label>
                 <Select onValueChange={setInstrumentation} value={instrumentation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an instrument..." />
                  </SelectTrigger>
                  <SelectContent>
                    {INSTRUMENTS.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="vocal-style">Vocal Style</Label>
                <Input
                  id="vocal-style"
                  placeholder="e.g., airy female vocal, gritty male tenor"
                  value={vocalStyle}
                  onChange={(e) => setVocalStyle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="production">Production</Label>
                <Select onValueChange={setProduction} value={production}>
                  <SelectTrigger>
                    <SelectValue placeholder="e.g., lo-fi, studio quality" />
                  </SelectTrigger>
                  <SelectContent>
                     {PRODUCTION_TERMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Lyrics & Structure</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {structuralTags.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    onClick={() => insertTag(tag)}>
                    {tag}
                  </Button>
                ))}
              </div>
              <Textarea
                ref={lyricsRef}
                id="lyrics"
                placeholder="Use tags like [Verse], [Chorus], [Solo]..."
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                rows={12}
                className="font-mono"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button
            onClick={generate}
            disabled={loading}
            className="w-full text-lg">
            {loading ? 'Generating...' : 'Generate Prompt'}
          </Button>
          <Card className="h-full min-h-[400px]">
            <CardHeader>
              <CardTitle>Generated Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p>Generating...</p>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                  {generatedPrompt}
                </pre>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
