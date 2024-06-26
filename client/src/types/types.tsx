
export type UserInformation = { 
    id?: number,
    username: string,
    password: string,
}


export type IncomeType  = {
    id?: number;
    incomeName: string;
    totalIncomeAmount: number;
    incomeDate?: string;

}

export type ExpenseType = {
    id?: number;
    expenseName : string;
    totalExpenseAmount: number;
    expenseDate?: string
}

export type IncomeAndExpenseType = IncomeType & ExpenseType;