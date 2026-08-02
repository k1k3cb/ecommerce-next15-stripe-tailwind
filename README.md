<![CDATA[<div align="center">

# SneakDrop

### Tu tienda de sneakers y streetwear con IA integrada

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge&logo=groq&logoColor=white)

<br/>

<!-- Reemplaza estas rutas con tus capturas reales -->
<img src="public/screenshots/home.png" alt="SneakDrop Home" width="800"/>

</div>

---

## Visión General

**SneakDrop** es un e-commerce completo de sneakers y streetwear construido con Next.js 15 App Router. Lo que lo diferencia de un proyecto típico es la integración de un **asistente IA** que consulta el catálogo real de productos para dar recomendaciones precisas, filtros avanzados por metadata, y un flujo de compra que permite navegar libremente sin login hasta el momento del pago.

---

## Características Principales

### Asistente IA con Groq
- Chat integrado con streaming de respuestas en tiempo real
- Conectado al catálogo real de Stripe (no inventa productos)
- Filtra por metadata: género, marca, color, material, silueta, tipo de lanzamiento
- Powered by Llama 3.3 70B via Groq API

### Catálogo y Filtros
- Búsqueda por texto con debounce
- Filtros por categoría (Ropa, Zapatos, Complementos)
- Filtros avanzados: Marca, Color, Género, Material, Silueta, Tipo de lanzamiento
- Rango de precio con inputs min/max
- Sidebar de filtros en desktop, drawer deslizante en móvil
- Animaciones con Framer Motion en transiciones de filtros

### Carrito y Checkout
- Carrito persistente con Zustand + localStorage
- Funciona sin login (guest cart)
- Selección de tallas por producto
- Checkout con Stripe (pagos con tarjeta)
- Login requerido solo al proceder al pago
- Redirección inteligente post-login al checkout

### Autenticación
- Better Auth con email/password
- Sesiones persistentes (7 días)
- Login y registro con redirectTo para flujo de compra
- Middleware que protege rutas privadas

### SEO y Rendimiento
- Metadata dinámica por página
- JSON-LD Product Schema para SEO
- Sitemap automático
- Dark mode con next-themes
- View Transitions entre producto y detalle
- Responsive design completo

---

## Tech Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS 4, shadcn/ui |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Estado | Zustand (persist) |
| Auth | Better Auth |
| Base de datos | Neon PostgreSQL + Drizzle ORM |
| Pagos | Stripe |
| IA | Groq SDK (Llama 3.3 70B) |
| Testing | Vitest + Testing Library |
| Tema | next-themes |

---

## Capturas

<!-- Reemplaza estas rutas con tus capturas reales -->

<div align="center">

### Home
<img src="public/screenshots/home.png" alt="Home" width="700"/>

### Catálogo con Filtros
<img src="public/screenshots/products.png" alt="Products" width="700"/>

### Detalle de Producto
<img src="public/screenshots/product-detail.png" alt="Product Detail" width="700"/>

### Chat IA
<img src="public/screenshots/chat.png" alt="AI Chat" width="700"/>

### Checkout
<img src="public/screenshots/checkout.png" alt="Checkout" width="700"/>

### Dark Mode
<img src="public/screenshots/dark-mode.png" alt="Dark Mode" width="700"/>

</div>

---

## Estructura del Proyecto

```
ecommerce-SneakDrop/
├── app/
│   ├── api/chat/          # API del chat IA (Groq + Stripe catalog)
│   ├── auth/              # Login y registro
│   ├── checkout/          # Página de checkout (guest-friendly)
│   ├── products/          # Catálogo y detalle de producto
│   ├── success/           # Pago exitoso
│   └── about/             # Sobre nosotros
├── components/
│   ├── chat-widget.tsx    # Widget de chat IA flotante
│   ├── product-filters.tsx # Sistema de filtros avanzados
│   ├── product-list.tsx   # Grid de productos con filtros
│   ├── product-card.tsx   # Card de producto
│   ├── product-detail.tsx # Detalle con selector de tallas
│   ├── Navbar.tsx         # Navegación responsive
│   └── ui/               # Componentes shadcn/ui
├── store/
│   └── cart-store.ts     # Zustand store del carrito
├── lib/
│   ├── auth.ts           # Configuración Better Auth
│   ├── stripe.ts         # Cliente Stripe
│   └── db/               # Drizzle schema + conexión Neon
├── actions/
│   └── checkout-action.ts # Server Action para Stripe checkout
├── hooks/
│   └── use-debounce.ts   # Hook de debounce
└── tests/                # Tests unitarios
```

---

## Getting Started

### Prerrequisitos

- Node.js 18+
- pnpm
- Cuenta de Stripe (test mode)
- Cuenta de Groq (para el chat IA)
- Base de datos Neon PostgreSQL

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/ecommerce-SneakDrop.git
cd ecommerce-SneakDrop
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env.local`:
```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/db?sslmode=require

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Groq (Chat IA)
GROQ_API_KEY=gsk_...

# Better Auth
BETTER_AUTH_SECRET=tu_secret_de_min_32_caracteres
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Migrar la base de datos**
```bash
npx drizzle-kit push
```

5. **Iniciar el servidor de desarrollo**
```bash
pnpm dev
```

6. **Abrir en el navegador**

[http://localhost:3000](http://localhost:3000)

---

## Metadata de Productos en Stripe

Para que los filtros y el chat IA funcionen, cada producto en Stripe debe tener estos campos en su metadata:

| Campo | Valores ejemplo | Uso |
|-------|----------------|-----|
| `category` | clothes, shoes, complements | Filtro de categoría |
| `brand` | Nike, Adidas, New Balance, Jordan | Filtro + Chat IA |
| `colorway` | Negro, Blanco, Rojo, Multicolor | Filtro + Chat IA |
| `gender` | Hombre, Mujer, Unisex | Filtro + Chat IA |
| `material` | Cuero, Sintético, Textil, Malla | Filtro + Chat IA |
| `silhouette` | Air Force 1, Dunk, Yeezy, Samba | Filtro + Chat IA |
| `release_type` | New Drop, Restock, Limited, Sale | Filtro + Chat IA |
| `sizes` | 38,39,40,41,42 | Selector de tallas |

---

## Scripts

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm test         # Ejecutar tests
pnpm test:watch   # Tests en modo watch
pnpm lint         # Linting con ESLint
```

---

## Tests

El proyecto incluye tests unitarios con Vitest:

```bash
pnpm test
```

```
✓ store/cart-store.test.ts (17 tests)
✓ utils/utils.test.ts (5 tests)

Test Files  2 passed (2)
     Tests  22 passed (22)
```

---

## Licencia

Distribuido bajo la licencia MIT.

---

<div align="center">

**SneakDrop** — Built with Next.js, Stripe, and Groq AI

</div>
]]>