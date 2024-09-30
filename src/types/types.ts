export interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    category: string;
    ratings: number;
    images: string[];
    isDeleted: boolean;
  }
  
  export interface UpdateProduct {
    id: string;
    data: Partial<Product>;
  }
  
  export interface ProductQueryParams {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }