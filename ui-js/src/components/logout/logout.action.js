import { logoutRequest } from '../../services/Api';
export const LOGOUT = 'LOGOUT';

export const logout = () => {
    logoutRequest();
    return {
        type: LOGOUT,
    }
}
