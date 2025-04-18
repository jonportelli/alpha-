# AP-1 Implementation Plan

## Migration from HTML/CSS to Next.js with TypeScript and Tailwind

### Phase 1: Project Setup & Initial Migration

#### Week 1: Environment Setup

1. **Initialize Next.js Project**
   ```bash
   npx create-next-app@latest ap1-nextjs --typescript --tailwind --eslint --app
   cd ap1-nextjs
   ```

2. **Configure Tailwind with Custom Theme**
   ```typescript
   // tailwind.config.ts
   export default {
     theme: {
       extend: {
         colors: {
           'ag-green': '#24a43a',
           'ag-dark': '#1a2e34',
           'ag-light': '#f9f9f9',
         },
         fontFamily: {
           'newsreader': ['"Newsreader"', 'serif'],
           'sans': ['Inter', 'sans-serif']
         }
       }
     },
   }
   ```

3. **Set up Project Structure**
   ```
   /app
     /api
     /(routes)
   /components
     /ui
     /layout
     /features
   /lib
   /public
   ```

4. **Install Essential Dependencies**
   ```bash
   npm install zustand @supabase/supabase-js react-hook-form zod @cloudinary/react @cloudinary/url-gen
   ```

#### Week 2: Component Architecture

1. **Create Base UI Components**
   - Button (Primary, Secondary, Outline)
   - Logo
   - Card
   - Navigation Link
   - Input fields

2. **Layout Components**
   - Header (desktop & mobile)
   - Footer
   - Page Container

3. **Asset Migration**
   - Move fonts to Next.js font system
   - Set up image optimization pipeline

### Phase 2: Page & Component Migration

#### Week 3-4: Core Pages

1. **Home Page**
   - Hero section
   - Features grid
   - Testimonials
   - Blog preview

2. **Shop Page**
   - Product grid
   - Filtering components
   - Shopping cart

3. **Blog Page**
   - Article listing
   - Category filters
   - Featured article

4. **Product Detail Page**
   - Image gallery
   - Product information
   - Add to cart functionality

### Phase 3: Backend Integration

#### Week 5-6: Supabase Setup

1. **Initialize Supabase Project**
   ```bash
   # Set up Supabase project in dashboard
   npm install @supabase/supabase-js
   ```

2. **Create Supabase Client**
   ```typescript
   // lib/supabase/client.ts
   import { createClient } from '@supabase/supabase-js'
   
   export const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )
   ```

3. **Database Schema Setup**
   ```sql
   -- Create products table
   CREATE TABLE products (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     description TEXT,
     price DECIMAL(10, 2) NOT NULL,
     images JSONB,
     category_id UUID REFERENCES categories(id),
     stock INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Create other necessary tables
   ```

#### Week 7-8: Cloudinary Integration

1. **Set up Cloudinary Account**
   - Create transformation presets
   - Configure upload presets

2. **Implement Image Component**
   ```tsx
   // components/ui/OptimizedImage.tsx
   import { CldImage } from '@cloudinary/next-cloudinary';
   
   export function OptimizedImage({ 
     src, 
     alt, 
     width, 
     height, 
     ...props 
   }) {
     return (
       <CldImage
         src={src}
         alt={alt}
         width={width}
         height={height}
         {...props}
       />
     );
   }
   ```

3. **Migrate Existing Images**
   - Script to upload images to Cloudinary
   - Update references in database

### Phase 4: E-commerce Functionality

#### Week 9-10: Cart & Checkout

1. **Shopping Cart State**
   ```typescript
   // stores/cartStore.ts
   import { create } from 'zustand';
   import { persist } from 'zustand/middleware';
   
   type CartItem = {
     id: string;
     name: string;
     price: number;
     quantity: number;
     image: string;
   };
   
   type CartStore = {
     items: CartItem[];
     addItem: (item: CartItem) => void;
     removeItem: (id: string) => void;
     updateQuantity: (id: string, quantity: number) => void;
     clearCart: () => void;
     total: () => number;
   };
   
   export const useCartStore = create<CartStore>()(
     persist(
       (set, get) => ({
         items: [],
         addItem: (item) => {
           const items = get().items;
           const existingItem = items.find((i) => i.id === item.id);
           
           if (existingItem) {
             set({
               items: items.map((i) => 
                 i.id === item.id 
                   ? { ...i, quantity: i.quantity + 1 } 
                   : i
               ),
             });
           } else {
             set({ items: [...items, { ...item, quantity: 1 }] });
           }
         },
         removeItem: (id) => {
           set({ items: get().items.filter((item) => item.id !== id) });
         },
         updateQuantity: (id, quantity) => {
           set({
             items: get().items.map((item) =>
               item.id === id ? { ...item, quantity } : item
             ),
           });
         },
         clearCart: () => set({ items: [] }),
         total: () => {
           return get().items.reduce(
             (total, item) => total + item.price * item.quantity,
             0
           );
         },
       }),
       {
         name: 'cart-storage',
       }
     )
   );
   ```

