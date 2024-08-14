export interface User {
  id: string;
  userType: string;
  profilePicture: string | ArrayBuffer | null;
  userName: string | null;
  email: string | null;
  password: string | null;
  gender: string | null;
  address: string | null;
  orders: Order[];
}

interface Order{
  id: string;
  datetime: string;
  products: Product[];
  total: number;
}

interface Product{
  id: string;
  name:  string;
  price: number;
  quantity: number;
}
