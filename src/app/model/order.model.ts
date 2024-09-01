export interface Order {
  id: string;
  userId: string;
  datetime: string;
  products: Order[];
  total: number;
  status: string;
}

interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
