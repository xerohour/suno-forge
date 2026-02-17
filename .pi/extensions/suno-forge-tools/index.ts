import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import path from "node:path";
import { Type } from "@sinclair/typebox";

export default function (pi: ExtensionAPI) {
  // Git Workflow Assistant (Checkpoint/Stash)
  pi.on("tool_call", async (event, ctx) => {
    // Intercept edit and write calls
    if (event.toolName === "edit" || event.toolName === "write") {
      try {
        const gitStatus = await pi.exec("git", ["status", "--porcelain"], { timeout: 5000 });

        if (gitStatus.stdout.trim().length > 0) { // If there are uncommitted changes
          const confirmStash = await ctx.ui.confirm(
            "Uncommitted changes detected!",
            "You have uncommitted changes. Would you like to stash them before proceeding with the file modification?",
            { timeout: 15000 }
          );

          if (confirmStash) {
            ctx.ui.notify("Stashing uncommitted changes...", "info");
            const stashResult = await pi.exec("git", ["stash", "save", `pi-auto-stash-${Date.now()}`], { timeout: 10000 });
            if (stashResult.code === 0) {
              ctx.ui.notify("Changes stashed successfully. Proceeding with file modification.", "success");
            } else {
              ctx.ui.notify(`Failed to stash changes: ${stashResult.stderr || stashResult.stdout}`, "error");
              const proceedAnyway = await ctx.ui.confirm(
                "Stash failed!",
                "Failed to stash changes. Do you want to proceed with the file modification anyway?",
                { timeout: 10000 }
              );
              if (!proceedAnyway) {
                return { block: true, reason: "User chose not to proceed after failed stash." };
              }
            }
          } else {
            const proceedAnyway = await ctx.ui.confirm(
              "Uncommitted changes!",
              "You have uncommitted changes and chose not to stash. Do you want to proceed with the file modification anyway?",
              { timeout: 10000 }
            );
            if (!proceedAnyway) {
              return { block: true, reason: "User chose not to proceed with uncommitted changes." };
            }
          }
        }
      } catch (error: any) {
        ctx.ui.notify(`Git check failed (Is Git installed and repository initialized?): ${error.message}`, "warning");
      }
    }
    return;
  });

  // Next.js Scaffolding Tool
  pi.registerCommand("scaffold", {
    description: "Scaffold a new Next.js component, API route, engine, or type definition",
    handler: async (args: string, ctx) => {
      let [type, name] = args.split(" ").filter(Boolean);

      const validTypes = ["api-route", "component", "engine", "type"];

      if (!type) {
        type = await ctx.ui.select("Select scaffold type:", validTypes);
        if (!type) {
          ctx.ui.notify("Scaffolding cancelled: No type selected.", "warning");
          return;
        }
      }

      if (!validTypes.includes(type)) {
        ctx.ui.notify(`Invalid scaffold type: ${type}. Valid types are: ${validTypes.join(", ")}.`, "error");
        return;
      }

      if (!name) {
        name = await ctx.ui.input(`Enter name for new ${type}:`, `my-${type}`);
        if (!name) {
          ctx.ui.notify("Scaffolding cancelled: No name provided.", "warning");
          return;
        }
      }

      ctx.ui.notify(`Scaffolding new ${type}: ${name}...`, "info");

      try {
        const filePath = await generateFile(type, name, ctx);
        if (filePath) {
          ctx.ui.notify(`Successfully scaffolded ${type} at: ${filePath}`, "success");
        } else {
          ctx.ui.notify(`Failed to scaffold ${type}: ${name}. Unknown error.`, "error");
        }
      } catch (error: any) {
        ctx.ui.notify(`Error scaffolding ${type}: ${error.message}`, "error");
      }
    },
  });

  // Jest Test Runner & Analyzer
  pi.registerCommand("test-project", {
    description: "Run Jest unit tests, optionally for a specific file",
    handler: async (args: string, ctx) => {
      const filePath = args.trim();
      const testCommand = ["npm", "test"];
      if (filePath) {
        testCommand.push("--", filePath);
      }

      ctx.ui.notify(`Running Jest tests${filePath ? ` for ${filePath}` : ""}...`, "info");

      try {
        const result = await pi.exec(testCommand[0], testCommand.slice(1), { timeout: 120000 }); // 2 min timeout for tests

        if (result.code === 0) {
          ctx.ui.notify(`Jest tests passed${filePath ? ` for ${filePath}` : ""}.`, "success");
        } else {
          const errorOutput = result.stderr || result.stdout;
          const errorLines = errorOutput.split('\n').filter(line => line.trim() !== '');
          const truncatedOutput = errorLines.slice(0, 10).join('\n') + (errorLines.length > 10 ? `\n... (${errorLines.length - 10} more lines)` : '');

          ctx.ui.notify(`Jest tests failed${filePath ? ` for ${filePath}` : ""}!\n${truncatedOutput}`, "error");

          if (errorLines.length > 10) {
              const tempFilePath = path.join(ctx.cwd, `.pi-jest-errors-${Date.now()}.log`);
              await pi.write({path: tempFilePath, content: errorOutput});
              ctx.ui.notify(`Full Jest errors written to ${tempFilePath}`, "warning");
          }
        }
      } catch (execError: any) {
        ctx.ui.notify(`Failed to run Jest tests: ${execError.message}`, "error");
      }
    },
  });

  // Helper function for scaffolding
  async function generateFile(type: string, name: string, ctx: any): Promise<string | null> {
    let content = "";
    let filePath = "";
    const namePascal = name.charAt(0).toUpperCase() + name.slice(1);
    const nameCamel = name.charAt(0).toLowerCase() + name.slice(1);

    switch (type) {
      case "api-route":
        filePath = path.join("app", "api", nameCamel, "route.ts");
        content = `import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get("id");
  // console.log("GET request for ID:", id);

  return NextResponse.json({ message: "Hello from ${namePascal} API GET" });
}

export async function POST(request: Request) {
  // const body = await request.json();
  // console.log("POST request body:", body);

  return NextResponse.json({ message: "Hello from ${namePascal} API POST" }, { status: 201 });
}
`;
        break;

      case "component":
        filePath = path.join("components", `${namePascal}.tsx`);
        content = `'use client';

import React from 'react';

interface ${namePascal}Props {
  // Define component props here
  message?: string;
}

export const ${namePascal}: React.FC<${namePascal}Props> = ({ message = "Hello from ${namePascal}!" }) => {
  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h3 className="text-lg font-semibold">${namePascal} Component</h3>
      <p>{message}</p>
      {/* Add your component logic and UI here */}
    </div>
  );
};
`;
        break;

      case "engine":
        filePath = path.join("lib", `${nameCamel}Engine.ts`);
        content = `// lib/${nameCamel}Engine.ts

interface ${namePascal}Config {
  // Configuration options for the engine
  setting: string;
}

export class ${namePascal}Engine {
  private config: ${namePascal}Config;

  constructor(config: ${namePascal}Config) {
    this.config = config;
    console.log('${namePascal}Engine initialized with:', this.config);
  }

  /**
   * Processes some input related to ${nameCamel}.
   * @param input Data to process.
   * @returns Processed result.
   */
  process(input: string): string {
    console.log('Processing input for ${namePascal}Engine:', input);
    return \`Processed: \${input} with setting: \${this.config.setting}\`;
  }

  // Add more methods as needed, e.g., generate, mutate, validate
}
`;
        break;

      case "type":
        filePath = path.join("types", `${nameCamel}.ts`);
        content = `// types/${nameCamel}.ts

export interface ${namePascal}Data {
  id: string;
  name: string;
  createdAt: Date;
  // Add more properties relevant to ${namePascal} here
}

export type ${namePascal}Status = "pending" | "processing" | "completed" | "failed";

// Example of a request payload type
export interface Create${namePascal}Request {
  title: string;
  description: string;
}
`;
        break;

      default:
        return null; // Should not happen due to validation
    }

    await pi.write({ path: filePath, content });
    return filePath;
  }

  // Suno Prompt Validator/Linter
  pi.registerTool({
    name: "suno_prompt_validator",
    label: "Suno Prompt Validator",
    description: "Validates a Suno music prompt based on basic guidelines (minimum length, common musical keywords).",
    parameters: Type.Object({
      prompt: Type.String({ description: "The Suno music prompt string to validate." }),
    }),
    async execute(toolCallId, params, signal, onUpdate, ctx) {
      const prompt: string = params.prompt;
      const validationMessages: string[] = [];
      let isValid = true;

      // Rule 1: Minimum length
      const minLength = 20;
      if (prompt.length < minLength) {
        validationMessages.push(`Prompt is too short (${prompt.length} chars). Minimum length is ${minLength} characters.`);
        isValid = false;
      }

      // Rule 2: Presence of basic musical keywords (case-insensitive)
      const keywords = ["song", "music", "beat", "instrumental", "melody", "harmony", "rhythm", "vocal", "lyrics", "genre", "style"];
      const lowerCasePrompt = prompt.toLowerCase();
      let foundKeywords = false;
      for (const keyword of keywords) {
        if (lowerCasePrompt.includes(keyword)) {
          foundKeywords = true;
          break;
        }
      }
      if (!foundKeywords) {
        validationMessages.push(`Prompt does not seem to contain common musical keywords. Consider including terms like: ${keywords.slice(0, 5).join(', ')}...`);
        isValid = false;
      }

      // Rule 3: Avoid excessive repetition (very basic check)
      const words = lowerCasePrompt.split(/\s+/).filter(Boolean);
      const wordCounts: { [key: string]: number } = {};
      words.forEach(word => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
      const maxRepetition = Math.ceil(words.length * 0.2); // Allow a word to repeat up to 20% of total words
      for (const word in wordCounts) {
        if (wordCounts[word] > maxRepetition && words.length > 10) { // Only check for longer prompts
          validationMessages.push(`Word "${word}" is highly repetitive (${wordCounts[word]} times). Avoid excessive repetition.`);
          isValid = false;
          break;
        }
      }


      let resultText = isValid ? "Prompt is valid." : "Prompt has validation issues.";
      if (validationMessages.length > 0) {
        resultText += "\n\nIssues found:\n" + validationMessages.map(msg => `- ${msg}`).join('\n');
      }

      return {
        content: [{ type: "text", text: resultText }],
        details: { isValid, validationMessages },
      };
    },
  });

  // Strict Type Checker / Linter
  pi.on("tool_result", async (event, ctx) => {
    // We only care about successful edits and writes that modify files
    if (event.toolName === "edit" || event.toolName === "write") {
      // Check if the tool execution was successful and actually changed something
      if (!event.isError && event.content && event.content.length > 0) {
        ctx.ui.notify("File modified. Running TypeScript check...", "info");
        try {
          // CORRECTED: changed '--noEmit' to '-noEmit'
          const result = await pi.exec("npx", ["tsc", "-noEmit"], { timeout: 30000 }); // 30 sec timeout for tsc

          if (result.code !== 0) {
            // TypeScript found errors
            const errorOutput = result.stderr || result.stdout;
            const errorLines = errorOutput.split('\n').filter(line => line.trim() !== '');
            const truncatedOutput = errorLines.slice(0, 10).join('\n') + (errorLines.length > 10 ? `\n... (${errorLines.length - 10} more errors)` : '');

            ctx.ui.notify(`TypeScript errors found!\n${truncatedOutput}`, "error");
            // Optionally, write full error to a temp file and notify
            if (errorLines.length > 10) {
                const tempFilePath = path.join(ctx.cwd, `.pi-tsc-errors-${Date.now()}.log`);
                await pi.write({path: tempFilePath, content: errorOutput});
                ctx.ui.notify(`Full TypeScript errors written to ${tempFilePath}`, "warning");
            }
          } else {
            ctx.ui.notify("TypeScript check passed. No errors.", "success");
          }
        } catch (execError: any) {
          ctx.ui.notify(`Failed to run TypeScript check: ${execError.message}`, "error");
        }
      }
    }
  });
}