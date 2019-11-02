import { logout } from "../helper-methods";

export const handleErrorIfAvailable = httpResponse => {
    switch(httpResponse.status) {
        case 401: {
            // Token expired
            logout();
        }
    }
} 