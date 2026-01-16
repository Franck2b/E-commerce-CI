import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { Product } from '@/data/products';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 99,
    category: 'Test',
    description: 'Test description',
    image: 'https://test.com/image.jpg',
    stock: 10,
  };

  it('doit afficher le nom du produit', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('doit afficher le prix du produit', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$99')).toBeInTheDocument();
  });

  it('doit afficher la catégorie du produit', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('doit contenir un lien vers la page du produit', () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/produit/1');
  });
});
