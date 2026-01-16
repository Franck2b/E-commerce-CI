import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('doit afficher le logo TOLUS', () => {
    render(<Footer />);
    expect(screen.getByText('TOLUS')).toBeInTheDocument();
  });

  it('doit afficher la description', () => {
    render(<Footer />);
    expect(screen.getByText(/Mode contemporaine/i)).toBeInTheDocument();
  });

  it('doit afficher les sections de liens', () => {
    render(<Footer />);
    expect(screen.getByText('Produit')).toBeInTheDocument();
    expect(screen.getByText('Catégories')).toBeInTheDocument();
    expect(screen.getByText('Nos Réseaux')).toBeInTheDocument();
  });

  it('doit afficher le copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 Tolus Production/i)).toBeInTheDocument();
  });
});
