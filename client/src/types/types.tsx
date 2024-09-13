
export type UserInformation = { 
    id?: number,
    username: string,
    password: string,
}

export type Transaction = {
    id?: number;
    userId: number | undefined;
    transactionName: string;
    transactionAmount: number;
    transactionType?: string;
    createdAt?: string;
}



