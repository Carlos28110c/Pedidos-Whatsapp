export const restaurantInfo = {
  nombre: 'Brasa & Pan',
  subtitulo: 'Hamburguesas, pizzas y antojos para compartir',
  horario: '12:00 PM - 11:00 PM',
  bannerUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600&auto=format&fit=crop&q=85',
  logoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=240&auto=format&fit=crop&q=85',
};

export const deliveryZones = [
  { id: 'centro', nombre: 'Zona Centro / Cercanías', precio: 1.50 },
  { id: 'norte', nombre: 'Zona Norte / Barrio Obrero', precio: 2.50 },
  { id: 'sur', nombre: 'Zona Sur / Periférico', precio: 3.00 },
  { id: 'retiro', nombre: '🛍️ Retiro en Local', precio: 0.00 },
];

export const categories = [
  { id: 'todos', nombre: '🔥 Todos' },
  { id: 'hamburguesas', nombre: '🍔 Hamburguesas' },
  { id: 'pizzas', nombre: '🍕 Pizzas' },
  { id: 'bebidas', nombre: '🥤 Bebidas' },
  { id: 'postres', nombre: '🍰 Postres' },
];

export const products = [
  {
    id: 1,
    categoria: 'hamburguesas',
    nombre: 'Brasa Clásica',
    descripcion: 'Doble carne a la parrilla, queso cheddar, tocineta crocante y salsa de la casa.',
    precio: 8.50,
    imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=85',
    tag: 'Doble carne',
    opciones: [
      { nombre: 'Extra queso cheddar', precio: 1.00 },
      { nombre: 'Extra tocineta', precio: 1.50 },
      { nombre: 'Papas fritas', precio: 2.00 },
    ],
  },
  {
    id: 2,
    categoria: 'hamburguesas',
    nombre: 'Pollo Crispy',
    descripcion: 'Pollo crujiente, lechuga fresca, pepinillos y mayonesa de ajo.',
    precio: 7.00,
    imagen: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=700&auto=format&fit=crop&q=85',
    tag: null,
    opciones: [
      { nombre: 'Salsa de ajo extra', precio: 0.50 },
      { nombre: 'Papas fritas', precio: 2.00 },
    ],
  },
  {
    id: 3,
    categoria: 'hamburguesas',
    nombre: 'Doble Queso',
    descripcion: 'Dos carnes a la parrilla, doble cheddar, cebolla caramelizada y salsa ahumada.',
    precio: 9.50,
    imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&auto=format&fit=crop&q=85',
    tag: 'Doble carne',
    opciones: [
      { nombre: 'Extra queso cheddar', precio: 1.00 },
      { nombre: 'Extra tocineta', precio: 1.50 },
    ],
  },
  {
    id: 4,
    categoria: 'pizzas',
    nombre: 'Pizza Pepperoni',
    descripcion: 'Masa horneada, salsa de tomate, mozzarella y pepperoni.',
    precio: 12.00,
    imagen: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=700&auto=format&fit=crop&q=85',
    tag: null,
    opciones: [
      { nombre: 'Borde relleno de queso', precio: 2.50 },
      { nombre: 'Extra pepperoni', precio: 2.00 },
    ],
  },
  {
    id: 5,
    categoria: 'pizzas',
    nombre: 'Pizza Margarita',
    descripcion: 'Mozzarella, tomate fresco, albahaca y un toque de aceite de oliva.',
    precio: 10.50,
    imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&auto=format&fit=crop&q=85',
    tag: null,
    opciones: [
      { nombre: 'Borde relleno de queso', precio: 2.50 },
      { nombre: 'Extra mozzarella', precio: 1.50 },
    ],
  },
  {
    id: 6,
    categoria: 'bebidas',
    nombre: 'Refresco Cola 1.5 L',
    descripcion: 'Botella familiar, bien fría para acompañar tu comida.',
    precio: 2.50,
    imagen: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=700&auto=format&fit=crop&q=85',
    tag: null,
    opciones: [],
  },
  {
    id: 7,
    categoria: 'bebidas',
    nombre: 'Limonada de la casa',
    descripcion: 'Limonada fresca, preparada con limón y un toque de hierbabuena.',
    precio: 3.00,
    imagen: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=700&auto=format&fit=crop&q=85',
    tag: null,
    opciones: [],
  },
  {
    id: 8,
    categoria: 'postres',
    nombre: 'Brownie con helado',
    descripcion: 'Brownie de chocolate servido con una bola de helado de vainilla.',
    precio: 4.50,
    imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&auto=format&fit=crop&q=85',
    tag: 'Con helado',
    opciones: [
      { nombre: 'Extra helado', precio: 1.50 },
      { nombre: 'Salsa de chocolate', precio: 0.75 },
    ],
  },
  {
    id: 9,
    categoria: 'postres',
    nombre: 'Cheesecake de fresa',
    descripcion: 'Tarta cremosa de queso con cobertura de fresa.',
    precio: 4.00,
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=700&auto=format&fit=crop&q=85',
    tag: null,
    opciones: [],
  },
];
