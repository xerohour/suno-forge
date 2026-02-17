'use client'

import { useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  MOODS,
  INSTRUMENTS,
  PRODUCTION_TERMS,
  VOCAL_TONE_TEXTURE,
  VOCAL_DELIVERY,
} from '@/lib/styleEngine'
import { PROMPT_PACKS, getRandomPromptPack, type PromptPack } from '@/lib/promptPacks'
import type { Prompt } from '@/types/prompt'

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
]

const vocalOptions = [...VOCAL_TONE_TEXTURE, ...VOCAL_DELIVERY]
const vocalSelectOptions = Array.from(new Set([...vocalOptions, ...PROMPT_PACKS.map((pack) => pack.vocalStyle)]))

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Japanese',
  'Korean',
  'Hindi',
  'Arabic',
  'Turkish',
  'Russian',
  'Dutch',
  'Swedish',
  'Indonesian',
  'Vietnamese',
]

const styleTagPool = [
  'catchy hook',
  'viral-ready chorus',
  'cinematic intro',
  'emotional lyrics',
  'big drop',
  'anthemic',
  'club-ready',
  'radio-friendly',
  'storytelling',
  'minimal production',
  'experimental',
  'uplifting',
]

const inspirationIdeas = [
  'A late-night drive through neon rain while trying to forget someone.',
  'Small-town dreamer chasing a bigger life in the city.',
  'Post-breakup glow-up anthem with confident energy.',
  'A calm study track that feels like warm coffee and rain.',
  'Festival drop song built around one unforgettable hook.',
]

const templateLibrary: Array<{
  id: string
  name: string
  description: string
  genre: string
  mood: string
  tempo: string
  styleTags: string[]
  negativePrompt: string
}> = [
  {
    id: 'viral-hook',
    name: 'Viral Hook Template',
    description: 'Fast, memorable phrasing with an immediate chorus payoff.',
    genre: 'dance pop',
    mood: 'euphoric',
    tempo: '126',
    styleTags: ['catchy hook', 'viral-ready chorus', 'radio-friendly'],
    negativePrompt: 'no long intro, no abstract lyrics, no low-energy sections',
  },
  {
    id: 'cinematic-trailer',
    name: 'Cinematic Trailer',
    description: 'Build and release structure designed for trailers and edits.',
    genre: 'cinematic',
    mood: 'triumphant',
    tempo: '110',
    styleTags: ['cinematic intro', 'big drop', 'anthemic'],
    negativePrompt: 'avoid lo-fi texture, avoid tiny dynamic range',
  },
  {
    id: 'lofi-focus',
    name: 'Lo-Fi Focus',
    description: 'Calm, repeatable, low-distraction sound design.',
    genre: 'lofi hip hop',
    mood: 'reflective',
    tempo: '84',
    styleTags: ['minimal production', 'storytelling'],
    negativePrompt: 'no hard clipping, no sharp high end, no abrupt drops',
  },
  {
    id: 'alt-ballad',
    name: 'Alt Ballad',
    description: 'Emotion-forward songwriting with space for lyrical detail.',
    genre: 'indie pop',
    mood: 'melancholic',
    tempo: '78',
    styleTags: ['emotional lyrics', 'storytelling'],
    negativePrompt: 'avoid repetitive empty lines, avoid over-compression',
  },
]

type MetaTagCategory =
  | 'all'
  | 'genre'
  | 'mood'
  | 'vocal'
  | 'instrument'
  | 'production'
  | 'structure'

const metaTagLibrary: Array<{ tag: string; category: MetaTagCategory }> = [
  { tag: 'synthwave', category: 'genre' },
  { tag: 'indie pop', category: 'genre' },
  { tag: 'trap', category: 'genre' },
  { tag: 'cinematic', category: 'genre' },
  { tag: 'nostalgic', category: 'mood' },
  { tag: 'euphoric', category: 'mood' },
  { tag: 'melancholic', category: 'mood' },
  { tag: 'triumphant', category: 'mood' },
  { tag: 'airy vocal', category: 'vocal' },
  { tag: 'gritty vocal', category: 'vocal' },
  { tag: 'harmonized', category: 'vocal' },
  { tag: 'rap delivery', category: 'vocal' },
  { tag: 'analog polysynth', category: 'instrument' },
  { tag: '808 bass', category: 'instrument' },
  { tag: 'felt piano', category: 'instrument' },
  { tag: 'guitar lead', category: 'instrument' },
  { tag: 'tape saturated', category: 'production' },
  { tag: 'wide stereo', category: 'production' },
  { tag: 'side-chained', category: 'production' },
  { tag: 'lo-fi texture', category: 'production' },
  { tag: 'intro build', category: 'structure' },
  { tag: 'pre-chorus lift', category: 'structure' },
  { tag: 'anthemic chorus', category: 'structure' },
  { tag: 'final drop', category: 'structure' },
]

