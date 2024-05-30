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

export type Pesanan = {
    NamaBarang: string;
    NamaToko: string;
    TotalHarga: number;
    JumlahBarang: number;
    StatusPesanan: string;
};

export type Pengguna = {
  Email: string;
  NamaPengguna: string | null;
  JenisKelamin: string | null;
  NomorTelepon: string | null;
  NamaToko: string | null;
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