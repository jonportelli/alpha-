# AP-1 Product Requirements Document
## Migration from HTML/CSS to Next.js with TypeScript and Tailwind CSS

### Product Overview
AP-1 is a health supplement brand with an existing website built in HTML/CSS. The project aims to migrate the website to a modern stack using Next.js, TypeScript, and Tailwind CSS, while integrating Supabase for backend functionality and Cloudinary for media management.

### Business Objectives
- Improve website performance and user experience
- Establish a scalable architecture for future feature development
- Enable e-commerce functionality with a reliable backend
- Optimize image delivery and management
- Increase site responsiveness across devices
- Streamline deployment and hosting through Vercel

### Technical Stack
- **Frontend**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Media Management**: Cloudinary
- **Hosting**: Vercel
- **State Management**: Zustand/Jotai
- **Form Handling**: React Hook Form + Zod

### Migration Process

#### Phase 1: Project Setup & Component Architecture (Weeks 1-2)
1. **Initial Project Setup**
   - Initialize Next.js project with TypeScript
   - Configure Tailwind CSS with custom theme variables
   - Set up ESLint, Prettier, and Husky for code quality
   - Establish folder structure following Next.js best practices

2. **Component Architecture**
   - Create atomic design structure (atoms, molecules, organisms, templates, pages)
   - Implement layout components and shared UI elements
   - Set up responsive design system with Tailwind breakpoints

3. **Style Migration Strategy**
   - Convert existing CSS variables to Tailwind theme extensions
   - Create Tailwind utility patterns for repeated style combinations
   - Set up global styles and typography system

#### Phase 2: Page & Component Migration (Weeks 3-5)
1. **Header & Navigation Implementation**
   - Develop responsive header with mobile navigation
   - Set up navigation context and state management
   - Implement currency selector component

2. **Core Page Migration**
   - Home page implementation
   - Shop page with product grid
   - Blog page with article listings
   - Product detail pages
   - Article detail pages

3. **UI Components**
   - Product cards
   - Blog post cards
   - Newsletter signup
   - Shopping cart
   - Checkout flow

#### Phase 3: Backend Integration (Weeks 6-8)
1. **Supabase Setup**
   - Database schema design for products, orders, customers, blog posts
   - Authentication system setup
   - API routes implementation
   - Role-based access control

2. **Cloudinary Integration**
   - Set up Cloudinary account and configuration
   - Implement image upload and optimization pipeline
   - Create image transformation presets for different use cases
   - Migrate existing images to Cloudinary

3. **State Management & Data Flow**
   - Implement data fetching with SWR or React Query
   - Set up global state management for cart and user preferences
   - Create data models and type interfaces

#### Phase 4: E-commerce Functionality (Weeks 9-10)
1. **Cart & Checkout**
   - Implement cart functionality with local storage sync
   - Build checkout process with form validation
   - Order submission and confirmation flow
   - Set up payment processing integration

2. **User Accounts**
   - Profile management
   - Order history
   - Saved payment methods
   - Address book

3. **Product Management**
   - Product filtering and search
   - Category navigation
   - Product recommendations

#### Phase 5: Testing & Optimization (Weeks 11-12)
1. **Testing Implementation**
   - Unit testing with Jest/React Testing Library
   - End-to-end testing with Cypress
   - Performance testing and optimization

2. **SEO & Analytics**
   - Implement metadata and OpenGraph tags
   - Set up sitemap generation
   - Configure Google Analytics and conversion tracking

3. **Accessibility & Performance**
   - Ensure WCAG 2.1 AA compliance
   - Implement performance optimizations (image loading, code splitting)
   - Progressive Web App features

#### Phase 6: Deployment & Launch (Week 13)
1. **Deployment Pipeline**
   - Configure Vercel deployment settings
   - Set up CI/CD pipeline
   - Environment variables management

2. **Launch Preparation**
   - DNS configuration
   - SSL certificate setup
   - Redirect strategy for old URLs
   - 404 and error page handling

3. **Post-Launch**
   - Monitoring and analytics review
   - Performance optimization based on real-world data
   - User feedback collection

### Key Technical Requirements

#### Component Structure
```
/app
  /api
  /(routes)
    /page.tsx       # Home page
    /shop/page.tsx  # Shop page
    /blog/page.tsx  # Blog page
    /blog/[slug]/page.tsx # Article page
    /product/[id]/page.tsx # Product page
    /checkout/page.tsx # Checkout page
/components
  /ui               # Base UI components
  /layout           # Layout components
  /features         # Feature-specific components
/lib
  /utils            # Utility functions
  /hooks            # Custom hooks
  /supabase         # Supabase client and utilities
  /cloudinary       # Cloudinary utilities
/stores             # State management
/types              # TypeScript type definitions
/public             # Static assets
```

#### Database Schema (Supabase)
- **Products**: id, name, description, price, images, category, variants, stock
- **Orders**: id, user_id, status, total, items, shipping_address, payment_info
- **Users**: id, email, name, addresses, payment_methods
- **Blog**: id, title, content, author, published_date, category, tags, image
- **Categories**: id, name, slug, parent_id
- **Cart**: id, user_id, items, created_at, updated_at

#### Image Management (Cloudinary)
- Product images with different transformations (thumbnail, detail, zoom)
- Blog post images with responsive variants
- Lazy loading implementation for all images
- WebP/AVIF format delivery with fallbacks

#### Performance Targets
- Lighthouse score > 90 across all categories
- Core Web Vitals metrics within "Good" threshold
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Bundle size < 200KB (initial JS payload)

### Development Guidelines

#### Code Style & Patterns
- Follow Next.js App Router patterns for routing and data fetching
- Use TypeScript interfaces for all data models
- Implement proper error handling throughout the application
- Use Server Components where possible for improved performance
- Follow atomic design principles for component hierarchy

#### Tailwind Usage
- Extend theme with project-specific colors and typography
- Use Tailwind's @apply in CSS modules for complex components
- Create consistent spacing and sizing scales
- Leverage Tailwind's dark mode capabilities for future implementation

#### Testing Strategy
- Write unit tests for all utility functions
- Implement component tests for key UI elements
- Create end-to-end tests for critical user flows (checkout, account creation)
- Test across multiple devices and browsers

### Implementation Milestones

1. **Foundation (Week 2)**
   - Project structure established
   - Core layout components implemented
   - Theme configuration complete

2. **Core Pages (Week 5)**
   - All major pages migrated to Next.js components
   - Responsive design implemented
   - Navigation fully functional

3. **Backend Integration (Week 8)**
   - Supabase integration complete
   - Product data management functional
   - User authentication working

4. **E-commerce Features (Week 10)**
   - Shopping cart functional
   - Checkout process working
   - Order management implemented

5. **Testing & Optimization (Week 12)**
   - All tests passing
   - Performance optimizations implemented
   - Accessibility requirements met

6. **Launch (Week 13)**
   - Production deployment completed
   - Analytics and monitoring in place
   - Documentation finalized

### Success Criteria
- Website fully migrated to Next.js with all existing functionality
- Page load times improved by at least 40%
- Seamless user experience across devices
- Simplified content management through Supabase
- Optimized image delivery through Cloudinary
- Scalable architecture for future feature development

### Future Enhancements (Post-Launch)
- Internationalization support
- Enhanced product filtering and search functionality
- Customer reviews and ratings
- Personalized product recommendations
- Email marketing integration
- Subscription-based purchasing options 