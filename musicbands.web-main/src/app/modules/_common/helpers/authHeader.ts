import {authQuery} from "../../auth/stores/auth";

export const authHeader = () => {
    const token = authQuery.getToken();

    if (token) {
        return {
            'Authorization': 'Bearer ' + token
        };
    } else {
        return {};
    }
}