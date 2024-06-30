// import { IncomeAndExpenseType } from "../types/types";
import { useAuth } from "../providers/AuthProvider";
import { Transaction } from "../types/types";
import { config_json } from "./config"


export const getMoney = (userId:number) => {
    return fetch(`${config_json.baseUrl}/transaction?userId=${userId}`).then((res) => {
        return res.json();
    })
}


// howto login postman and and how to show usedId in transaction
// how to patch 

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

// Partial or an Omit 
export const patchTransactionSection = async (transaction: Transaction) => {
    
    const { transactionName, transactionAmount, createdAt } = transaction;

    // !Need the schema from the backend 

    if(!transactionName.length || !transactionAmount) {
        throw new Error ("You need to have fields on the input")
    }

    const transactionUpdate = {
        transactionName,
        transactionAmount,
        createdAt
    }; 

    try {
        const response = await fetch(`${config_json.baseUrl}/transaction/${transaction.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transactionUpdate)
        });

        if(!response.ok) {
            const errorText = await response.text();
            throw new Error (`Error: ${response.status}${response.statusText} - ${errorText}`)
        }
        return response.json();
    } catch(error){
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

