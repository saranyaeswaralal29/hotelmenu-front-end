import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080";

class OrderService {

    createOrder(order) {
        return axios.post(process.env.REACT_APP_SERVER_API_URL+'/order', order);
    }
}
export default new OrderService() 