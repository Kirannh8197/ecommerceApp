# E-commerce Application

## Overview

This is a full-stack e-commerce application built with React, Express, and PostgreSQL. It features a modern web interface with product management, shopping cart functionality, user authentication, and admin capabilities. The application uses Drizzle ORM for database operations and is built with TypeScript for type safety.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: Passport.js with local strategy and session-based auth
- **Session Storage**: Express sessions with PostgreSQL store
- **API**: RESTful API design with JSON responses

### Database Architecture
- **Database**: PostgreSQL with Drizzle ORM
- **Schema**: Defined in shared TypeScript files for type safety
- **Tables**: Users, Products, Cart Items, Orders, Order Items
- **Migrations**: Managed through Drizzle Kit

## Key Components

### Authentication System
- Session-based authentication using Passport.js
- Password hashing with Node.js crypto (scrypt)
- Role-based access control (customer/admin)
- Protected routes on both frontend and backend

### Product Management
- CRUD operations for products (admin only)
- Product search functionality
- Category-based organization
- Stock management
- Image URL support

### Shopping Cart
- Add/remove items from cart
- Quantity management
- Real-time cart updates
- Cart persistence across sessions

### Order Management
- Order creation from cart items
- Order status tracking
- Order history for users
- Order management for admins

### User Interface
- Responsive design with mobile support
- Dark/light theme support via CSS variables
- Toast notifications for user feedback
- Modal dialogs for forms
- Navigation drawer for cart

## Data Flow

1. **Authentication Flow**: User logs in → Passport validates credentials → Session created → User data cached in React Query
2. **Product Flow**: Products fetched via API → Cached in React Query → Displayed in product grid → Search updates query
3. **Cart Flow**: Add to cart → API call → Cache invalidation → UI updates → Cart drawer shows changes
4. **Order Flow**: Checkout → Cart items converted to order → Cart cleared → Order confirmation

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Data Fetching**: TanStack Query for server state management
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Utilities**: clsx for conditional classes, date-fns for date formatting

### Backend Dependencies
- **Server**: Express.js with middleware for JSON parsing, sessions
- **Authentication**: Passport.js with local strategy
- **Database**: Drizzle ORM with PostgreSQL driver (@neondatabase/serverless)
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod schemas shared between frontend and backend

### Development Dependencies
- **Build Tools**: Vite with React plugin, esbuild for server bundling
- **TypeScript**: Full TypeScript support across the stack
- **Database Tools**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Development Environment
- Vite development server for frontend with HMR
- tsx for running TypeScript server code directly
- Shared schema validation between client and server
- Replit-specific optimizations and error handling

### Production Build
- Frontend: Vite builds static assets to dist/public
- Backend: esbuild bundles server code to dist/index.js
- Single deployment artifact with static file serving
- Environment variable configuration for database and sessions

### Database Setup
- PostgreSQL database with connection via DATABASE_URL
- Drizzle migrations in ./migrations directory
- Schema definitions in shared/schema.ts
- Session store integration with database

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout the stack, and a focus on developer experience and maintainability.