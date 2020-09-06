import apiUtil from '../utils/api';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
};

export default {
    async logIn(user) {
        try {
            const response = await apiUtil.post(buildUrl('/login_submit'), user);
            return response.data;
        } catch(err) {
            console.log(err)
        }
        
    },
    async logOut() {
        try {
            const response = await apiUtil.get(buildUrl('/logout'));
            return response.data;
        } catch (err) {
            console.log(err);
        }
    },
    async checkAuthentication () {
        try {
            const response = await apiUtil.get(buildUrl('/user')); // edited to use new user route
            return response.data
        } catch (err) {
            console.log(err)
        }
    },
    async getDataFacebook (accessToken) {
        try {
            const response = await apiUtil.post(buildUrl('/get_data_fb'), accessToken);
            return response.data
        } catch (err) {
            console.log(err)
        }
    },
    async logInWithFb (email) {
        try {
            const response = await apiUtil.post(buildUrl('/log_in_with_fb'), email);
            return response.data
        } catch (err) {
            console.log(err)
        }
    }

};