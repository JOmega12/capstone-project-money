import { UserInformation } from "../types/types";
import { config_json } from "./config";



// login
export const getUserFromServer = ({username}:UserInformation) => {
    return fetch(config_json.baseUrl + "/users/login/")
    .then((res) => {
        if(!res.ok) {
            throw new Error('Could not get User from getUserServer()')
        }
        return res.json()
    })
    .then((users) => users.find((user: UserInformation) => {
        console.log(user, 'test')
        return user.username === username
    }))
    .then((user) => {
        if(!user) {
            throw new Error ('user not found post find ')
        }
        return user
    })
}

// Signup
export const registerFetch = ({username, password}: UserInformation) => {
return fetch(config_json.baseUrl + "/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username,password}),
    }).then((user) => {
        if(!user.ok) {
            throw new Error("User Registration failed at API registerFetch()")
        }
        return user.json();
    })
}

