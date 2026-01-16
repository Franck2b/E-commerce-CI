import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h2 className={styles.logo}>TOLUS</h2>
            <p className={styles.description}>
              Mode contemporaine et intemporelle pour tous. Qualité et élégance dans chaque pièce.
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Produit</h3>
            <ul>
              <li><Link href="/">Homme</Link></li>
              <li><Link href="/">Femme</Link></li>
              <li><Link href="/">Enfant</Link></li>
              <li><Link href="/">Accessoires</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Catégories</h3>
            <ul>
              <li><Link href="/catalogue">Homme</Link></li>
              <li><Link href="/catalogue">Femme</Link></li>
              <li><Link href="/catalogue">Enfant</Link></li>
              <li><Link href="/catalogue">Nouveautés</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Nos Réseaux</h3>
            <ul>
              <li><Link href="/">Instagram</Link></li>
              <li><Link href="/">Facebook</Link></li>
              <li><Link href="/">Twitter</Link></li>
              <li><Link href="/">Pinterest</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>© 2025 Tolus Production</p>
          <div className={styles.footerLinks}>
            <Link href="/">Terms & Conditions</Link>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
