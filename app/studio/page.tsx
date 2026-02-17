"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Studio() {
  const [prompt, setPrompt] = useState("");
  const [config, setConfig] = useState({
    genre: "trap",
    mood: "dark",
    energy: 0.8,
    theme: "neon city loneliness",
  });

  async function generate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify(config),
    });

    const data = await res.json();
    setPrompt(data.prompt);
  }

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Prompt Controls</CardTitle>
          <CardDescription>
            Use the controls below to craft your prompt.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Input
              id="genre"
              name="genre"
              value={config.genre}
              onChange={handleConfigChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mood">Mood</Label>
            <Input
              id="mood"
              name="mood"
              value={config.mood}
              onChange={handleConfigChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="energy">Energy (0.1 - 1.0)</Label>
            <Input
              id="energy"
              name="energy"
              type="number"
              step="0.1"
              min="0.1"
              max="1.0"
              value={config.energy}
              onChange={handleConfigChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Input
              id="theme"
              name="theme"
              value={config.theme}
              onChange={handleConfigChange}
            />
          </div>
          <Button onClick={generate} className="w-full">
            Generate Prompt
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Prompt</CardTitle>
          <CardDescription>
            Your generated prompt will appear below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea value={prompt} readOnly className="h-64" />
        </CardContent>
      </Card>
    </div>
  );
}
