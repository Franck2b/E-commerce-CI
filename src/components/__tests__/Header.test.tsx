/**
 * Tests unitaires du composant Header
 * Vérifie : logo, navigation, bannière promotionnelle
 */

import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('doit afficher le logo TOLUS', () => {
    render(<Header />);
    expect(screen.getByText('TOLUS')).toBeInTheDocument();
  });

  it('doit afficher le menu de navigation', () => {
    render(<Header />);
    expect(screen.getByText('Homme')).toBeInTheDocument();
    expect(screen.getByText('Femme')).toBeInTheDocument();
    expect(screen.getByText('Enfant')).toBeInTheDocument();
  });

  it('doit afficher la bannière promotionnelle', () => {
    render(<Header />);
    expect(screen.getByText(/Get 25% Off/i)).toBeInTheDocument();
  });

  it('doit afficher les icônes de navigation', () => {
    render(<Header />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });
});
