# The Suno Prompting Compendium: A Technical Guide for AI-Assisted Music Generation

## Preamble: How to Use This Guide

**Purpose:** This document is a dense, technical reference for crafting high-fidelity Suno prompts. It consolidates best practices, advanced techniques, and extensive reference materials into a single source of truth.

**Core Philosophy:** The Suno generation process is governed by two distinct but interconnected inputs:

1.  **The Style Field:** Defines the song's **sonic identity**. This is where you establish genre, mood, instrumentation, tempo, and overall production aesthetic. Think of it as casting the band and booking the studio.
2.  **The Lyrics Field:** Controls the song's **structure and moment-to-moment performance**. This is where you write the words, build the arrangement with section tags, and give precise, in-line directions for vocals and instruments.

**For AI Collaboration (e.g., Gemini):** This compendium is your primary instruction set and knowledge base for generating Suno prompts. When asked to create a prompt, adhere to the principles, vocabulary, structures, and troubleshooting logic outlined herein. The **Blueprint-to-Production Workflow** (see Section 3.1) is the preferred method for complex requests, as it is highly parsable and unambiguous.

**OPERATIONAL MANDATE FOR OUTPUT:** When providing the final, ready-to-use prompt, the entire output (Song Title, Style Prompt, and Lyrics Field) **MUST** be enclosed within code blocks for clear delineation and ease of copying.

Display Name:

```
Name Here
```

Technical Name:

```
Tech_Name_Here
```

Style Prompt:

```
Here
```

Lyrics:

```
Lyrics Here
```

---

## Part 1: The Core Principles

This section covers the foundational knowledge required for all effective Suno prompting.

### 1.1. Quick-Start Cheat Sheet

- **What Goes Where?**
  - **Style Field:** Genre, mood, instrumentation, tempo, production hints. Use comma-separated lists for balanced weighting or natural language phrases for modifier chaining.
  - **Lyrics Field:** Words to be sung **and** in-line control via **[Square-Bracketed Tags]** and **(Parenthetical Descriptors)**.

- **Priority Order (Front-Load Non-Negotiables):**
  1.  Core genre / sub-genre
  2.  Primary mood / energy
  3.  Lead instrument or vocal identity
  4.  Tempo / feel (BPM)
  5.  Production treatment (optional, e.g., `lo-fi`, `tape-saturated`)

- **10-Second Prompt Starters:**
  - **Comma List:** `dreamy synthwave, nostalgic, 88 bpm, warm analog pads, soft female vocal, sparse drums`
  - **Natural Phrase:** `A nostalgic synthwave track at 88 bpm with warm analog pads, soft female vocals and sparse drums`

- **High-Leverage Structural Tags (in Lyrics):**
  `[Intro]`, `[Verse]`, `[Pre-Chorus]`, `[Chorus]`, `[Bridge]`, `[Break]`, `[Solo]`, `[Outro]`, `[End]`, `[Fade Out]`

- **Minimal Structure Template:**
  ```
  [Verse 1]
  ...
  [Pre-Chorus]
  ...
  [Chorus]
  ...
  [Bridge]
  ...
  [Chorus]
  [End]
  ```

### 1.2. The Style Prompt: Defining Sonic Identity

The Style Prompt is your primary tool for defining the overall sound. Precision here prevents ambiguity later.

- **Phrasing Models:**
  - **Comma List (Balanced Weighting):** Use short, atomic descriptors. Best when you want multiple elements to contribute equally. The model treats each tag with similar importance.
    - `cinematic ambient, sparse piano, warm pads, slow tempo, intimate, 70 bpm`
  - **Natural Language (Modifier Chaining):** Use compact sentences. Earlier words modify later ones, creating a more cohesive, singular concept.
    - `An intimate cinematic ambient piece with sparse piano and warm pads, at a slow 70 bpm`

- **Descriptor Strategy:**
  - **Quantity:** Start with **3-5 core descriptors**. Add more only if essential. Too many descriptors can create a "muddy" or unfocused output as the AI tries to satisfy conflicting ideas.
  - **Conflict Minimization:** Avoid contradictory pairs. Do not ask for `hyper-compressed` and `natural roominess` or `lo-fi hiss` and `pristine hi-fi shimmer` in the same prompt. Stick to related concepts (e.g., `warm`, `analog`, `tape-saturated`).

