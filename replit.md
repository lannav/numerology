# Overview

This is a numerology web application built with React and Express that provides comprehensive numerological readings and compatibility tests. The application calculates various numerological numbers (Life Path, Destiny, Soul Urge, etc.) based on user input and stores results locally in the browser. It features a mystical dark theme with multiple language support (English, Russian, Czech) and focuses on providing detailed interpretations of numerological calculations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with custom CSS variables for theming and a dark mode design
- **State Management**: React Context for language preferences, React Query for server state (minimal usage), and local component state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Server**: Express.js with TypeScript in ESM module format
- **Middleware**: Basic Express middleware for JSON parsing, URL encoding, and request logging
- **API Structure**: Minimal REST API with health check endpoint - core functionality is client-side
- **Development**: Vite integration for hot module replacement and development server

## Data Storage Solutions
- **Primary Storage**: Browser localStorage for all user data persistence
- **Database Setup**: Drizzle ORM configured with PostgreSQL (via Neon) but not actively used in current implementation
- **Storage Pattern**: Client-side storage with automatic cleanup (max 20 readings, 15 compatibility tests)

## Core Application Logic
- **Numerology Engine**: Custom JavaScript calculations for all numerological numbers including Life Path, Destiny, Soul Urge, Personality, Birthday, and Attitude numbers
- **Compatibility System**: Multi-type compatibility testing (Life Path, Name, Complete) with scoring algorithms
- **Interpretation System**: Comprehensive interpretation database with multilingual support
- **Validation**: Zod schemas for type safety across shared data structures

## Internationalization
- **Language Support**: English, Russian, and Czech with React Context-based language switching
- **Translation System**: Centralized translation keys with fallback to English
- **Storage**: Language preferences persisted in localStorage

# External Dependencies

## UI and Styling
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives for building the interface
- **tailwindcss**: Utility-first CSS framework for styling with custom configuration
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Icon library for consistent iconography

## Development and Build Tools
- **vite**: Fast build tool and development server with React plugin
- **@vitejs/plugin-react**: Vite plugin for React support
- **typescript**: Type checking and enhanced development experience
- **@replit/vite-plugin-***: Replit-specific development plugins for enhanced debugging

## Data and Validation
- **zod**: TypeScript-first schema validation library for form validation and data parsing
- **drizzle-orm**: TypeScript ORM configured for PostgreSQL (future database integration)
- **@neondatabase/serverless**: Serverless PostgreSQL driver for potential database operations

## Form Handling and State
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Zod resolver for React Hook Form integration
- **@tanstack/react-query**: Powerful data synchronization for React (minimal usage in current implementation)

## Utility Libraries
- **date-fns**: Modern JavaScript date utility library for date calculations
- **clsx**: Utility for constructing className strings conditionally
- **wouter**: Minimalist routing library for React applications