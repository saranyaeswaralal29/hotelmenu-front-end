import axios from "axios";

class LoginService {
    loginApi(user) {
        return axios.post(process.env.REACT_APP_SERVER_API_URL+'/login', user);
    }
}
export default new LoginService()