export interface User {
  id: string;
  userType: string;
  profilePicture: string | ArrayBuffer | null;
  userName: string | null;
  email: string | null;
  password?: string | null;
  gender: string | null;
  address: string | null;
  orders: Order[];
  cart: any[];
}

interface Order {
  id: string;
  datetime: string;
  products: OrderProduct[];
  total: number;
  status: string;
}

interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
