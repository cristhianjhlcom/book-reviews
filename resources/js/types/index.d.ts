import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Gender {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: number;
    book_isbn: string;
    comment: string;
    rating: number;
    created_at: string;
    updated_at: string;
}

export interface Book {
    isbn: string;
    title: string;
    description?: string;
    gender: Gender;
    reviews: Review[];
    rating: {
        count: number;
        average: number;
        total: number;
        stars: number;
        reviews: Review[];
    };
    created_at: string;
    updated_at: string;
    images: {
        original: string;
        large: string;
        medium: string;
        small: string;
        thumbnail: string;
    };
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    book: Book;
    books: Book[];
    booksCount: number;
    genders: Gender[];
    gendersCount: number;
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
