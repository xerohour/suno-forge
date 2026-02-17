import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mt-8">
        Welcome to SunoForge
      </h1>
      <p className="mt-4 text-muted-foreground">
        Your AI music prompt engineering co-pilot.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Studio</CardTitle>
            <CardDescription>
              Craft the perfect prompt with fine-tuned controls.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/studio">Go to Studio</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Batch</CardTitle>
            <CardDescription>
              Generate multiple prompt variations at once.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/batch">Go to Batch</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vision</CardTitle>
            <CardDescription>
              Generate prompts from an image description.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/vision">Go to Vision</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Prompting Compendium</CardTitle>
            <CardDescription>
              A technical guide for AI-assisted music generation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/suno-prompting-compendium.md" target="_blank">
                Read the Guide
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
