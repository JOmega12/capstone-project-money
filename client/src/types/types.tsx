
export type UserInformation = { 
    id?: number,
    username: string,
    password: string,
}



export type IncomeAndExpenseType  = {
    id?: number;
    incomeName: string;
    totalIncomeAmount: number;
    incomeDate: string;
    expenseName : string;
    totalExpenseAmount: number;
    expenseDate: string
}