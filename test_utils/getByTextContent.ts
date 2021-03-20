import { screen } from '@testing-library/react';

export default (text: string) => {
    return screen.getByText((content, node) => {
        const hasText = (node: Element) => node.textContent === text;
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
            (child) => !hasText(child)
        );

        return nodeHasText && childrenDontHaveText;
    });
}
