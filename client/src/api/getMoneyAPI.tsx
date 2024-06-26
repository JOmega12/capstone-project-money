// import { IncomeAndExpenseType } from "../types/types";
import { ExpenseType, IncomeType } from "../types/types";
import { config_json } from "./config"


export const getMoney = () => {
    return fetch(config_json.baseUrl + '/incomes').then((res) => {
        return res.json();
    })
}


export const createNewIncomeAPI = ({incomeName, totalIncomeAmount, incomeDate}: IncomeType) => {
    return fetch(config_json.baseUrl + "/incomes", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({incomeName, totalIncomeAmount, incomeDate})
    })
}

// !need to QA if this makes sense with the current json file or make a new 
export const patchIncomeSection = (income: IncomeType)=> {
    return fetch(`${config_json.baseUrl}/incomes/${income.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            incomeName: income.incomeName,
            totalIncomeAmount: income.totalIncomeAmount
        })
    })
}

export const deleteIncomeSection= async(id: number) => {
    return fetch(config_json.baseUrl + "/incomes/" + id, {
        method: "DELETE",
    }).then((res) => {
        if(!res.ok) {
            throw new Error("Failed to delete Income Section in API")
        }
        return res;
    })
}

export const createNewExpenseAPI = ({expenseName, totalExpenseAmount, expenseDate}: ExpenseType) => {
   return fetch(config_json.baseUrl + "/incomes", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({expenseName, totalExpenseAmount, expenseDate})
    })
}


export const patchExpenseSection = (expense: ExpenseType) => {
    return fetch(`${config_json.baseUrl}/incomes/${expense.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            expenseName: expense.expenseName,
            totalExpenseAmount: expense.totalExpenseAmount
        })
    })
}

export const deleteExpenseSection = async(id: number) => {
    return fetch(config_json.baseUrl + "/incomes/" + id, {
        method: "DELETE"
    }).then((res) => {
        if(!res.ok){
            throw new Error ("Failed to delete Expense section in API")
        }
        return res;
    })
}

