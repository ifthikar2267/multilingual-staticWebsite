# Multilingual Static Website - Discover Saudi

A production-ready Next.js multilingual website featuring About Us and Destination Management Company (DMC) pages with full SSR support, RTL/LTR layouts, and Material UI v5.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript
- **UI Library:** Material UI v5
- **State Management:** MobX (UI state only)
- **Styling:** Emotion (CSS-in-JS)
- **Image Optimization:** Next.js Image
- **Rendering:** Server-Side Rendering (SSR)
- **Multilingual:** LTR/RTL support (English/Arabic)

## ✨ Features

### Core Features
- ✅ **True Server-Side Rendering** - Full HTML on initial load
- ✅ **Multilingual Support** - English (en) and Arabic (ar) with automatic RTL
- ✅ **SEO Optimized** - Dynamic metadata and OpenGraph tags
- ✅ **Responsive Design** - Mobile-first, tablet, and desktop layouts
- ✅ **Material UI SSR** - Proper Emotion cache with RTL plugin
- ✅ **Image Optimization** - Next.js Image with Strapi CDN support
- ✅ **Dynamic Routing** - Locale-based routing `/[locale]/page`
- ✅ **Modular Architecture** - Reusable components and clean separation

### Pages
1. **About Us** (`/[locale]/about-us`)
   - Hero section with full-width image
   - Featured cards with alternating layouts
   - Dynamic section rendering
   - Card grids
   - Logo sections

2. **Destination Management Company** (`/[locale]/destination-management`)
   - DMC-specific hero
   - Featured services cards
   - Our Services section (9+ cards)
   - HAJJ & UMRAH section
   - Awards section

3. **Dynamic Footer**
   - Fetches own data from API
   - Brand logo & award shield
   - Legal links (Terms, Privacy)
   - Social media icons
   - Corporate branding

## 📁 Project Structure

```
web/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── about-us/
│   │   │   │   ├── page.js          # About Us page
│   │   │   │   └── error.jsx
│   │   │   ├── destination-management/
│   │   │   │   ├── page.jsx         # DMC page
│   │   │   │   └── error.jsx
│   │   │   └── layout.js            # Locale layout
│   │   ├── layout.js                 # Root layout
│   │   ├── page.js                   # Root redirect
│   │   ├── providers.js              # Client providers
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── about-us/
│   │   │   ├── AboutUsContent.js
│   │   │   ├── HeroSection.js
│   │   │   ├── FeaturedCards.js
│   │   │   ├── SectionRenderer.js
│   │   │   ├── CardGrid.js
│   │   │   ├── LogoSection.js
│   │   │   └── MarkdownText.js
│   │   ├── DMC/
│   │   │   ├── DMCHero.jsx
│   │   │   ├── FeaturedCards.jsx
│   │   │   ├── SectionsRenderer.jsx
│   │   │   └── AwardsSection.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── i18n/
│   │   │   └── LocaleHtmlUpdater.js
│   │   ├── layout/
│   │   │   ├── AppShell.js
│   │   │   ├── HeaderClient.jsx
│   │   │   └── Footer.js
│   │   └── navigation/
│   │       └── ServerLinkButton.js
│   │
│   ├── services/
│   │   ├── aboutUsService.js        # About Us API fetch
│   │   └── dmcService.js            # DMC API fetch
│   │
│   ├── stores/
│   │   ├── aboutUsStore.js          # MobX store
│   │   └── AboutUsStoreProvider.js
│   │
│   ├── theme/
│   │   ├── theme.js                 # MUI theme config
│   │   └── ThemeRegistry.js         # Emotion cache + RTL
│   │
│   └── utils/
│       ├── i18n.js                  # Locale utilities
│       ├── strapi.js                # Strapi image helper
│       ├── normalizeAboutUs.js      # About Us data normalization
│       └── normalizeDmc.js          # DMC data normalization
│
├── middleware.js                     # Locale detection & headers
├── next.config.mjs                   # Next.js config
├── package.json
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
cd MultilingualStaticWebsite/web

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file (optional - API URLs are hardcoded for now):

```env
# Strapi API Base URL (currently hardcoded in services)
NEXT_PUBLIC_API_URL=https://alm-biz-web-strapi-dev.almosafer.com
```

### Image Domains

Configured in `next.config.mjs`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "alm-biz-assets-dev.almosafer.com",
    },
    {
      protocol: "https",
      hostname: "alm-biz-web-strapi-dev.almosafer.com",
    },
  ],
}
```

