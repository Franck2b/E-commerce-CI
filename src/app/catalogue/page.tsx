'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import styles from './page.module.css';

export default function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Filtrage
  let filteredProducts = products;

  if (selectedCategory !== 'Tous') {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Tri
  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  return (
    <div className={styles.catalogue}>
      <div className={styles.header}>
        <div className="container">
          <h1>Notre Catalogue</h1>
          <p>Découvrez toute notre collection de produits premium</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          {/* Sidebar Filters */}
          <aside className={styles.sidebar}>
            <div className={styles.filterSection}>
              <h3>Catégories</h3>
              <div className={styles.categories}>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`${styles.categoryBtn} ${
                      selectedCategory === category ? styles.active : ''
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3>Recherche</h3>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterSection}>
              <h3>Trier par</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="default">Par défaut</option>
                <option value="name">Nom (A-Z)</option>
                <option value="price-asc">Prix (croissant)</option>
                <option value="price-desc">Prix (décroissant)</option>
              </select>
            </div>
          </aside>

          {/* Products Grid */}
          <main className={styles.main}>
            <div className={styles.resultsHeader}>
              <p>{filteredProducts.length} produit(s) trouvé(s)</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <p>Aucun produit trouvé</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