type TimelineBlock = {
  id: string
  section: string
  cue: string
}

const sectionOptions = ['Intro', 'Verse', 'Pre-Chorus', 'Chorus', 'Bridge', 'Outro', 'Drop']

const MAX_TITLE = 80
const MAX_DESCRIPTION = 400

type BuildMode = 'simple' | 'custom'

export default function Studio() {
  const defaultPack = PROMPT_PACKS[0]
  const [mode, setMode] = useState<BuildMode>('simple')
  const [isTemplateLibraryOpen, setIsTemplateLibraryOpen] = useState(false)
  const [selectedPackId, setSelectedPackId] = useState(defaultPack.id)
  const [title, setTitle] = useState('')
  const [songIdea, setSongIdea] = useState(inspirationIdeas[0])
  const [language, setLanguage] = useState('English')
  const [instrumental, setInstrumental] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>(['catchy hook'])
  const [negativePrompt, setNegativePrompt] = useState('')
  const [metaCategory, setMetaCategory] = useState<MetaTagCategory>('all')
  const [metaSearch, setMetaSearch] = useState('')
  const [genre, setGenre] = useState(defaultPack.genre)
  const [mood, setMood] = useState(defaultPack.mood)
  const [tempo, setTempo] = useState(String(defaultPack.tempo))
  const [instrumentation, setInstrumentation] = useState(defaultPack.instrumentation)
  const [vocalStyle, setVocalStyle] = useState(defaultPack.vocalStyle)
  const [production, setProduction] = useState(defaultPack.production)
  const [lyrics, setLyrics] = useState(defaultPack.lyricsSeed)
  const [timelineBlocks, setTimelineBlocks] = useState<TimelineBlock[]>([
    { id: 'intro-1', section: 'Intro', cue: 'Set the mood in one strong image.' },
    { id: 'verse-1', section: 'Verse', cue: 'Introduce the story conflict.' },
    { id: 'chorus-1', section: 'Chorus', cue: 'Repeat the core hook phrase.' },
  ])
  const [generatedResult, setGeneratedResult] = useState<Prompt | null>(null)
  const [generationError, setGenerationError] = useState('')
  const [copiedField, setCopiedField] = useState<'style' | 'lyrics' | ''>('')
  const [loading, setLoading] = useState(false)
  const lyricsRef = useRef<HTMLTextAreaElement>(null)

  const selectedPack = useMemo(
    () => PROMPT_PACKS.find((pack) => pack.id === selectedPackId),
    [selectedPackId]
  )

  const filteredMetaTags = useMemo(() => {
    return metaTagLibrary.filter((item) => {
      const byCategory = metaCategory === 'all' || item.category === metaCategory
      const bySearch = item.tag.toLowerCase().includes(metaSearch.toLowerCase())
      return byCategory && bySearch
    })
  }, [metaCategory, metaSearch])

  const livePromptPreview = useMemo(() => {
    const parts = [
      genre,
      mood,
      tempo ? `${tempo} BPM` : '',
      instrumentation,
      vocalStyle,
      production,
      language ? `language: ${language}` : '',
      instrumental ? 'instrumental only, no vocals' : '',
      selectedTags.length > 0 ? `style tags: ${selectedTags.join(', ')}` : '',
      negativePrompt.trim() ? `avoid: ${negativePrompt.trim()}` : '',
    ].filter((part) => part && part.trim().length > 0)
    return parts.join(', ')
  }, [
    genre,
    mood,
    tempo,
    instrumentation,
    vocalStyle,
    production,
    language,
    instrumental,
    selectedTags,
    negativePrompt,
  ])

  const applyPack = (pack: PromptPack) => {
    setGenre(pack.genre)
    setMood(pack.mood)
    setTempo(String(pack.tempo))
    setInstrumentation(pack.instrumentation)
    setVocalStyle(pack.vocalStyle)
    setProduction(pack.production)
    setLyrics(pack.lyricsSeed)
    if (!title) setTitle(pack.name)
  }

  const applySelectedPack = () => {
    if (selectedPack) applyPack(selectedPack)
  }

  const applyRandomPack = () => {
    const randomPack = getRandomPromptPack()
    setSelectedPackId(randomPack.id)
    applyPack(randomPack)
  }

  const applyInspiration = () => {
    const idea = inspirationIdeas[Math.floor(Math.random() * inspirationIdeas.length)]
    setSongIdea(idea)
  }

  const applyTemplate = (templateId: string) => {
    const template = templateLibrary.find((item) => item.id === templateId)
    if (!template) return
    setGenre(template.genre)
    setMood(template.mood)
    setTempo(template.tempo)
    setSelectedTags(template.styleTags)
    setNegativePrompt(template.negativePrompt)
  }

  const toggleStyleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((item) => item !== tag)
      return [...prev, tag]
    })
  }

  const addMetaTagToStyle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]))
  }

  const addMetaTagToLyrics = (tag: string) => {
    setLyrics((prev) => `${prev}\n[${tag}]\n`)
  }

  const addTimelineBlock = () => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    setTimelineBlocks((prev) => [...prev, { id, section: 'Verse', cue: 'Add your cue...' }])
  }

  const updateTimelineBlock = (id: string, key: 'section' | 'cue', value: string) => {
    setTimelineBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, [key]: value } : block))
    )
  }

  const removeTimelineBlock = (id: string) => {
    setTimelineBlocks((prev) => prev.filter((block) => block.id !== id))
  }

  const moveTimelineBlock = (id: string, direction: 'up' | 'down') => {
    setTimelineBlocks((prev) => {
      const index = prev.findIndex((block) => block.id === id)
      if (index < 0) return prev
      const target = direction === 'up' ? index - 1 : index + 1
      if (target < 0 || target >= prev.length) return prev
      const next = [...prev]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  const applyTimelineToLyrics = () => {
    const built = timelineBlocks
      .map((block) => `[${block.section}]\n${block.cue.trim() || '...'}\n`)
      .join('\n')
    setLyrics(built.trim())
  }

  const buildLyricsFromIdea = () => {
    if (instrumental) {
      setLyrics('')
      return
    }
    const seed = songIdea.trim() || 'A vivid emotional story'
    setLyrics(
      `[Verse]\n${seed}\n\n[Pre-Chorus]\nPull the tension higher, one line at a time\n\n[Chorus]\n${title || 'Main hook'}\n`
    )
  }

  const insertTag = (tag: string) => {
    const textarea = lyricsRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const newText = `${text.substring(0, start)}\n${tag}\n${text.substring(end)}`
    setLyrics(newText)
    textarea.focus()
  }

  const copyText = async (value: string, field: 'style' | 'lyrics') => {
    await navigator.clipboard.writeText(value)
    setCopiedField(field)
    window.setTimeout(() => setCopiedField(''), 1200)
  }

  const exportText = (value: string, filePrefix: string) => {
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${filePrefix}.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  async function generate() {
    setLoading(true)
    setGeneratedResult(null)
    setGenerationError('')

    try {
      const payload = {
        title: title.trim() || undefined,
        genre: genre || 'pop',
        mood: mood || 'dreamy',
        tempo: Number.parseInt(tempo || '0', 10) || undefined,
        instrumentation,
        vocalStyle,
        production,
        lyrics: instrumental ? '' : lyrics,
        language,
        instrumental,
        styleTags: selectedTags,
        theme: songIdea.trim() || undefined,
        negativePrompt: negativePrompt.trim() || undefined,
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Generation failed')
      }

      const data = await res.json()
      setGeneratedResult(data.prompt as Prompt)
    } catch (e: any) {
      setGenerationError(`Error: ${e.message}`)
    }

    setLoading(false)
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
            <div className="space-y-2 rounded-md border p-3">
              <Label>Generator Mode</Label>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant={mode === 'simple' ? 'default' : 'outline'} onClick={() => setMode('simple')}>
                  Simple Mode
                </Button>
                <Button type="button" variant={mode === 'custom' ? 'default' : 'outline'} onClick={() => setMode('custom')}>
                  Custom Mode
                </Button>
              </div>
            </div>

            <div className="space-y-2 rounded-md border p-3">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="title">Song Title</Label>
                <span className="text-xs text-muted-foreground">{title.length}/{MAX_TITLE}</span>
              </div>
              <Input id="title" maxLength={MAX_TITLE} placeholder="Optional title override" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="space-y-2 rounded-md border p-3">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="idea">Song Description</Label>
                <span className="text-xs text-muted-foreground">{songIdea.length}/{MAX_DESCRIPTION}</span>
              </div>
              <Textarea id="idea" rows={3} maxLength={MAX_DESCRIPTION} value={songIdea} onChange={(e) => setSongIdea(e.target.value)} />
              <Button type="button" variant="outline" size="sm" onClick={applyInspiration}>
                Get Inspired
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language-select">Language</Label>
                <Select onValueChange={setLanguage} value={language}>
                  <SelectTrigger id="language-select">
                    <SelectValue placeholder="Select language..." />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Instrumental</Label>
                <div className="flex gap-2">
                  <Button type="button" variant={instrumental ? 'default' : 'outline'} onClick={() => setInstrumental(true)}>
                    Yes
                  </Button>
                  <Button type="button" variant={!instrumental ? 'default' : 'outline'} onClick={() => setInstrumental(false)}>
                    No
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2 rounded-md border p-3">
              <Label>Style of Music</Label>
              <div className="flex flex-wrap gap-2">
                {styleTagPool.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    size="sm"
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    onClick={() => toggleStyleTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2 rounded-md border p-3">
              <Label htmlFor="negative-prompt">Negative Prompt</Label>
              <Textarea
                id="negative-prompt"
                rows={2}
                placeholder="e.g. avoid distortion, avoid mumbling vocals, no long intro"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
              />
            </div>

            <div className="space-y-2 rounded-md border p-3">
              <div className="flex items-center justify-between gap-2">
                <Label>Meta Tag Creator</Label>
                <span className="text-xs text-muted-foreground">Inspired by SunoMetaTagCreator</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  placeholder="Search tags..."
                  value={metaSearch}
                  onChange={(e) => setMetaSearch(e.target.value)}
                  aria-label="Search meta tags"
                />
                <Select value={metaCategory} onValueChange={(value) => setMetaCategory(value as MetaTagCategory)}>
                  <SelectTrigger aria-label="Select meta tag category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="genre">Genre</SelectItem>
                    <SelectItem value="mood">Mood</SelectItem>
                    <SelectItem value="vocal">Vocal</SelectItem>
                    <SelectItem value="instrument">Instrument</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="structure">Structure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredMetaTags.slice(0, 18).map((item) => (
                  <div key={item.tag} className="flex gap-1">
                    <Button type="button" size="sm" variant="outline" onClick={() => addMetaTagToStyle(item.tag)}>
                      +Style {item.tag}
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => addMetaTagToLyrics(item.tag)}>
                      +Lyrics
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 rounded-md border p-3">
              <div className="flex items-center justify-between gap-2">
                <Label>Template Library</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => setIsTemplateLibraryOpen((prev) => !prev)}>
                  {isTemplateLibraryOpen ? 'Close Library' : 'Open Library'}
                </Button>
              </div>
              {isTemplateLibraryOpen && (
                <div className="space-y-2">
                  {templateLibrary.map((template) => (
                    <div key={template.id} className="rounded border p-2">
                      <p className="text-sm font-medium">{template.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                      <Button type="button" variant="outline" size="sm" onClick={() => applyTemplate(template.id)}>
                        Apply Template
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {mode === 'custom' && (
              <div className="space-y-4">
                <div className="space-y-2 rounded-md border p-3">
                  <Label htmlFor="pack-select">Awesome Prompt Packs</Label>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2">
                    <Select onValueChange={setSelectedPackId} value={selectedPackId}>
                      <SelectTrigger id="pack-select">
                        <SelectValue placeholder="Select a pack..." />
                      </SelectTrigger>
                      <SelectContent>
                        {PROMPT_PACKS.map((pack) => (
                          <SelectItem key={pack.id} value={pack.id}>
                            {pack.name} ({pack.energyLabel})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="outline" onClick={applySelectedPack}>
                      Apply Pack
                    </Button>
                    <Button type="button" variant="outline" onClick={applyRandomPack}>
                      Random Pack
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Use case: {selectedPack?.useCase || 'custom'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="style">Style / Genre</Label>
                    <Input id="style" value={genre} onChange={(e) => setGenre(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mood-select">Mood / Energy</Label>
                    <Select onValueChange={setMood} value={mood}>
                      <SelectTrigger id="mood-select">
                        <SelectValue placeholder="Select a mood..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOODS.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tempo">Tempo (BPM)</Label>
                    <Input id="tempo" type="number" value={tempo} onChange={(e) => setTempo(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instrumentation-select">Key Instruments</Label>
                    <Select onValueChange={setInstrumentation} value={instrumentation}>
                      <SelectTrigger id="instrumentation-select">
                        <SelectValue placeholder="Select an instrument..." />
                      </SelectTrigger>
                      <SelectContent>
                        {INSTRUMENTS.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vocal-style-select">Vocal Style</Label>
                    <Select onValueChange={setVocalStyle} value={vocalStyle}>
                      <SelectTrigger id="vocal-style-select">
                        <SelectValue placeholder="Select a vocal profile..." />
                      </SelectTrigger>
                      <SelectContent>
                        {vocalSelectOptions.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="production-select">Production</Label>
                    <Select onValueChange={setProduction} value={production}>
                      <SelectTrigger id="production-select">
                        <SelectValue placeholder="e.g., lo-fi, studio quality" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCTION_TERMS.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label>Lyrics & Structure</Label>
                <div className="flex gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={buildLyricsFromIdea}>
                    Build Lyrics From Description
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={applyTimelineToLyrics}>
                    Apply Timeline
                  </Button>
                </div>
              </div>
              <div className="space-y-2 rounded-md border p-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">Timeline Editor</p>
                  <Button type="button" size="sm" variant="outline" onClick={addTimelineBlock}>
                    Add Block
                  </Button>
                </div>
                {timelineBlocks.map((block) => (
                  <div key={block.id} className="grid grid-cols-1 md:grid-cols-[170px_1fr_auto] gap-2 items-start">
                    <Select value={block.section} onValueChange={(value) => updateTimelineBlock(block.id, 'section', value)}>
                      <SelectTrigger aria-label="Section type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sectionOptions.map((section) => (
                          <SelectItem key={section} value={section}>
                            {section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={block.cue}
                      onChange={(e) => updateTimelineBlock(block.id, 'cue', e.target.value)}
                      aria-label="Section cue"
                    />
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => moveTimelineBlock(block.id, 'up')}
                        aria-label="Move section up"
                      >
                        ↑
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => moveTimelineBlock(block.id, 'down')}
                        aria-label="Move section down"
                      >
                        ↓
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeTimelineBlock(block.id)}
                        aria-label="Remove section"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {structuralTags.map((tag) => (
                  <Button key={tag} type="button" variant="outline" size="sm" onClick={() => insertTag(tag)}>
                    {tag}
                  </Button>
                ))}
              </div>
              <Textarea
                ref={lyricsRef}
                id="lyrics"
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                rows={12}
                className="font-mono"
                disabled={instrumental}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Prompt Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                rows={5}
                value={livePromptPreview || 'Start filling fields to preview...'}
                className="font-mono"
              />
            </CardContent>
          </Card>

          <Button onClick={generate} disabled={loading} className="w-full text-lg">
            {loading ? 'Generating...' : 'Generate Prompt'}
          </Button>
          <Card className="h-full min-h-[400px]">
            <CardHeader>
              <CardTitle>Generated Prompt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading && <p>Generating...</p>}
              {!loading && generationError && (
                <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                  {generationError}
                </pre>
              )}
              {!loading && generatedResult && (
                <>
                  <div className="rounded-md border p-3">
                    <p className="text-sm font-medium">{generatedResult.title}</p>
                    <p className="text-xs text-muted-foreground">{generatedResult.technicalName}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Label>Style Prompt</Label>
                      <div className="flex gap-2">
                        <Button type="button" size="sm" variant="outline" onClick={() => copyText(generatedResult.style, 'style')}>
                          {copiedField === 'style' ? 'Copied' : 'Copy'}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => exportText(generatedResult.style, `${generatedResult.technicalName}_style`)}
                        >
                          Export
                        </Button>
                      </div>
                    </div>
                    <Textarea readOnly rows={5} value={generatedResult.style} className="font-mono" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Label>Lyrics</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => copyText(generatedResult.lyrics || '[Instrumental mode]', 'lyrics')}
                        >
                          {copiedField === 'lyrics' ? 'Copied' : 'Copy'}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => exportText(generatedResult.lyrics || '[Instrumental mode]', `${generatedResult.technicalName}_lyrics`)}
                        >
                          Export
                        </Button>
                      </div>
                    </div>
                    <Textarea readOnly rows={8} value={generatedResult.lyrics || '[Instrumental mode]'} className="font-mono" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
