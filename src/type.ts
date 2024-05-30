export type Barang = {
  BarangID: string;
  NamaBarang: string;
  Kategori: String;
  Harga: number;
  Foto: string;
  Deskripsi: string;
  Stok: number;
  NamaToko: string;
  EmailPengguna: string;
};

export type Pengguna = {
  Email: string;
  NamaPengguna: string | null;
  JenisKelamin: string | null;
  NomorTelepon: string | null;
  NamaToko: string | null | null;
  Foto: string | null;
};

export type Alamat = {
  DetailAlamat: string;
  KodePos: string;
  NamaAlamat: string;
  NamaJalan: string;
};

export type Keranjang = {
  BarangID: string;
  Jumlah: number;
  SubTotal: number;
};

export type Tandai = {
  BarangID: string;
};

// // export type Product = {
// //   id: number;
// //   image: string | null;
// //   name: string;
// //   price: number;
// // };

// export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

// export type CartItem = {
//   id: string;
//   product: Product;
//   product_id: number;
//   size: PizzaSize;
//   quantity: number;
// };

// export const OrderStatusList: OrderStatus[] = [
//   'New',
//   'Cooking',
//   'Delivering',
//   'Delivered',
// ];

// export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

// export type Order = {
//   id: number;
//   created_at: string;
//   total: number;
//   user_id: string;
//   status: OrderStatus;

//   order_items?: OrderItem[];
// };

// export type OrderItem = {
//   id: number;
//   product_id: number;
//   products: Product;
//   order_id: number;
//   size: PizzaSize;
//   quantity: number;
// };

// export type Profile = {
//   id: string;
//   group: string;
// };
