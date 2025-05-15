import { Injectable } from '@nestjs/common';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'Auriculares Bluetooth',
      description: 'Auriculares inalámbricos con cancelación de ruido.',
      price: 149.99,
      stock: true,
      imgUrl: 'https://example.com/img/auriculares.jpg',
    },
    {
      id: 2,
      name: 'Teclado Mecánico RGB',
      description: 'Teclado gamer retroiluminado con switches azules.',
      price: 89.5,
      stock: true,
      imgUrl: 'https://example.com/img/teclado.jpg',
    },
    {
      id: 3,
      name: 'Monitor 27" 4K',
      description: 'Monitor UHD con panel IPS y tasa de refresco de 144Hz.',
      price: 349.99,
      stock: false,
      imgUrl: 'https://example.com/img/monitor.jpg',
    },
    {
      id: 4,
      name: 'Silla Ergonómica',
      description: 'Silla de oficina con soporte lumbar ajustable.',
      price: 199.99,
      stock: true,
      imgUrl: 'https://example.com/img/silla.jpg',
    },
    {
      id: 5,
      name: 'Webcam Full HD',
      description: 'Cámara web 1080p ideal para videollamadas y streaming.',
      price: 59.9,
      stock: true,
      imgUrl: 'https://example.com/img/webcam.jpg',
    },
    {
      id: 6,
      name: 'Mouse Inalámbrico',
      description:
        'Mouse ergonómico con conexión Bluetooth y batería recargable.',
      price: 29.99,
      stock: true,
      imgUrl: 'https://example.com/img/mouse.jpg',
    },
    {
      id: 7,
      name: 'Hub USB-C 7-en-1',
      description: 'Hub con puertos HDMI, USB 3.0, lector SD y más.',
      price: 39.5,
      stock: false,
      imgUrl: 'https://example.com/img/hub.jpg',
    },
    {
      id: 8,
      name: 'Smartwatch Deportivo',
      description: 'Reloj inteligente con monitoreo de ritmo cardíaco y GPS.',
      price: 129.99,
      stock: true,
      imgUrl: 'https://example.com/img/smartwatch.jpg',
    },
    {
      id: 9,
      name: 'Disco SSD 1TB',
      description: 'Unidad de estado sólido con interfaz NVMe PCIe Gen4.',
      price: 159.0,
      stock: true,
      imgUrl: 'https://example.com/img/ssd.jpg',
    },
    {
      id: 10,
      name: 'Parlante Bluetooth',
      description: 'Altavoz portátil resistente al agua con batería de 12h.',
      price: 79.95,
      stock: true,
      imgUrl: 'https://example.com/img/parlante.jpg',
    },
  ];
  private currentId = Math.max(...this.products.map((u) => u.id), 0) + 1; // ✅ arranca en el siguiente ID libre
  getProducts() {
    return this.products;
  }
  getProductById(id: number) {
    return this.products.find((user) => user.id === id);
  }
  addProduct(product: Omit<Product, 'id'>) {
    const id = this.currentId++; // ✅ ID único, sin depender del length
    const newProduct = { id, ...product };
    this.products = [...this.products, newProduct];

    return newProduct;
  }

  updateProduct(id: number, product: Omit<Product, 'id'>) {
    const oldProduct = this.products.find((product) => product.id === id);

    if (!oldProduct) {
      return null;
    }

    const updatedProduct = { ...oldProduct, ...product };

    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = updatedProduct;

    return updatedProduct;
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    const product = this.products[index];

    this.products.splice(index, 1);

    return product;
  }
}