- **Production & Mix Shorthand (Optional Add-ons):**
  - **Density:** `sparse`, `medium density`, `lush` (Use only one).
  - **Space/Reverb:** `dry/close`, `roomy`, `hall reverb`, `plate shimmer`, `long-tail reverb`, `slapback delay`.
  - **Tone/Texture:** `tape-saturated`, `crunchy`, `airy top end`, `subby low end`, `glassy highs`, `lo-fi hiss`, `vinyl crackle`.

### 1.3. The Lyrics Field: Structure & In-Line Control

This field is for more than just words; it's your timeline editor and performance director.

- **Syntax & Spacing Rules:**
  - Tags are always enclosed in **[Square-Brackets]**.
  - Place a **blank line between sections** (`[Verse]`, `[Chorus]`, etc.). This is a critical signal for the model to treat them as distinct parts.
  - Keep section lengths reasonable: **4-6 lines for verses**, **2-4 lines for choruses** (with repetition for emphasis) works best.

- **Canonical Structural Tags:**
  - **Primary Sections:** `[Intro]`, `[Verse]`, `[Pre-Chorus]`, `[Chorus]`, `[Post-Chorus]`, `[Bridge]`, `[Outro]`
  - **Instrumental Sections:** `[Break]`, `[Interlude]`, `[Solo]`, `[Drop]`, `[Mid]`
  - **Endings:** `[End]` (hard stop), `[Fade Out]`, `[Big Finish]` (climactic end). Use only one.

- **Directional Inserts (Moment-by-Moment Control):**
  Place these tags on their own line just before the lyric line you want to affect.
  - `[Whisper]`, `[Shouted]`, `[Spoken-word]`, `[Rap]`
  - `[Powerful]`, `[Soft-spoken]`, `[Breathy]`, `[Raspy]`
  - `[Legato]` (smoothly connected notes), `[Staccato]` (short, detached notes)
  - `[On-beat]`, `[Laid-back]` (behind the beat)

- **Pronunciation Toolkit:**
  Control pronunciation to avoid misinterpretations.
  - **Phonetics:** `lead` → `leed` (verb) / `led` (noun), `bass` → `bahss` (instrument).
  - **Elongate Vowels:** To hold a note on a specific syllable: `I need ti-i-ime`, `loooove`.
  - **Hyphenate Compounds:** To sing syllables across different notes: `fire-light`, `dream-scape`.

---

## Part 2: Domain-Specific Control

Mastering these sections allows for granular control over every aspect of the final production.

### 2.1. Vocal Control (Tone, Delivery, Timing, Range)

Use a combination of Style Prompt descriptors and in-line tags for precise vocal performance.

- **Fast Decisions (Pick 1-2, place most important first in Style):**
  - **Tone/Texture:** airy, breathy, bright, smooth, gritty, raspy, velvety, warm, crisp, deep, smoky.
  - **Emotion:** intimate, melancholic, yearning, confident, triumphant, euphoric, hopeful.
  - **Delivery:** staccato, legato, melismatic, chant, rap, spoken‑word, belting.
  - **Dynamics:** soft‑spoken, medium, powerful, crescendo, diminuendo, big finish.
  - **Timing:** laid‑back, on‑beat, ahead, syncopated, triplets, tight phrasing.
  - **Range:** low, mid, high, baritone, tenor, alto, soprano, falsetto.

- **Where to Place Cues:**
  - **Style Field (Broad Identity):** For the overall character of the singer. `Style: ... intimate female vocal, alto range`
  - **Lyrics Field (Precise Moments):** For specific lines or sections.

    ```
    [Verse]
    [Whisper] In the pale moonlight
    [Laid-back] we trace the fading lines

    [Chorus]
    [Powerful][Legato] And I break free again
    [Triumphant]
    ```

### 2.2. Instrumentation & Arrangement (Layers, Roles, Mix)

Structure your instrumental arrangement to avoid muddy mixes and create dynamic energy shifts.

- **The Role Planning Framework (Lead • Support • Bed):**
  - **Lead:** The main melodic focus (vocal, guitar lead, sax, synth lead).
  - **Support:** Countermelodies, hooks, and arpeggios that complement the lead (piano hooks, string lines, arp).
  - **Bed:** The harmonic and rhythmic foundation (pads, rhythm guitar, drones, bass, drums).
    > **Principle of Sparsity:** Start with one element from each category. Only add more if the song feels empty.

- **Managing Register & Density:**
  - **Register:** Spread instruments across **low / mid / high** frequencies to prevent masking. (e.g., low sub-bass, mid-range pads, high pluck/hats).
  - **Density:** Declare a single density word in the Style Prompt: `sparse`, `medium`, or `lush`.

