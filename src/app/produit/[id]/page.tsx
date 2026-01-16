import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import styles from './page.module.css';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  // Produits similaires
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className={styles.productPage}>
      <div className="container">
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Accueil</Link>
          <span>/</span>
          <Link href="/catalogue">Catalogue</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        {/* Product Details */}
        <div className={styles.productDetails}>
          <div className={styles.imageSection}>
            <img src={product.image} alt={product.name} />
          </div>

          <div className={styles.infoSection}>
            <div className={styles.category}>{product.category}</div>
            <h1 className={styles.title}>{product.name}</h1>
            <div className={styles.price}>${product.price}</div>

            <div className={styles.description}>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className={styles.stock}>
              {product.stock > 0 ? (
                <span className={styles.inStock}>
                  ✓ En stock ({product.stock} disponible{product.stock > 1 ? 's' : ''})
                </span>
              ) : (
                <span className={styles.outOfStock}>✗ Rupture de stock</span>
              )}
            </div>

            <div className={styles.actions}>
              <button className={styles.addToCartBtn} disabled={product.stock === 0}>
                {product.stock > 0 ? 'Ajouter au panier' : 'Indisponible'}
              </button>
              <button className={styles.favoriteBtn}>♡ Ajouter aux favoris</button>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <strong>🚚 Livraison gratuite</strong>
                <p>Pour toute commande supérieure à $100</p>
              </div>
              <div className={styles.feature}>
                <strong>↩️ Retours gratuits</strong>
                <p>Sous 30 jours</p>
              </div>
              <div className={styles.feature}>
                <strong>✓ Garantie qualité</strong>
                <p>Produits certifiés premium</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className={styles.relatedSection}>
            <h2>Produits similaires</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
