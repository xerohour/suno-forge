"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Vision() {
  const [desc, setDesc] = useState("");
  const [prompt, setPrompt] = useState("");

  async function generate() {
    const res = await fetch("/api/vision", {
      method: "POST",
      body: JSON.stringify({ description: desc }),
    });

    const data = await res.json();
    setPrompt(data.prompt);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vision</CardTitle>
        <CardDescription>Generate a prompt from an image description.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Describe an image..."
        />
        <Button onClick={generate} className="w-full">
          Generate
        </Button>
        <Textarea value={prompt} readOnly className="h-48" />
      </CardContent>
    </Card>
  );
}
