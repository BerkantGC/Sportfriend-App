import initialToken from "./initialToken";

export default function addUser(state = initialToken, action) {
    switch (action.type){
        case "USER_ADD":
            return {userToken: action.payload.token, username: action.payload.username};
        default:
            return state;
            break;
    }
}