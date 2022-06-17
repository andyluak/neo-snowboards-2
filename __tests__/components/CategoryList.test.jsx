import { render, screen } from '@testing-library/react';
import CategoryList from '../../components/category/category-list/CategoryList';
import '@testing-library/jest-dom';

const categoryListProps = {
    category: {
        category_name: 'men',
    },
    categoryType: 'boots',
    products: [
        {
            product_name: 'boots',
            id: '1',
            image: '1653400044990.jpg',
        },
        {
            product_name: 'boots 2',
            id: '2',
            image: '1653400044990.jpg',
        },
        {
            product_name: 'boots 3',
            id: '3',
            image: '1653400044990.jpg',
        },
    ],
};

describe('Category List', () => {
    it('renders a paragraph', () => {
        render(<CategoryList {...categoryListProps} />);

        const categoryHeader = screen.getByText(/men boots/i);

        expect(categoryHeader).toBeInTheDocument();
    });

    it('renders the see all button', () => {
        render(<CategoryList {...categoryListProps} />);

        const button = screen.getByText(/see all/i);

        expect(button).toBeInTheDocument();
    });
});
