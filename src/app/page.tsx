import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import styles from './page.module.css';

export default function Home() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>TOLUS SPRING COLLECTION</h1>
          <p className={styles.heroSubtitle}>
            Découvrez notre nouvelle collection printemps/été. Des pièces intemporelles pour un style élégant et moderne.
          </p>
          <Link href="/catalogue" className={styles.heroButton}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* New Collection */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>NEW COLLECTION</h2>
            <p>
              Des pièces soigneusement sélectionnées pour sublimer votre garde-robe.
              Qualité premium et designs contemporains.
            </p>
          </div>
          
          <div className={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Section */}
      <section className={styles.weddingSection}>
        <div className={styles.weddingImage}>
          <img 
            src="https://images.unsplash.com/photo-1594552072238-5cb96a9c6803?w=1200" 
            alt="Wedding"
          />
        </div>
        <div className={styles.weddingContent}>
          <h2>WEAR TO WEDDING</h2>
          <p>
            Trouvez la tenue parfaite pour vos événements spéciaux. Élégance et raffinement garantis.
          </p>
          <Link href="/catalogue" className={styles.weddingButton}>
            See Details
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.categoriesGrid}>
            <div className={styles.categoryCard}>
              <img 
                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600" 
                alt="Man"
              />
              <div className={styles.categoryOverlay}>
                <h3>MAN</h3>
                <Link href="/catalogue?category=Homme" className={styles.categoryButton}>
                  See Details
                </Link>
              </div>
            </div>
            
            <div className={styles.categoryCard}>
              <img 
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600" 
                alt="Woman"
              />
              <div className={styles.categoryOverlay}>
                <h3>WOMAN</h3>
                <Link href="/catalogue?category=Femme" className={styles.categoryButton}>
                  See Details
                </Link>
              </div>
            </div>
            
            <div className={styles.categoryCard}>
              <img 
                src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600" 
                alt="Kids"
              />
              <div className={styles.categoryOverlay}>
                <h3>KIDS</h3>
                <Link href="/catalogue?category=Enfant" className={styles.categoryButton}>
                  See Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
