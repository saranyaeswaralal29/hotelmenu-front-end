import axios from "axios";

const LOGIN_API_BASE_URL = "http://localhost:8080";

class LoginService {
    loginApi(user) {
        return axios.post(process.env.REACT_APP_SERVER_API_URL+'/login', user);
    }
}
export default new LoginService()