- **In-Line Arrangement & Transition Cues:**
  Use tags and parenthetical descriptors in the lyrics field to direct the arrangement.

  ```
  [Short Instrumental Intro](warm pads, vinyl noise)
  [Verse](palm-muted guitar enters, soft kick)
  [Pre-Chorus][Build](add bass, wide pad swells)
  [Chorus][Drop](full kit, synth lead)
  [Bridge](percussion only)
  [Outro](thin to piano)
  ```

  - **Build:** `[Build]`, `[Riser]`, `[Snare roll]`, `[Crescendo]`
  - **Drop/Impact:** `[Drop]`, `[Big Finish]`, `[Sub impact]`
  - **Thinning Texture:** `(remove bass and kick)`, `(filter highs)`

---

## Part 3: Advanced Workflows & Use Cases

These techniques are for achieving higher reliability, repeatability, and specialized outputs.

### 3.1. The Blueprint-to-Production Workflow

This is the most reliable method for translating a creative vision into a successful generation. It involves a two-stage process that separates human-readable planning from machine-executable instructions.

**Stage 1: The Blueprint Prompt (Human-Readable)**
This version is for your notes. It uses comments (`//`) and narrative context to plan the cue's purpose and link it to a story. It is _not_ for the AI.

```
// Blueprint for a Sci-Fi Drone
[Intro]
// Establish the antagonist's presence with a deep, oppressive sound.
(deep, powerful sub-bass drone, monolithic, oppressive)
// Add digital textures to signal the high-tech setting.
(faint digital static, high-frequency data chatter, sterile)
```

**Stage 2: The Production Prompt (Machine-Readable)**
This is the version you copy into Suno. It is stripped of all comments and narrative. It follows a set of strict rules for clarity and maximum model adherence.

```
// Production Version for Suno
[Intro]
(deep, powerful sub-bass drone, monolithic, oppressive)
(faint digital static, high-frequency data chatter, sterile)
```

**Golden Rules for Production Prompts:**

1.  **Be Literal, Not Poetic:** The model responds to sonic attributes, not abstract ideas.
    - **Instead of:** `(a sound like a question in the dark)`
    - **Use:** `(single cold piano note, long decay, echo)`

2.  **Use Keywords, Not Sentences:** Use comma-separated tags for instructions.
    - **Instead of:** `(The piano should be precise, clock-like, and perfectly timed.)`
    - **Use:** `(precise, clock-like, perfectly timed piano arpeggio)`

3.  **Remove Narrative Noise:** The model does not know your characters or story.
    - **Instead of:** `(Kaelen's Theme begins...)`
    - **Use:** `(piano arpeggio enters)`

4.  **Simplify Syntax:** Avoid conversational connectors (`and`, `with`, `almost`).
    - **Instead of:** `(Subtle digital clicks and artifacts)`
    - **Use:** `(subtle digital clicks, artifacts)`

### 3.2. Generating Instrumentals & Direction-Only Cues

For film scores, game loops, or backing tracks, use parenthetical, keyword-driven directions in the lyrics field. This provides maximum structural control while keeping vocals silent.

- **Example of Direction-Only Prompting:**

  ```
  [Short Instrumental Intro]
  (soft piano arpeggios, vinyl hiss)
  [Break]
  (percussion only)
  [Build]
  (warm bass enters, airy pads swell)
  [Drop]
  (full kit, lead synth)
  [Outro]
  (thin to piano, long tape tail)
  ```

- **Instrumental-Specific Vocabulary:**
  - **Dynamics:** sparse, restrained, medium, lush, crescendo, diminuendo.
  - **Texture:** warm pads, granular wash, lo‑fi piano, bowed drones, plucks.
  - **Motion:** steady pulse, swung, half‑time, double‑time, dotted‑eighth echo.
  - **Space:** dry/close, room, hall, plate shimmer, tape delay.

### 3.3. Advanced Reliability Techniques

- **The Anchor-Repeat Strategy:**
  To reinforce essential concepts, repeat 1-2 key descriptors at the beginning and end of the Style Prompt. This heavily weights them.
  - `cinematic outlaw country, bluesy pedal steel, raw and emotional ... cinematic outlaw country`

- **Iteration Protocol (A/B Testing):**
  To diagnose issues, change only one variable at a time. Use a clear naming convention.
  1.  Freeze lyrics and arrangement, only change the Style.
  2.  Save versions with suffixes: `song_vA_style`, `song_vB_lyrics`, `song_vC_arrangement`.
  3.  Promote the winning version and iterate on the next variable.

---

## Part 4: Troubleshooting & Quality Control

