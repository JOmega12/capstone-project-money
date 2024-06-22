import { UserInformation } from "../types/types";
import { config_json } from "./config";




export const getUserFromServer = ({username}:UserInformation) => {
    return fetch(config_json.baseUrl + "/users")
    .then((res) => {
        if(!res.ok) {
            throw new Error('Could not get User from getUserServer()')
        }
        return res.json()
    })
    .then((users) => users.find((user: UserInformation) => user.username === username))
    .then((user) => {
        if(!user) {
            throw new Error ('user not found post find ')
        }
        return user
    })
}