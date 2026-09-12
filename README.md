# Meridian & Voss — Luxury Real Estate Flagship & PMS Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-gold?style=for-the-badge)]()

**Meridian & Voss** is an enterprise-grade, ultra-luxury private real estate web application and Property Management System (PMS). Designed for high-net-worth brokerages, private estate managers, sovereign buyers, and family offices, it combines Geneva-grade typography and aesthetic prestige with custom listing management and geolocation search capabilities.

---

## 🌟 Key Highlights & Features

### 🏛️ 1. Ultra-Luxury Design System
* **Cormorant Garamond & Inter Typography**: Editorial display typography paired with crisp interface text.
* **Dual Theme Engine**: Seamless real-time **Obsidian Dark Mode** and **Ivory Light Mode** theme switching with persistence.
* **Fluid Micro-Animations**: Weighted, slow transitions powered by Tailwind CSS and Framer Motion.

### 🏢 2. Integrated Property Management System (PMS)
* **Admin Dashboard (`/admin`)**: Complete management console to add, edit, or remove listings without code changes.
* **Dynamic Property Form**: Support for reference codes, price on application (POA), GPS coordinates, category tags, bedrooms, bathrooms, square footage, and photo galleries.
* **Client Lead Management (`/admin/enquiries`)**: Real-time lead capture tracking private viewing requests and buyer inquiries.

### 📍 3. Geolocation & Distance Search Engine
* **Browser Geolocation Integration**: Calculates real-time distance (in kilometers) between prospective buyers and luxury estates using mathematical haversine formulas.
* **Preset Location Coordinates**: Built-in support for global luxury hubs including *Porto Cervo (Sardinia), Mayfair (London), Monaco, Manhattan (New York), Palm Jumeirah (Dubai), and St. Moritz*.

### 📰 4. Private Journal & Underwriting Essays
* **Market Intelligence Engine (`/journal`)**: Editorial publishing platform for private market dispatches, planning precedents, and underwriting papers.
* **Pre-rendered Static Routes (`/journal/[slug]`)**: Instant-loading static pages featuring formatted subheadings (`##`), pull quotes, and related article recommendations.

### ⚖️ 5. Complete Legal & Compliance Suite
* Dedicated, pre-built legal governance pages:
  * **Privacy Policy (`/privacy`)**: Swiss FADP & EU GDPR data protection standards.
  * **Terms of Business (`/terms`)**: Retained buy-side representation and Swiss CO jurisdiction.
  * **Cookie Policy (`/cookies`)**: Minimalist zero-tracking digital policy.
  * **Modern Slavery Statement (`/modern-slavery`)**: Ethical supply chain governance.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict type safety) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS design tokens |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Storage Engine** | File-system persistent JSON store (`src/lib/db.ts`) |
| **Deployment** | [Vercel](https://vercel.com/) (Zero-config edge deployment) |

---

## 🚀 Quick Start & Local Setup

### Prerequisites
* **Node.js**: `v18.17.0` or higher
* **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ARSHMAN1776/luxury-realestate-platform.git
   cd luxury-realestate-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) (or port `3001`).

---

## 🔐 Admin Portal Access

The Property Management System (PMS) admin portal can be accessed via:
* **Direct URL**: `http://localhost:3000/admin`
* **Footer Access**: Click the subtle **Partner PMS** lock icon in the footer legal bar.

---

## ⚡ Deployment to Vercel

1. Push your changes to GitHub.
2. Log into your [Vercel Dashboard](https://vercel.com/).
3. Click **"New Project"** and select `ARSHMAN1776/luxury-realestate-platform`.
4. Click **Deploy**. Vercel will automatically build and assign a live HTTPS URL.

---

## 📜 License

Distributed under private proprietary license. Designed for commercial white-label deployment to luxury real estate agencies and brokerages.
