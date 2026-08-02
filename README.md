<div align="center">

⭐ **Si te gusta este proyecto, dale una estrella al repositorio!** ⭐

<br>

<a href="https://github.com/k1k3cb/ecommerce-next15-stripe-tailwind" target="blank">
<img src="./screenshots/home.png" width="90" alt="SneakDrop Logo" />
</a>

## SneakDrop

### Tu tienda de sneakers y streetwear con IA integrada

![](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![](https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge&logo=groq&logoColor=white)

<img src="./screenshots/home.png" width="80%" alt="SneakDrop Preview">

</div>

---

## 💡 Overview

**SneakDrop** es un e-commerce completo de sneakers y streetwear construido con Next.js 15 App Router. Lo que lo diferencia de un proyecto tipico es la integracion de un **asistente IA** que consulta el catalogo real de productos para dar recomendaciones precisas, filtros avanzados por metadata, y un flujo de compra que permite navegar libremente sin login hasta el momento del pago.

## ✨ Features

- **🤖 Asistente IA con Groq:** Chat integrado con streaming, conectado al catalogo real de Stripe. Filtra por genero, marca, color, material y mas. Powered by Llama 3.3 70B.
- **🔍 Filtros avanzados:** Busqueda por texto, filtros por categoria, marca, color, genero, material, silueta y tipo de lanzamiento. Sidebar en desktop, drawer en movil.
- **🛒 Carrito guest:** Carrito persistente con Zustand + localStorage. Funciona sin login. Seleccion de tallas por producto.
- **💳 Checkout con Stripe:** Pagos con tarjeta. Login requerido solo al proceder al pago. Redireccion inteligente post-login.
- **🔐 Auth con Better Auth:** Email/password, sesiones de 7 dias, login y registro con redirectTo para flujo de compra.
- **🌙 Dark mode:** Tema claro/oscuro con next-themes. Responsive design completo.
- **📄 SEO optimizado:** Metadata dinamica, JSON-LD Product Schema, sitemap automatico.
- **✨ Animaciones:** Framer Motion en transiciones, view transitions entre producto y detalle.

## 👩‍💻 Tech Stack

- **Next.js 15** - App Router, Server Components, Server Actions
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - Componentes UI accesibles
- **Framer Motion** - Animaciones
- **Zustand** - State management con persistencia
- **Better Auth** - Autenticacion email/password
- **Drizzle ORM** - ORM type-safe para PostgreSQL
- **Neon** - PostgreSQL serverless
- **Stripe** - Pagos con tarjeta
- **Groq SDK** - IA con Llama 3.3 70B
- **Vitest** - Testing unitario
- **Lucide React** - Iconos

## 📸 Screenshots

<div align="center">

### Home
<img src="./screenshots/home.png" alt="Home" width="80%">

### Catalogo con Filtros
<img src="./screenshots/products.png" alt="Products" width="80%">

### Detalle de Producto
<img src="./screenshots/product-detail.png" alt="Product Detail" width="80%">

### Chat IA
<img src="./screenshots/chat.png" alt="AI Chat" width="80%">

### Checkout
<img src="./screenshots/checkout.png" alt="Checkout" width="80%">

### Dark Mode
<img src="./screenshots/dark-mode.png" alt="Dark Mode" width="80%">

</div>

## 📁 Project Structure

```
ecommerce-SneakDrop/
├── app/
│   ├── api/chat/          # API del chat IA (Groq + Stripe catalog)
│   ├── auth/              # Login y registro
│   ├── checkout/          # Checkout (guest-friendly)
│   ├── products/          # Catalogo y detalle
│   ├── success/           # Pago exitoso
│   └── about/             # Sobre nosotros
├── components/
│   ├── chat-widget.tsx    # Widget de chat IA flotante
│   ├── product-filters.tsx # Sistema de filtros avanzados
│   ├── product-list.tsx   # Grid de productos con filtros
│   ├── product-detail.tsx # Detalle con selector de tallas
│   ├── Navbar.tsx         # Navegacion responsive
│   └── ui/               # Componentes shadcn/ui
├── store/
│   └── cart-store.ts     # Zustand store del carrito
├── lib/
│   ├── auth.ts           # Configuracion Better Auth
│   ├── stripe.ts         # Cliente Stripe
│   └── db/               # Drizzle schema + Neon
├── actions/
│   └── checkout-action.ts # Server Action para Stripe
└── tests/                # Tests unitarios
```

## 📦 Getting Started

### Prerequisites

- **Node.js** 18+
- **pnpm**
- Cuenta de [Stripe](https://stripe.com) (test mode)
- Cuenta de [Groq](https://groq.com) (para el chat IA)
- Base de datos [Neon](https://neon.tech) PostgreSQL

### Installation

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/k1k3cb/ecommerce-next15-stripe-tailwind.git
   cd ecommerce-next15-stripe-tailwind
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

> Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 📋 Stripe Product Metadata

Para que los filtros y el chat IA funcionen, cada producto en Stripe debe tener estos campos en su metadata:

| Campo | Valores ejemplo | Uso |
|-------|----------------|-----|
| `category` | clothes, shoes, complements | Filtro de categoria |
| `brand` | Nike, Adidas, New Balance, Jordan | Filtro + Chat IA |
| `colorway` | Negro, Blanco, Rojo, Multicolor | Filtro + Chat IA |
| `gender` | Hombre, Mujer, Unisex | Filtro + Chat IA |
| `material` | Cuero, Sintetico, Textil, Malla | Filtro + Chat IA |
| `silhouette` | Air Force 1, Dunk, Yeezy, Samba | Filtro + Chat IA |
| `release_type` | New Drop, Restock, Limited, Sale | Filtro + Chat IA |
| `sizes` | 38,39,40,41,42 | Selector de tallas |

## 🧪 Testing

```bash
pnpm test
```

```
✓ store/cart-store.test.ts (17 tests)
✓ utils/utils.test.ts (5 tests)

Test Files  2 passed (2)
     Tests  22 passed (22)
```

## 📜 License

Distribuido bajo la licencia MIT.

---

<div align="center">

**SneakDrop** — Built with Next.js, Stripe & Groq AI

</div>
