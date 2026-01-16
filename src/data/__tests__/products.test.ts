import { products, categories } from '../products';

describe('Products Data', () => {
  it('doit contenir des produits', () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it('chaque produit doit avoir les propriétés requises', () => {
    products.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('image');
      expect(product).toHaveProperty('stock');
    });
  });

  it('tous les prix doivent être positifs', () => {
    products.forEach((product) => {
      expect(product.price).toBeGreaterThan(0);
    });
  });

  it('tous les stocks doivent être positifs ou nuls', () => {
    products.forEach((product) => {
      expect(product.stock).toBeGreaterThanOrEqual(0);
    });
  });

  it('doit contenir des catégories', () => {
    expect(categories.length).toBeGreaterThan(0);
  });

  it('doit contenir la catégorie "Tous"', () => {
    expect(categories).toContain('Tous');
  });
});
