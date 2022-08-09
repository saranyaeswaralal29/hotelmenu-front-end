import axios from "axios";

const MENU_API_BASE_URL = "http://localhost:8080";

class MenuService {

    getMenus() {
        return axios.get(MENU_API_BASE_URL);
    }

    createMenu(menu) {
        return axios.post(MENU_API_BASE_URL+'/admin', menu);
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
        return axios.put(MENU_API_BASE_URL+'/admin/'+menuId,menu);
    }

    deleteMenu(menuId) {
        return axios.delete(MENU_API_BASE_URL+'/admin/'+menuId);
    }
}

export default new MenuService()