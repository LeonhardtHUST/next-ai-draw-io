const DRAWIO_INIT_ERROR_PATTERNS = [
    "addgcp3palette",
    "initpalettes",
    "is not a function",
]
const MAX_FLATTEN_DEPTH = 6

function parseMessageData(data: unknown): unknown {
    if (typeof data !== "string") {
        return data
    }

    try {
        return JSON.parse(data)
    } catch {
        return data
    }
}

function flattenMessageText(
    data: unknown,
    depth = 0,
    seen = new WeakSet<object>(),
): string {
    if (depth > MAX_FLATTEN_DEPTH || data == null) {
        return ""
    }

    if (typeof data === "string" || typeof data === "number") {
        return String(data)
    }

    if (typeof data !== "object") {
        return ""
    }

    if (seen.has(data)) {
        return ""
    }
    seen.add(data)

    return Object.values(data as Record<string, unknown>)
        .map((value) => flattenMessageText(value, depth + 1, seen))
        .filter(Boolean)
        .join(" ")
}

export function isDrawioInitErrorMessage(data: unknown): boolean {
    const text = flattenMessageText(parseMessageData(data)).toLowerCase()
    return DRAWIO_INIT_ERROR_PATTERNS.some((pattern) => text.includes(pattern))
}
