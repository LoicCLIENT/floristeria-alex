export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: Category;
  occasion?: Occasion[];
  featured?: boolean;
  bestseller?: boolean;
  stock: number;
  careInstructions?: string;
}

export type Category =
  | 'ramos'
  | 'plantas-interior'
  | 'bonsais'
  | 'arreglos'
  | 'ocasiones-especiales'
  | 'plantas-exterior';

export type Occasion =
  | 'cumpleanos'
  | 'amor'
  | 'condolencias'
  | 'boda'
  | 'nacimiento'
  | 'agradecimiento'
  | 'aniversario';

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}

export interface Order {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  delivery_date: string;
  delivery_time?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  created_at?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image?: string;
  date: string;
}

export interface FilterOptions {
  category?: Category | 'all';
  priceRange?: [number, number];
  occasion?: Occasion | 'all';
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'popular';
  searchQuery?: string;
}