## 📡 API Endpoints

### About Us
```
GET https://alm-biz-web-strapi-dev.almosafer.com/api/about-us
  ?locale={locale}
  &populate[]=meta,hero.image,featuredCard.cards,featuredCard.cards.image,
             sections,sections.logos.image,sections.cards,sections.cards.image,
             awards,footerLinks.links,socialMedia.logo,staticLinks,corpLogo,
             links.logo,links.childLinks.logo,brandLogo,copyrightText,awardShield,ogImage
```

### DMC
```
GET https://alm-biz-web-strapi-dev.almosafer.com/api/ds-dmc
  ?locale={locale}
  &populate[]=meta,hero.image,featuredCard.cards,featuredCard.cards.image,
             sections,sections.cardSection,sections.cardSection.cards,
             sections.cardSection.cards.image,sections.image
```

## 🌍 Multilingual Support

### Supported Locales
- **English:** `/en/...`
- **Arabic:** `/ar/...` (RTL layout)

### Locale Detection
1. Middleware extracts locale from URL path
2. Sets `x-locale` and `x-dir` headers
3. Root layout reads headers for `lang` and `dir`
4. Theme dynamically applies RTL styles

### Adding New Locales

1. Update `src/utils/i18n.js`:
```javascript
export const SUPPORTED_LOCALES = ["en", "ar", "fr"]; // Add 'fr'

export function getDirection(locale) {
  if (locale === "ar") return "rtl";
  return "ltr";
}
```

2. Middleware automatically handles new locales

## 🎨 Styling & Theming

### Material UI Theme
- Custom theme in `src/theme/theme.js`
- Dynamic RTL/LTR direction
- Global typography alignment
- Emotion cache with RTL plugin

### RTL Support
- Uses `stylis-plugin-rtl` for CSS transformation
- Logical properties (`margin-inline-start`, `text-align: start`)
- Dynamic gradients for hero sections
- Automatic text direction inheritance

## 🧩 Key Architectural Decisions

### 1. Server-Side Rendering (SSR)
- All pages use `export const dynamic = "force-dynamic"`
- Data fetched in server components
- No client-side useEffect fetching
- Full HTML in initial response

### 2. Client/Server Component Boundaries
- **Server Components:** Pages, layouts, data fetching, main content
- **Client Components:** Interactive UI (header, forms, MobX observers)
- Clean separation prevents "Functions cannot be passed to Client Components" errors

### 3. Navigation Strategy
- Uses plain `<a>` tags for full document reloads
- Ensures true SSR verification in DevTools
- Preserves locale across navigation
- Client component for dynamic locale switching

### 4. Image Handling
- Next.js Image with `fill` layout
- Full-width hero: `width: "100vw"` with negative margins
- Strapi image normalization helper
- Handles both single images and image arrays

### 5. Data Normalization
- Raw API responses normalized in `utils/normalize*.js`
- Consistent data structure across components
- Handles missing/optional fields gracefully
- Supports nested Strapi relationships

### 6. MobX Usage
- **UI state only** (menus, toggles, client interactions)
- **NOT used for initial page data** (SSR handles this)
- Store hydration only when needed
- Observer pattern for reactive components

## 📦 Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build production bundle
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables on Vercel
- None required (API URLs are hardcoded)
- Optionally add `NEXT_PUBLIC_API_URL` if you want to make URLs configurable

## 🐛 Troubleshooting

### "Functions cannot be passed to Client Components"
- Ensure MUI components with `component={Link}` are in client components
- Use `ServerLinkButton` wrapper for server components

### White Screen / CSR-like Behavior
- Check `export const dynamic = "force-dynamic"` in pages
- Verify fetch uses `cache: "no-store"`
- Remove Suspense boundaries causing streaming

### RTL Not Working
- Verify middleware sets `x-dir` header
- Check `ThemeRegistry` uses correct cache for direction
- Ensure components use logical CSS properties

### Images Not Loading
- Add domain to `next.config.mjs` `remotePatterns`
- Check image URL structure from Strapi
- Verify `getStrapiImage()` handles both object and array formats

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

## 📝 License

This project is proprietary and confidential.

## 🤝 Contributing

Internal project - contact the development team for contribution guidelines.

---

**Built with for Discover Saudi**

For questions or support, contact the development team.