A systematic approach to diagnosing and fixing common generation issues.

### 4.1. The Debugging Decision Tree

**Step 1: Triage First (What is the primary symptom?)**

- **A. Style Drift:** Wrong genre, mood, or tempo.
- **B. Muddy/Crowded Mix:** Instruments mask each other; lack of clarity.
- **C. Weak Sections:** Chorus doesn't lift; intro/ending is weak or ignored.
- **D. Vocal Issues:** Wrong tone, bad timing, poor pronunciation, artifacts.
- **E. Structure Ignored:** Tags not followed; sections merged together.

**Step 2: Apply One-Edit Fixes (by symptom)**

- **A) To Fix Style Drift:**
  - Reduce Style Prompt to **3-5 core descriptors**.
  - **Front-load** the must-have genre/mood and BPM.
  - Use the **Anchor-Repeat** strategy (see 3.3).
  - Remove conflicting words (e.g., `lo-fi` vs. `hi-fidelity`).

- **B) To Fix a Muddy Mix:**
  - Remove **one midrange instrument** (e.g., a secondary synth pad or rhythm guitar).
  - Declare density in Style: `sparse`.
  - Explicitly separate registers: `low sub bass, mid-range pads, high glassy lead`.

- **C) To Fix Weak Sections:**
  - Add a `[Build]` or `[Crescendo]` tag in the `[Pre-Chorus]` before the weak `[Chorus]`.
  - Simplify the verse arrangement to make the chorus feel bigger by contrast.
  - Ensure the chorus hook is repetitive and memorable (2-4 lines max).
  - For endings, use a single, explicit tag: `[End]` or `[Fade Out]`.

- **D) To Fix Vocal Issues:**
  - **Timing:** Add `[On-beat]` or `[Tight phrasing]`.
  - **Tone/Power:** Swap `[Breathy]` for `[Powerful]` or `[Stronger tone]`.
  - **Clarity:** Add `[Clear diction]`, reduce reverb, or thin competing mid-range instruments.
  - **Pronunciation:** Use **phonetics** (`bahss` for bass).
  - **Artifacts:** Avoid conflicting range cues (e.g., `[Falsetto]` and `[Belting]` in the same section).

- **E) To Fix Ignored Structure:**
  - Ensure there is a **blank line** between every section tag.
  - Label every section clearly (`[Verse 1]`, `[Verse 2]`).
  - Keep section tags short and on their own line.

**Pre-Render Quality Control Checklist:**

- [ ] **Style:** 3-5 descriptors, must-haves first, BPM included, no conflicts.
- [ ] **Lyrics:** Sections are labeled with blank lines between them. Lyrical directions are literal and keyword-driven.
- [ ] **Arrangement:** Density is declared (e.g., `sparse`), registers are considered.
- [ ] **Vocal:** Key tone/delivery descriptor is present.
- [ ] **Ending:** A single, explicit ending tag (`[End]` or `[Fade Out]`) is used.

---

## Part 5: The Reference Libraries

A toolkit of copy-paste assets for rapid creation and reference.

### 5.1. Reusable Templates & Song Structures

- **A. Pop / Rock (Radio-Friendly)**

  ```
  Style: modern alt pop rock, anthemic, 92 bpm, guitar-lead, punchy kit
  Lyrics:
  [Verse 1]
  ...
  [Pre-Chorus]
  (add drums, lift harmony)
  [Build]
  [Chorus]
  ...
  [Verse 2]
  ...
  [Bridge]
  (new texture, strip drums, add pads)
  [Chorus]
  [End]
  ```

- **B. EDM (Melodic House)**

  ```
  Style: melodic house, euphoric, 124 bpm, side-chained pads, bright plucks, wide supersaw lead
  Lyrics:
  [Intro]
  [Build]
  (riser, filter sweep)
  [Drop]
  [Mid]
  (thin texture)
  [Build]
  [Drop]
  [Outro]
  ```

- **C. R&B / Trap Ballad**

  ```
  Style: modern R&B trap ballad, tender, 72 bpm, intimate female vocal, sparse keys, sub 808
  Lyrics:
  [Verse 1]
  (intimate)
  ...
  [Pre-Chorus]
  (laid-back)
  ...
  [Chorus]
  (open vowels, warm vibrato)
  ...
  [Verse 2]
  ...
  [Bridge]
  (rap or spoken)
  ...
  [Chorus]
  [End]
  ```

