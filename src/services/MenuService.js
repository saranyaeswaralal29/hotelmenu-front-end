import axios from "axios";

const MENU_API_BASE_URL = "http://localhost:8080";

class MenuService {

    getMenus() {
        return axios.get(MENU_API_BASE_URL);
    }

    getMenusForCategory(name) {
        return axios.get(MENU_API_BASE_URL,{ params: { categoryName: name } });
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
        return authHeader.post(MENU_API_BASE_URL+'/admin', menu);
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
       return authHeader.get(MENU_API_BASE_URL+'/'+menuId);
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
        return authHeader.put(MENU_API_BASE_URL+'/admin/'+menuId,menu);
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
        return authHeader.delete(MENU_API_BASE_URL+'/admin/'+menuId);
    }

    getCategories() {
        return axios.get(MENU_API_BASE_URL+'/category');
    }
}

export default new MenuService()