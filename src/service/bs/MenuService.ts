import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class MenuService {
	async getMenuList(json?:any) { // 메뉴 리스트 [BS_MENU]
		const res = await jsonApi('/bo/bs/getMenuList', json ? json : {});
		return res.data;
	}
	async getMenu(json?:any) { // 메뉴 상세조회 [BS_MENU]
		const res = await jsonApi('/bo/bs/getMenu', json ? json : {});
		return res.data;
	}
	async setMenuList(json?:any) { // 메뉴 리스트등록 [BS_MENU]
		const res = await jsonApi('/bo/bs/setMenuList', json ? json : {});
		return res.data;
	}
	async insertMenu(formData:FormData) { // 메뉴 등록 [BS_MENU]
		const res = await formApi('/bo/bs/insertMenu', formData);
		return res.data;
	}
	async updateMenu(formData:FormData) { // 메뉴 수정 [BS_MENU]
		const res = await formApi('/bo/bs/updateMenu', formData);
		return res.data;
	}
	async deleteMenu(formData:FormData) { // 메뉴 삭제 [BS_MENU]
		const res = await formApi('/bo/bs/getMenuList', formData);
		return res.data;
	}
}
export default new MenuService();

