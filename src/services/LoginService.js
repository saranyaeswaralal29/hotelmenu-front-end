import axios from "axios";

const LOGIN_API_BASE_URL = "http://localhost:8080";

class LoginService {
    loginApi(user) {
        return axios.post('/login', user);
    }
}
export default new LoginService()