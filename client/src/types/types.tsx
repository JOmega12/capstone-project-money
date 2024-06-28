
export type UserInformation = { 
    id?: number,
    username: string,
    password: string,
}

export type Transaction = {
    id?: number;
    userId: number;
    transactionName: string;
    transactionAmount: number;
    createdAt?: string;
}





