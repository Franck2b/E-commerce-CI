export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Loro Piana",
    price: 45,
    category: "Homme",
    description: "Polo classique en coton doux avec fermeture éclair",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500",
    stock: 15
  },
  {
    id: 2,
    name: "White Pants",
    price: 90,
    category: "Homme",
    description: "Pantalon blanc élégant pour toutes occasions",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
    stock: 8
  },
  {
    id: 3,
    name: "Bidha Glasses",
    price: 50,
    category: "Accessoires",
    description: "Lunettes de soleil avec design moderne",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    stock: 20
  },
  {
    id: 4,
    name: "Brown Bomber",
    price: 52,
    category: "Homme",
    description: "Blouson bomber marron style aviateur",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    stock: 5
  },
  {
    id: 5,
    name: "Leather Shoes Jack",
    price: 89,
    category: "Chaussures",
    description: "Chelsea boots en cuir suédé beige",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500",
    stock: 12
  },
  {
    id: 6,
    name: "Grey Tshirt",
    price: 21,
    category: "Homme",
    description: "T-shirt gris basique en coton",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    stock: 30
  },
  {
    id: 7,
    name: "Robe de mariée",
    price: 450,
    category: "Femme",
    description: "Robe élégante pour mariage",
    image: "https://images.unsplash.com/photo-1594552072238-5cb96a9c6803?w=500",
    stock: 3
  },
  {
    id: 8,
    name: "Pull blanc tricot",
    price: 75,
    category: "Homme",
    description: "Pull en tricot blanc style scandinave",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
    stock: 10
  },
  {
    id: 9,
    name: "Veste beige",
    price: 120,
    category: "Femme",
    description: "Veste beige oversize confortable",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
    stock: 7
  },
  {
    id: 10,
    name: "Ensemble rose",
    price: 95,
    category: "Enfant",
    description: "Ensemble confortable pour enfants",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500",
    stock: 15
  }
];

export const categories = ["Tous", "Homme", "Femme", "Enfant", "Accessoires", "Chaussures"];
