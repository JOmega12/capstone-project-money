// import { IncomeAndExpenseType } from "../types/types";
import { useAuth } from "../providers/AuthProvider";
import { Transaction } from "../types/types";
import { config_json } from "./config"


export const getMoney = () => {
    return fetch(config_json.baseUrl + '/transaction').then((res) => {
        return res.json();
    })
}

export const createTransactionAPI = ({transactionName, transactionAmount, createdAt}: Transaction) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useAuth();

    if(!user) {
        throw new Error ("user is not logged in getMoneyAPI ")
    }

    return fetch(config_json.baseUrl + "/transaction", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({transactionName, transactionAmount, createdAt, userId: user.id})
    })
}

export const patchTransactionSection = async (transaction: Transaction)=> {

    try {
        const response = await fetch(`${config_json.baseUrl}/transaction/${transaction.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                transactionName: transaction.transactionName,
                transactionAmount: transaction.transactionAmount,
                createdAt: transaction.createdAt
            })
        });

        if(!response.ok) {
            const errorText = await response.text();
            throw new Error (`Error: ${response.status}${response.statusText} - ${errorText}`)
        }
        return response.json();
    }catch(error){
        console.error("Failed to patch transaction section", error)
        throw error
    }

}

export const deleteTransactionSection= async(id: number) => {
    return fetch(config_json.baseUrl + "/transaction/" + id, {
        method: "DELETE",
    }).then((res) => {
        if(!res.ok) {
            throw new Error("Failed to delete Income Section in API")
        }
        return res;
    })
}

