export interface User {
    id: number;
    email: string;
    password: string;
    role: string;
    created_at: Date;
}

export interface Category {
    id: number;
    name: string;
}

export interface Book {
    id: number;
    categoryid: Category["id"];
    title: string;
    author: string;
    price: number;
    created_at: Date;
}
