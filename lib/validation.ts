import { PromptConfig, MutationType } from "@/types/prompt";

export const MAX_TITLE_LENGTH = 100;
export const MAX_SHORT_TEXT_LENGTH = 500;
export const MAX_LONG_TEXT_LENGTH = 5000;
export const MAX_TAGS_COUNT = 20;

/**
 * Validates a prompt configuration object
 */
export function validatePromptConfig(config: unknown): config is PromptConfig {
    if (!config || typeof config !== 'object') {
        return false;
    }

    const c = config as Record<string, unknown>;

    // Optional fields with type checking and length validation
    if (c.title !== undefined && (typeof c.title !== 'string' || c.title.length > MAX_TITLE_LENGTH)) return false;
    if (c.genre !== undefined && (typeof c.genre !== 'string' || c.genre.length > MAX_SHORT_TEXT_LENGTH)) return false;
    if (c.mood !== undefined && (typeof c.mood !== 'string' || c.mood.length > MAX_SHORT_TEXT_LENGTH)) return false;
    if (c.tempo !== undefined && typeof c.tempo !== 'number') return false;
    if (c.instrumentation !== undefined && (typeof c.instrumentation !== 'string' || c.instrumentation.length > MAX_SHORT_TEXT_LENGTH)) return false;
    if (c.vocalStyle !== undefined && (typeof c.vocalStyle !== 'string' || c.vocalStyle.length > MAX_SHORT_TEXT_LENGTH)) return false;
    if (c.production !== undefined && (typeof c.production !== 'string' || c.production.length > MAX_SHORT_TEXT_LENGTH)) return false;
    if (c.energy !== undefined && typeof c.energy !== 'number') return false;
    if (c.theme !== undefined && (typeof c.theme !== 'string' || c.theme.length > MAX_SHORT_TEXT_LENGTH)) return false;
    if (c.lyrics !== undefined && (typeof c.lyrics !== 'string' || c.lyrics.length > MAX_LONG_TEXT_LENGTH)) return false;
    if (c.language !== undefined && (typeof c.language !== 'string' || c.language.length > MAX_SHORT_TEXT_LENGTH)) return false;
    if (c.instrumental !== undefined && typeof c.instrumental !== 'boolean') return false;
    if (c.negativePrompt !== undefined && (typeof c.negativePrompt !== 'string' || c.negativePrompt.length > MAX_SHORT_TEXT_LENGTH)) return false;

    if (c.styleTags !== undefined) {
        if (!Array.isArray(c.styleTags)) return false;
        if (c.styleTags.length > MAX_TAGS_COUNT) return false;
        if (!c.styleTags.every((tag) => typeof tag === 'string' && tag.length <= MAX_SHORT_TEXT_LENGTH)) return false;
    }

    // Validate energy range
    if (c.energy !== undefined && (c.energy < 0 || c.energy > 1)) {
        return false;
    }

    // Validate tempo range
    if (c.tempo !== undefined && (c.tempo < 20 || c.tempo > 300)) {
        return false;
    }

    return true;
}

/**
 * Validates a mutation type
 */
export function validateMutationType(type: unknown): type is MutationType {
    const validTypes: MutationType[] = [
        'viral',
        'emotional',
        'energy',
        'instrumental',
        'tempo-shift-up',
        'tempo-shift-down',
        'mood-invert',
        'genre-blend',
    ];

    return typeof type === 'string' && validTypes.includes(type as MutationType);
}

/**
 * Validates batch request parameters
 */
export function validateBatchRequest(data: unknown): data is { config: PromptConfig; count: number } {
    if (!data || typeof data !== 'object') {
        return false;
    }

    const d = data as Record<string, unknown>;

    if (!d.config || !validatePromptConfig(d.config)) {
        return false;
    }

    if (typeof d.count !== 'number' || d.count < 1 || d.count > 50) {
        return false;
    }

    return true;
}

/**
 * Validates vision request parameters
 */
export function validateVisionRequest(data: unknown): data is { description: string } {
    if (!data || typeof data !== 'object') {
        return false;
    }

    const d = data as Record<string, unknown>;

    if (!d.description || typeof d.description !== 'string' || d.description.trim().length === 0 || d.description.length > MAX_LONG_TEXT_LENGTH) {
        return false;
    }

    return true;
}

/**
 * Validates mutation request parameters
 */
export function validateMutateRequest(data: unknown): data is { prompt: string; type: MutationType } {
    if (!data || typeof data !== 'object') {
        return false;
    }

    const d = data as Record<string, unknown>;

    if (!d.prompt || typeof d.prompt !== 'string' || d.prompt.trim().length === 0 || d.prompt.length > MAX_LONG_TEXT_LENGTH) {
        return false;
    }

    if (!validateMutationType(d.type)) {
        return false;
    }

    return true;
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
    message: string,
    status: number = 500,
    details?: string,
    code?: string
): Response {
    return Response.json(
        {
            error: message,
            ...(details && { details }),
            ...(code && { code }),
        },
        { status }
    );
}
