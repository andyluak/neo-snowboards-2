import { render, screen } from '@testing-library/react';
import CategoryType from '../../pages/index';
import '@testing-library/jest-dom';

describe('Category', () => {
    it('renders a heading', () => {
        render(<CategoryType category="snowboards" />);

        const heading = screen.getByRole('heading');

        expect(heading).toBeInTheDocument();
    });
});