2. **Checkout Form with React Hook Form**
   ```tsx
   // components/features/checkout/CheckoutForm.tsx
   import { useForm } from 'react-hook-form';
   import { zodResolver } from '@hookform/resolvers/zod';
   import { z } from 'zod';
   
   const checkoutSchema = z.object({
     firstName: z.string().min(2),
     lastName: z.string().min(2),
     email: z.string().email(),
     address: z.string().min(5),
     city: z.string().min(2),
     // Additional fields
   });
   
   type CheckoutFormData = z.infer<typeof checkoutSchema>;
   
   export function CheckoutForm() {
     const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
       resolver: zodResolver(checkoutSchema)
     });
     
     const onSubmit = async (data: CheckoutFormData) => {
       // Process checkout
     };
     
     return (
       <form onSubmit={handleSubmit(onSubmit)}>
         {/* Form fields */}
       </form>
     );
   }
   ```

### Phase 5: Testing & Optimization

#### Week 11-12: Performance Optimization

1. **Set up Analytics & Monitoring**
   - Implement Core Web Vitals monitoring
   - Set up error tracking

2. **Image Optimization**
   - Implement responsive images
   - Configure proper loading strategies

3. **Code Splitting & Lazy Loading**
   - Implement dynamic imports for heavy components
   - Set up route-based code splitting

### Phase 6: Deployment

#### Week 13: Vercel Deployment

1. **Configure Vercel Project**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set up Environment Variables**
   - Supabase credentials
   - Cloudinary credentials
   - Other API keys

3. **Deploy Production Build**
   ```bash
   vercel --prod
   ```

## Key Implementation Details

### Converting CSS to Tailwind

1. **Identify Common Patterns**
   - Button styles
   - Card layouts
   - Typography classes

2. **Create Utility Patterns**
   ```tsx
   // components/ui/Button.tsx
   export function Button({ variant = 'primary', className, ...props }) {
     const baseClasses = 'px-6 py-3 rounded-full font-medium transition-all inline-flex items-center justify-center';
     
     const variantClasses = {
       primary: 'bg-ag-green text-white hover:bg-ag-green/90',
       secondary: 'border-2 border-white text-white hover:bg-white/10',
       outline: 'border-2 border-ag-dark text-ag-dark hover:bg-ag-dark/5',
     };
     
     return (
       <button 
         className={`${baseClasses} ${variantClasses[variant]} ${className}`} 
         {...props} 
       />
     );
   }
   ```

### Data Fetching Strategy

1. **Server Components for Initial Data**
   ```tsx
   // app/shop/page.tsx
   import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
   
   export default async function ShopPage() {
     const supabase = createServerComponentClient({ cookies });
     const { data: products } = await supabase.from('products').select('*');
     
     return (
       <div>
         <ProductGrid initialProducts={products} />
       </div>
     );
   }
   ```

2. **Client Components for Interactive Features**
   ```tsx
   // components/features/shop/ProductFilters.tsx
   'use client'
   
   import { useState } from 'react';
   import { useRouter, useSearchParams } from 'next/navigation';
   
   export function ProductFilters() {
     const router = useRouter();
     const searchParams = useSearchParams();
     const [category, setCategory] = useState(searchParams.get('category') || '');
     
     // Filter implementation
   }
   ```

### Responsive Design Implementation

1. **Mobile-First Approach**
   ```tsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
     {/* Product cards */}
   </div>
   ```

2. **Custom Breakpoint Utilities**
   ```typescript
   // tailwind.config.ts
   export default {
     theme: {
       screens: {
         'sm': '640px',
         'md': '768px',
         'lg': '1024px',
         'xl': '1280px',
         '2xl': '1536px',
       },
     },
   }
   ``` 