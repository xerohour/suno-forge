import {
    validatePromptConfig,
    validateMutationType,
    validateBatchRequest,
    validateVisionRequest,
    MAX_TITLE_LENGTH,
    MAX_SHORT_TEXT_LENGTH,
    MAX_LONG_TEXT_LENGTH,
    MAX_TAGS_COUNT
} from './validation';

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

        // Length validation tests
        it('should reject title exceeding max length', () => {
            const longTitle = 'a'.repeat(MAX_TITLE_LENGTH + 1);
            expect(validatePromptConfig({ title: longTitle })).toBe(false);
            expect(validatePromptConfig({ title: 'a'.repeat(MAX_TITLE_LENGTH) })).toBe(true);
        });

        it('should reject short text fields exceeding max length', () => {
            const longText = 'a'.repeat(MAX_SHORT_TEXT_LENGTH + 1);
            const validText = 'a'.repeat(MAX_SHORT_TEXT_LENGTH);

            const fields = ['genre', 'mood', 'instrumentation', 'vocalStyle',
                            'production', 'theme', 'language', 'negativePrompt'];

            fields.forEach(field => {
                expect(validatePromptConfig({ [field]: longText })).toBe(false);
                expect(validatePromptConfig({ [field]: validText })).toBe(true);
            });
        });

        it('should reject lyrics exceeding max length', () => {
            const longLyrics = 'a'.repeat(MAX_LONG_TEXT_LENGTH + 1);
            expect(validatePromptConfig({ lyrics: longLyrics })).toBe(false);
            expect(validatePromptConfig({ lyrics: 'a'.repeat(MAX_LONG_TEXT_LENGTH) })).toBe(true);
        });

        it('should reject styleTags exceeding max count', () => {
            const manyTags = Array(MAX_TAGS_COUNT + 1).fill('tag');
            expect(validatePromptConfig({ styleTags: manyTags })).toBe(false);
            expect(validatePromptConfig({ styleTags: Array(MAX_TAGS_COUNT).fill('tag') })).toBe(true);
        });

        it('should reject styleTags with individual tag exceeding max length', () => {
            const longTag = 'a'.repeat(MAX_SHORT_TEXT_LENGTH + 1);
            expect(validatePromptConfig({ styleTags: [longTag] })).toBe(false);
            expect(validatePromptConfig({ styleTags: ['valid'] })).toBe(true);
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
            const request = { description: 'A beautiful sunset' };
            expect(validateVisionRequest(request)).toBe(true);
        });

        it('should reject invalid description type', () => {
            expect(validateVisionRequest({ description: 123 })).toBe(false);
            expect(validateVisionRequest({ description: null })).toBe(false);
        });

        it('should reject empty description', () => {
            expect(validateVisionRequest({ description: '' })).toBe(false);
            expect(validateVisionRequest({ description: '   ' })).toBe(false);
        });

        it('should reject description exceeding max length', () => {
            const longDesc = 'a'.repeat(MAX_LONG_TEXT_LENGTH + 1);
            expect(validateVisionRequest({ description: longDesc })).toBe(false);
            expect(validateVisionRequest({ description: 'a'.repeat(MAX_LONG_TEXT_LENGTH) })).toBe(true);
        });

        it('should reject missing description', () => {
             expect(validateVisionRequest({})).toBe(false);
        });

        it('should reject null request', () => {
            expect(validateVisionRequest(null)).toBe(false);
        });
    });
});
