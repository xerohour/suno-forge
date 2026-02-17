import { PROMPT_PACKS, getRandomPromptPack } from './promptPacks'

describe('promptPacks', () => {
  it('should export a non-empty list of prompt packs', () => {
    expect(Array.isArray(PROMPT_PACKS)).toBe(true)
    expect(PROMPT_PACKS.length).toBeGreaterThan(0)
  })

  it('should return a valid prompt pack from the list', () => {
    const pack = getRandomPromptPack()
    expect(pack).toBeDefined()
    expect(PROMPT_PACKS).toContain(pack)

    // Check specific properties
    expect(pack.id).toBeDefined()
    expect(typeof pack.id).toBe('string')
    expect(pack.name).toBeDefined()
    expect(typeof pack.name).toBe('string')
    expect(pack.genre).toBeDefined()
    expect(typeof pack.genre).toBe('string')
  })

  it('should return different packs over multiple calls', () => {
    // Only test randomness if there's more than 1 pack
    if (PROMPT_PACKS.length > 1) {
      const ids = new Set<string>()
      // Run enough times to likely get duplicates if random, but also likely get >1 unique if random works
      for (let i = 0; i < 20; i++) {
        ids.add(getRandomPromptPack().id)
      }
      expect(ids.size).toBeGreaterThan(1)
    } else {
      console.warn('Skipping randomness test as PROMPT_PACKS has only 1 item')
    }
  })
})