- **D. Instrumental Film Cue**
  ```
  Style: dark cinematic ambient, sparse, low drones, bowed textures, distant piano pings
  Lyrics:
  [Intro]
  (low drones, distant piano pings)
  [Build]
  (low percussion enters, granular wash swells)
  [Climax]
  (brass swells, full drums)
  [Release]
  (thin to piano, long reverb tail)
  [End]
  ```

### 5.2. Genre & Fusion Playbooks

Quick "recipe cards" for popular styles.

- **A) Synthwave (Retro/Nostalgic)**
  - **Palette:** Analog polysynth pads, bass arps, tom fills, gated reverb drums.
  - **Tempo:** 84–104 bpm.
  - **Moods:** Nostalgic, neon dreamy, night drive.
  - **Starter:** `nostalgic 80s synthwave, 90 bpm, warm analog pads, gated drums, lead synth hook`

- **B) Indie Folk**
  - **Palette:** Fingerstyle acoustic guitar, soft brush kit, upright bass, light pads.
  - **Tempo:** 82–96 bpm.
  - **Moods:** Earthy, reflective, hopeful, intimate.
  - **Starter:** `earthy indie folk, reflective, 86 bpm, fingerstyle acoustic, soft brush kit, intimate male vocal`

- **C) Gospel-Trap Fusion**
  - **Palette:** Clap patterns, 808 sub, choir pads/stacks, call-and-response vocals.
  - **Tempo:** 80–92 bpm.
  - **Moods:** Uplifting, triumphant, powerful.
  - **Starter:** `gospel-trap fusion, triumphant, 88 bpm, stacked choir hooks, tight 808s, clap grooves`

### 5.3. Master Tag & Vocabulary Catalog

The definitive dictionary of high-value terms.

- **Structure Tags:** `[Intro]`, `[Short Instrumental Intro]`, `[Verse]`, `[Pre-Chorus]`, `[Chorus]`, `[Post-Chorus]`, `[Bridge]`, `[Interlude]`, `[Break]`, `[Solo]`, `[Mid]`, `[Drop]`, `[Outro]`, `[End]`, `[Fade Out]`, `[Big Finish]`

- **Vocal Delivery:**
  - **Tone:** airy, breathy, bright, smooth, warm, crisp, deep, gritty, raspy, velvety, whispered, gravelly, brassy, smoky.
  - **Style:** legato, staccato, melismatic, chant, rap, spoken-word, yodeling, belting.
  - **Timing:** laid-back, on-beat, ahead, behind, syncopated, triplets, tight phrasing.
  - **Range:** baritone, tenor, alto, soprano, falsetto, octave-up.
  - **FX:** clear diction, vibrato, autotuned, doubled, harmonized, whispered doubles.

- **Instrument & Role Tags:**
  - **Lead:** guitar lead, sax lead, synth lead, vocal lead.
  - **Support:** piano hooks, string lines, arp, countermelody.
  - **Bed:** pads, rhythm guitar, drones, bass, drums.
  - **Specifics:** acoustic guitar, palm-muted guitar, warm Rhodes, felt piano, analog polysynth, supersaw, violin, cello, brass swells, brushed kit, trap 808s, sub 808, percussion (congas, shaker, clave).

- **Mood, Energy & Production:**
  - **Mood:** nostalgic, melancholic, moody, dreamy, euphoric, triumphant, ominous, hopeful, reflective.
  - **Energy:** low energy, medium energy, high energy, building energy, crescendo.
  - **Density:** sparse, medium, lush.
  - **Space:** dry/close, room, hall, plate shimmer, tape delay, slapback.
  - **Production:** tape-saturated, crunchy, airy top, subby low end, warm mids, glassy highs, side-chained, pumping, ducked pads, lo-fi, vinyl hiss.

---

## Appendix: Suno Model Evolution (Context)

Suno's models have evolved rapidly, with each version improving audio quality, prompt adherence, and feature sets. This historical context is useful for understanding the platform's trajectory.

| Model    | Key Improvements                                                                                   |
| :------- | :------------------------------------------------------------------------------------------------- |
| **V2**   | Established baseline text-to-music generation (~1m 20s songs).                                     |
| **V3**   | Extended songs to 2 min; improved instrument separation.                                           |
| **V3.5** | Extended tracks to 4 min; introduced the _Extend_ feature for greater coherence.                   |
| **V4**   | More natural vocals, support for personas, and improved mix quality.                               |
| **V5+**  | Significant leap in prompt comprehension, genre accuracy, vocal realism, and structural integrity. |

> _Note: Older models like v2 and v3 are often deprecated as newer, more capable versions are released. This guide is optimized for v5 and beyond._
