/**
 * Tests d'intégration pour l'affichage des produits
 */

import { products } from '@/data/products';

describe('Products Integration', () => {
  it('doit avoir au moins 5 produits dans la base de données', () => {
    expect(products.length).toBeGreaterThanOrEqual(5);
  });

  it('tous les produits doivent avoir des images valides', () => {
    products.forEach((product) => {
      expect(product.image).toMatch(/^https?:\/\//);
    });
  });

  it('tous les produits doivent avoir des noms non vides', () => {
    products.forEach((product) => {
      expect(product.name.trim().length).toBeGreaterThan(0);
    });
  });

  it('tous les produits doivent avoir des descriptions non vides', () => {
    products.forEach((product) => {
      expect(product.description.trim().length).toBeGreaterThan(0);
    });
  });

  it('tous les produits doivent avoir des catégories valides', () => {
    const validCategories = ['Homme', 'Femme', 'Enfant', 'Accessoires', 'Chaussures'];
    products.forEach((product) => {
      expect(validCategories).toContain(product.category);
    });
  });

  it('doit avoir des produits de différentes catégories', () => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    expect(uniqueCategories.length).toBeGreaterThan(1);
  });
});
