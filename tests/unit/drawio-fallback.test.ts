import { describe, expect, it } from "vitest"
import { isDrawioInitErrorMessage } from "@/lib/drawio-fallback"

describe("isDrawioInitErrorMessage", () => {
    it("detects addGCP3Palette crash text", () => {
        expect(
            isDrawioInitErrorMessage(
                "TypeError: this.addGCP3Palette is not a function",
            ),
        ).toBe(true)
    })

    it("detects nested error payloads", () => {
        expect(
            isDrawioInitErrorMessage({
                event: "error",
                message: {
                    stack: "Sidebar.initPalettes failed in app.min.js",
                },
            }),
        ).toBe(true)
    })

    it("ignores unrelated messages", () => {
        expect(
            isDrawioInitErrorMessage({
                event: "load",
                status: "ok",
            }),
        ).toBe(false)
    })
})
