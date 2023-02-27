import axios from 'axios';

const login = async (email, password) => {
    try {
        const { data } = await axios.post(`/auth`, { email, password })
        axios.defaults.headers.Authorization = `Bearer ${data.token}`;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    } catch (error) {
        console.log(error);
    }
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.Authorization;
}

const isTokenExpired = (token) => {
    const decode = JSON.parse(atob(token.split('.')[1]))
    if (decode.exp * 1000 < new Date().getTime()) {
        console.log('token expired')
        logout();
        return true;
    } else {
        return false;
    }
}

export default { login, logout, isTokenExpired };