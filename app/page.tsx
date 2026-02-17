import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Sparkles, Image, BookOpen } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-16 animate-in">
        <div className="inline-block">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent gradient-primary bg-gradient-to-r from-purple-600 to-blue-500">
            SunoForge
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Your AI music prompt engineering co-pilot
        </p>
        <p className="text-base text-muted-foreground max-w-xl mx-auto">
          Craft perfect prompts for Suno AI with precision controls, batch generation, and
          intelligent templates
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 animate-in">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Music className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-xl">Studio</CardTitle>
            <CardDescription className="text-sm">
              Craft the perfect prompt with fine-tuned controls and live preview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full group-hover:shadow-lg transition-shadow">
              <Link href="/studio">Launch Studio</Link>
            </Button>
          </CardContent>
        </Card>

        <Card
          className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 animate-in"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-xl">Batch</CardTitle>
            <CardDescription className="text-sm">
              Generate multiple prompt variations at once for experimentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full group-hover:shadow-lg transition-shadow">
              <Link href="/batch">Start Batch</Link>
            </Button>
          </CardContent>
        </Card>

        <Card
          className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 animate-in"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Image className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-xl">Vision</CardTitle>
            <CardDescription className="text-sm">
              Generate prompts from image descriptions and visual concepts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full group-hover:shadow-lg transition-shadow">
              <Link href="/vision">Try Vision</Link>
            </Button>
          </CardContent>
        </Card>

        <Card
          className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 animate-in"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-xl">Compendium</CardTitle>
            <CardDescription className="text-sm">
              A technical guide for AI-assisted music generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              variant="outline"
              className="w-full group-hover:shadow-lg transition-shadow"
            >
              <Link href="/suno-prompting-compendium.md" target="_blank">
                Read Guide
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Feature Highlights */}
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl text-center">
        <div className="space-y-2 animate-in" style={{ animationDelay: "0.4s" }}>
          <div className="text-3xl font-bold text-primary">50+</div>
          <div className="text-sm text-muted-foreground">Prompt Templates</div>
        </div>
        <div className="space-y-2 animate-in" style={{ animationDelay: "0.5s" }}>
          <div className="text-3xl font-bold text-primary">8</div>
          <div className="text-sm text-muted-foreground">Mutation Types</div>
        </div>
        <div className="space-y-2 animate-in" style={{ animationDelay: "0.6s" }}>
          <div className="text-3xl font-bold text-primary">∞</div>
          <div className="text-sm text-muted-foreground">Creative Possibilities</div>
        </div>
      </div>
    </div>
  );
}
