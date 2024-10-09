
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
    category?: [];
    createdAt?: string;
}



export type Budget_categories = {
    id: number;
    userId: number | undefined;
    is_custom: boolean
}