import axios from "axios";

class OrderService {

    createOrder(order) {
        return axios.post(process.env.REACT_APP_SERVER_API_URL+'/order', order);
    }
}
export default new OrderService() 