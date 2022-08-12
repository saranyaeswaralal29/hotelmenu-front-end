import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080";

class OrderService {

    createOrder(order) {
        return axios.post(ORDER_API_BASE_URL+'/order', order);
    }
}
export default new OrderService() 