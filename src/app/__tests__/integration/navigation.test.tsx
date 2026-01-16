/**
 * Tests d'intégration pour la navigation
 */

import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { products } from '@/data/products';

describe('Navigation Integration', () => {
  it('la page d\'accueil doit afficher le titre principal', () => {
    render(<Home />);
    expect(screen.getByText(/TOLUS SPRING COLLECTION/i)).toBeInTheDocument();
  });

  it('la page d\'accueil doit afficher des produits', () => {
    render(<Home />);
    const productCards = screen.getAllByRole('link');
    expect(productCards.length).toBeGreaterThan(0);
  });

  it('la page d\'accueil doit afficher la section NEW COLLECTION', () => {
    render(<Home />);
    expect(screen.getByText('NEW COLLECTION')).toBeInTheDocument();
  });

  it('la page d\'accueil doit afficher la section mariage', () => {
    render(<Home />);
    expect(screen.getByText('WEAR TO WEDDING')).toBeInTheDocument();
  });

  it('la page d\'accueil doit afficher les catégories MAN, WOMAN, KIDS', () => {
    render(<Home />);
    expect(screen.getByText('MAN')).toBeInTheDocument();
    expect(screen.getByText('WOMAN')).toBeInTheDocument();
    expect(screen.getByText('KIDS')).toBeInTheDocument();
  });
});
