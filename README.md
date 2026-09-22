# Odoratus Storefront

A responsive luxury fragrance storefront built from a Figma product-detail design. The project includes a product catalogue, dynamic product detail pages, interactive galleries, volume selection, gift wrapping, quantity controls, and a Zustand-powered cart.

## Features

- Responsive product catalogue with search, filters, sorting, and pagination UI
- Dynamic `/products/[productId]` product pages
- Reusable product gallery with thumbnail selection and fallback images
- Product volume variants with live pricing
- Gift-wrapping toggle and quantity controls
- Add-to-cart flow backed by Zustand
- Related-products section and responsive brand footer
- Mock service boundary ready for a future catalog API

## Technologies

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- TanStack Query
- Zustand
- Jest and Cypress
- ESLint and Prettier

## Getting started

### Requirements

- Node.js 20+
- npm 10+ or pnpm 10+

### Installation

```bash
npm install
copy .env.example .env.local
```

On macOS or Linux, use `cp .env.example .env.local` instead.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run typecheck` | Run TypeScript validation |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |
| `npm run test:e2e` | Run Cypress end-to-end tests |
| `npm run format:check` | Check Prettier formatting |

## Project structure

```text
src/app/                 App Router pages and layouts
src/components/          Shared UI and navigation
src/features/products/   Product data, services, hooks, and catalogue UI
src/features/cart/       Cart state, components, and utilities
src/lib/                 Shared API and utility helpers
public/images/products/  Local product imagery
```

## Implementation notes

- Product data is sourced through the products service and currently uses local mock data by default.
- Product detail content is data-driven; no product is hardcoded into the detail component.
- Gallery slots reuse the product's first image when additional images are unavailable.
- Cart state is client-side and managed with Zustand.
- Copy `.env.example` to `.env.local` for local configuration. Environment files are ignored and must not contain committed secrets.

## Credits

Visual direction is based on the provided Digitera Frontend Engineering Bootcamp Figma design. Product imagery is included as local project assets.
