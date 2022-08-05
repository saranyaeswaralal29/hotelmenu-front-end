import axios from "axios";

const MENU_API_BASE_URL = "http://localhost:8080";

class MenuService {

    getMenus() {
        return axios.get(MENU_API_BASE_URL);
    }

    createMenu(menu) {
        return axios.post(MENU_API_BASE_URL, menu);
    }

    getMenuById(menuId) {
        return axios.get(MENU_API_BASE_URL+'/'+menuId);
    }

    updateMenu(menuId, menu) {
        return axios.put(MENU_API_BASE_URL+'/'+menuId,menu);
    }

    deleteMenu(menuId) {
        return axios.delete(MENU_API_BASE_URL+'/'+menuId);
    }
}

export default new MenuService()