/**
 * Composant Header - Navigation principale de l'application TOLUS
 * Inclut : Logo, menu de navigation, icônes utilisateur
 */

import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topBanner}>
        <p>Get 25% Off This Summer! Best Deals Ever! - Net: 485M - 375</p>
      </div>
      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.navContent}>
            <ul className={styles.navLinks}>
              <li><Link href="/">Homme</Link></li>
              <li><Link href="/">Femme</Link></li>
              <li><Link href="/">Enfant</Link></li>
              <li><Link href="/">Nouveautés</Link></li>
              <li><Link href="/">Cadeaux</Link></li>
            </ul>
            <Link href="/" className={styles.logo}>
              <h1>TOLUS</h1>
            </Link>
            <div className={styles.navIcons}>
              <button aria-label="Recherche">🔍</button>
              <button aria-label="Compte">👤</button>
              <button aria-label="Panier">🛒</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
