import { fireEvent } from "@testing-library/react"

// https://stackoverflow.com/a/62820239
export class SliderClicker {
    private static height = 10

    // For simplicity pretend that slider's width is 100
    private static width = 100

    private static getBoundingClientRectMock() {
        return {
            bottom: SliderClicker.height,
            height: SliderClicker.height,
            left: 0,
            right: SliderClicker.width,
            top: 0,
            width: SliderClicker.width,
            x: 0,
            y: 0,
        } as DOMRect
    }

    static change(element: HTMLElement, value: number, min: number = 0, max: number = 100) {
        const getBoundingClientRect = element.getBoundingClientRect
        element.getBoundingClientRect = SliderClicker.getBoundingClientRectMock
        fireEvent.mouseDown(
            element,
            {
                clientX: ((value - min) / (max - min)) * SliderClicker.width,
                clientY: SliderClicker.height
            }
        )
        element.getBoundingClientRect = getBoundingClientRect
    }
}