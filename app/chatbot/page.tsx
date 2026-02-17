'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send, Copy, Loader2 } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content:
                "Hi! I'm your AI assistant for generating Suno prompts. Ask me to create prompts for any style, mood, or theme!",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [puterLoaded, setPuterLoaded] = useState(false);

    // Load Puter.js SDK
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.puter.com/v2/';
        script.async = true;
        script.onload = () => {
            setPuterLoaded(true);
            console.log('Puter.js loaded successfully');
        };
        script.onerror = () => {
            console.error('Failed to load Puter.js');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading || !puterLoaded) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // @ts-ignore - Puter is loaded dynamically
            const puter = window.puter;

            if (!puter) {
                throw new Error('Puter.js not loaded');
            }

            // Create a system prompt to guide the AI
            const systemPrompt = `You are an expert at creating Suno AI music prompts. When asked to generate a prompt, provide:
1. A clear genre/style
2. Mood and energy level
3. Tempo (BPM)
4. Key instruments
5. Vocal style (if applicable)
6. Production quality
7. Any special tags or characteristics

Format your response as a complete, ready-to-use Suno prompt. Be creative and specific.`;

            const fullPrompt = `${systemPrompt}\n\nUser request: ${input}`;

            // Call Puter AI with streaming
            const resp = await puter.ai.chat(fullPrompt, {
                model: 'grok-4-fast',
                stream: true,
            });

            let fullResponse = '';
            const assistantMessage: Message = { role: 'assistant', content: '' };
            setMessages((prev) => [...prev, assistantMessage]);

            for await (const part of resp) {
                if (part?.text) {
                    fullResponse += part.text;
                    setMessages((prev) => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1] = {
                            role: 'assistant',
                            content: fullResponse,
                        };
                        return newMessages;
                    });
                }
            }
        } catch (error) {
            console.error('Error calling Puter AI:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content:
                        'Sorry, I encountered an error. Please make sure Puter.js is loaded and try again.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const copyToClipboard = async (text: string, index: number) => {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const quickPrompts = [
        'Generate a random Suno.ai prompt',
        'Create an upbeat pop song prompt',
        'Generate a dark synthwave prompt',
        'Make a lo-fi hip hop prompt',
        'Create an epic cinematic trailer prompt',
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2 animate-in">
                <div className="inline-flex items-center gap-2">
                    <Sparkles className="w-8 h-8 text-primary" />
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                        AI Prompt Generator
                    </h1>
                </div>
                <p className="text-muted-foreground">
                    Chat with AI to generate perfect Suno prompts instantly
                </p>
                {!puterLoaded && (
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        Loading AI assistant...
                    </p>
                )}
            </div>

            {/* Quick Prompts */}
            <Card className="animate-in">
                <CardHeader>
                    <CardTitle className="text-lg">Quick Prompts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {quickPrompts.map((prompt, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => setInput(prompt)}
                                disabled={isLoading}
                            >
                                {prompt}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Chat Messages */}
            <Card className="animate-in">
                <CardContent className="p-6">
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-4 ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                                        {message.role === 'assistant' && message.content && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="shrink-0"
                                                onClick={() => copyToClipboard(message.content, index)}
                                            >
                                                {copiedIndex === index ? (
                                                    <span className="text-xs">Copied!</span>
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted rounded-lg p-4">
                                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </CardContent>
            </Card>

            {/* Input Area */}
            <Card className="animate-in">
                <CardContent className="p-4">
                    <div className="flex gap-2">
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me to generate a Suno prompt... (Press Enter to send)"
                            className="min-h-[60px] resize-none"
                            disabled={isLoading || !puterLoaded}
                        />
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading || !puterLoaded}
                            className="shrink-0"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Powered by Puter.js AI (Grok-4-Fast)
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
