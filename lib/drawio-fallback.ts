const DRAWIO_INIT_ERROR_PATTERNS = [
    "addgcp3palette",
    "initpalettes",
    "is not a function",
]

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

function flattenMessageText(data: unknown): string {
    if (data == null) {
        return ""
    }

    if (typeof data === "string" || typeof data === "number") {
        return String(data)
    }

    if (typeof data !== "object") {
        return ""
    }

    return Object.values(data as Record<string, unknown>)
        .map(flattenMessageText)
        .filter(Boolean)
        .join(" ")
}

export function isDrawioInitErrorMessage(data: unknown): boolean {
    const text = flattenMessageText(parseMessageData(data)).toLowerCase()
    return DRAWIO_INIT_ERROR_PATTERNS.some((pattern) => text.includes(pattern))
}
