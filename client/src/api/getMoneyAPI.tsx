// import { IncomeAndExpenseType } from "../types/types";
import { ExpenseType, IncomeType } from "../types/types";
import { config_json } from "./config"


export const getMoney = () => {
    return fetch(config_json.baseUrl + '/incomes').then((res) => {
        return res.json();
    })
}


export const createNewIncomeAPI = ({incomeName, totalIncomeAmount, incomeDate}: IncomeType) => {
    fetch(config_json.baseUrl + "/incomes", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({incomeName, totalIncomeAmount, incomeDate})
    })
}


export const createNewExpenseAPI = ({expenseName, totalExpenseAmount, expenseDate}: ExpenseType) => {
    fetch(config_json.baseUrl + "/incomes", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({expenseName, totalExpenseAmount, expenseDate})
    })
}