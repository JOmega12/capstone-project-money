
export type UserInformation = { 
    id?: number,
    username: string,
    password: string,
}

export type Transaction = {
    id: number;
    userId?: number | undefined;
    transactionName: string;
    transactionAmount: number;
    transactionType?: string;
    category?: number | undefined;
    createdAt?: string;
}



export type Budget_categories = {
    id: number;
    name: string;
    is_custom: boolean;
    transactions: [] | undefined;
}