// Shared TypeScript types

export interface Post {
    id: number
    title: string
    author: string
    date: string
    content?: string
    excerpt?: string
    views: number
}

export interface User {
    id: number
    email: string
    name: string
}
