import Link from 'next/link';
import { Product } from '@/data/products';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produit/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>${product.price}</p>
      </div>
    </Link>
  );
}
