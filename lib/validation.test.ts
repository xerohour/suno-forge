import { validatePromptConfig, validateMutationType, validateBatchRequest, validateVisionRequest, MAX_TITLE_LENGTH, MAX_SHORT_TEXT_LENGTH, MAX_LONG_TEXT_LENGTH, MAX_TAGS_COUNT } from './validation';

describe('validation', () => {
    describe('validatePromptConfig', () => {
        it('should accept valid minimal config', () => {
            const config = { genre: 'jazz' };
            expect(validatePromptConfig(config)).toBe(true);
        });

        it('should accept valid full config', () => {
            const config = {
                title: 'My Song',
                genre: 'rock',
                mood: 'energetic',
                tempo: 120,
                instrumentation: 'electric guitar',
                vocalStyle: 'powerful',
                production: 'studio quality',
                energy: 0.8,
                theme: 'freedom',
                lyrics: 'verse 1...',
                language: 'english',
                instrumental: false,
                styleTags: ['heavy', 'distorted'],
                negativePrompt: 'avoid slow tempo',
            };
            expect(validatePromptConfig(config)).toBe(true);
        });

        it('should reject null', () => {
            expect(validatePromptConfig(null)).toBe(false);
        });

        it('should reject non-object', () => {
            expect(validatePromptConfig('string')).toBe(false);
            expect(validatePromptConfig(123)).toBe(false);
        });

        it('should reject invalid field types', () => {
            expect(validatePromptConfig({ genre: 123 })).toBe(false);
            expect(validatePromptConfig({ tempo: 'fast' })).toBe(false);
            expect(validatePromptConfig({ instrumental: 'yes' })).toBe(false);
            expect(validatePromptConfig({ styleTags: 'tag1,tag2' })).toBe(false);
        });

        it('should reject energy out of range', () => {
            expect(validatePromptConfig({ energy: -0.1 })).toBe(false);
            expect(validatePromptConfig({ energy: 1.1 })).toBe(false);
            expect(validatePromptConfig({ energy: 0.5 })).toBe(true);
        });

        it('should reject tempo out of range', () => {
            expect(validatePromptConfig({ tempo: 10 })).toBe(false);
            expect(validatePromptConfig({ tempo: 400 })).toBe(false);
            expect(validatePromptConfig({ tempo: 120 })).toBe(true);
        });

        it('should reject styleTags with non-string elements', () => {
            expect(validatePromptConfig({ styleTags: [123, 'valid'] })).toBe(false);
            expect(validatePromptConfig({ styleTags: ['valid', 'tags'] })).toBe(true);
        });

        it('should enforce max title length', () => {
            expect(validatePromptConfig({ title: 'a'.repeat(MAX_TITLE_LENGTH) })).toBe(true);
            expect(validatePromptConfig({ title: 'a'.repeat(MAX_TITLE_LENGTH + 1) })).toBe(false);
        });

        it('should enforce max short text length for generic fields', () => {
            const longText = 'a'.repeat(MAX_SHORT_TEXT_LENGTH + 1);
            expect(validatePromptConfig({ genre: longText })).toBe(false);
            expect(validatePromptConfig({ mood: longText })).toBe(false);
            expect(validatePromptConfig({ instrumentation: longText })).toBe(false);
            expect(validatePromptConfig({ vocalStyle: longText })).toBe(false);
            expect(validatePromptConfig({ production: longText })).toBe(false);
            expect(validatePromptConfig({ theme: longText })).toBe(false);
            expect(validatePromptConfig({ language: longText })).toBe(false);
            expect(validatePromptConfig({ negativePrompt: longText })).toBe(false);
        });

        it('should enforce max long text length for lyrics', () => {
            expect(validatePromptConfig({ lyrics: 'a'.repeat(MAX_LONG_TEXT_LENGTH) })).toBe(true);
            expect(validatePromptConfig({ lyrics: 'a'.repeat(MAX_LONG_TEXT_LENGTH + 1) })).toBe(false);
        });

        it('should enforce max tags count', () => {
            const tags = Array(MAX_TAGS_COUNT).fill('tag');
            expect(validatePromptConfig({ styleTags: tags })).toBe(true);

            const tooManyTags = Array(MAX_TAGS_COUNT + 1).fill('tag');
            expect(validatePromptConfig({ styleTags: tooManyTags })).toBe(false);
        });

        it('should enforce max length for individual tags', () => {
             const longTag = 'a'.repeat(MAX_SHORT_TEXT_LENGTH + 1);
             expect(validatePromptConfig({ styleTags: [longTag] })).toBe(false);
        });
    });

    describe('validateMutationType', () => {
        it('should accept valid mutation types', () => {
            expect(validateMutationType('viral')).toBe(true);
            expect(validateMutationType('emotional')).toBe(true);
            expect(validateMutationType('energy')).toBe(true);
            expect(validateMutationType('instrumental')).toBe(true);
            expect(validateMutationType('tempo-shift-up')).toBe(true);
            expect(validateMutationType('tempo-shift-down')).toBe(true);
            expect(validateMutationType('mood-invert')).toBe(true);
            expect(validateMutationType('genre-blend')).toBe(true);
        });

        it('should reject invalid mutation types', () => {
            expect(validateMutationType('invalid')).toBe(false);
            expect(validateMutationType('')).toBe(false);
            expect(validateMutationType(123)).toBe(false);
            expect(validateMutationType(null)).toBe(false);
        });
    });

    describe('validateBatchRequest', () => {
        it('should accept valid batch request', () => {
            const request = {
                config: { genre: 'jazz' },
                count: 5,
            };
            expect(validateBatchRequest(request)).toBe(true);
        });

        it('should reject invalid config', () => {
            const request = {
                config: { genre: 123 },
                count: 5,
            };
            expect(validateBatchRequest(request)).toBe(false);
        });

        it('should reject count less than 1', () => {
            const request = {
                config: { genre: 'jazz' },
                count: 0,
            };
            expect(validateBatchRequest(request)).toBe(false);
        });

        it('should reject count greater than 50', () => {
            const request = {
                config: { genre: 'jazz' },
                count: 51,
            };
            expect(validateBatchRequest(request)).toBe(false);
        });

        it('should reject non-number count', () => {
            const request = {
                config: { genre: 'jazz' },
                count: '5',
            };
            expect(validateBatchRequest(request)).toBe(false);
        });

        it('should reject missing config', () => {
            const request = { count: 5 };
            expect(validateBatchRequest(request)).toBe(false);
        });

        it('should reject null', () => {
            expect(validateBatchRequest(null)).toBe(false);
        });
    });

    describe('validateVisionRequest', () => {
        it('should accept valid vision request', () => {
             expect(validateVisionRequest({ description: 'A sunny beach' })).toBe(true);
        });

        it('should reject null or undefined', () => {
            expect(validateVisionRequest(null)).toBe(false);
            expect(validateVisionRequest(undefined)).toBe(false);
        });

        it('should reject empty description', () => {
            expect(validateVisionRequest({ description: '' })).toBe(false);
        });

        it('should enforce max description length', () => {
            expect(validateVisionRequest({ description: 'a'.repeat(MAX_LONG_TEXT_LENGTH) })).toBe(true);
            expect(validateVisionRequest({ description: 'a'.repeat(MAX_LONG_TEXT_LENGTH + 1) })).toBe(false);
        });
    });
});
