import axios from "axios";

const MENU_API_BASE_URL = "http://localhost:8080";

class MenuService {

    getMenus() {
        console.log(process.env.REACT_APP_SERVER_API_URL);
        return axios.get(process.env.REACT_APP_SERVER_API_URL+"/menu");
    }

    getMenusForCategory(name) {
        return axios.get(process.env.REACT_APP_SERVER_API_URL+"/menu",{ params: { categoryName: name } });
    }

    createMenu(menu) {
        let authHeader = axios.create({
            headers: {
                Accept: '*/*',
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                withCredentials: true,
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        });
        return authHeader.post(process.env.REACT_APP_SERVER_API_URL+'/admin', menu);
    }

    getMenuById(menuId) {
        let authHeader = axios.create({
            headers: {
                Accept: '*/*',
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/x-www-form-urlencoded",
                withCredentials: true,
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        });
       return authHeader.get(process.env.REACT_APP_SERVER_API_URL+'/menu/'+menuId);
    }

    updateMenu(menuId, menu) {
        let authHeader = axios.create({
            headers: {
                Accept: '*/*',
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                withCredentials: true,
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        });
        return authHeader.put(process.env.REACT_APP_SERVER_API_URL+'/admin/'+menuId,menu);
    }

    deleteMenu(menuId) {
        let authHeader = axios.create({
            headers: {
                Accept: '*/*',
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                withCredentials: true,
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        });
        return authHeader.delete(process.env.REACT_APP_SERVER_API_URL+'/admin/'+menuId);
    }

    getCategories() {
        return axios.get(process.env.REACT_APP_SERVER_API_URL+'/category');
    }
}

export default new MenuService()