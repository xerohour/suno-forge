"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function Batch() {
  const [results, setResults] = useState<string[]>([]);

  async function generateBatch() {
    const res = await fetch("/api/batch", {
      method: "POST",
      body: JSON.stringify({
        config: { genre: "hyperpop", mood: "chaotic" },
        count: 10,
      }),
    });

    const data = await res.json();
    setResults(data.prompts);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Generation</CardTitle>
        <CardDescription>Generate multiple prompt variations at once.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={generateBatch} className="mb-4">
          Generate Batch (10 prompts)
        </Button>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((p, i) => (
            <Textarea key={i} value={p} readOnly className="h-48" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
