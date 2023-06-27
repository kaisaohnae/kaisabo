import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class PopupService {
	async getPopupList(json?:any) { // 팝업 리스트 [CS_POP]
		const res = await jsonApi('/bo/cs/getPopupList', json ? json : {});
		return res.data;
	}
	async getPopup(json?:any) { // 팝업 상세조회 [CS_POP]
		const res = await jsonApi('/bo/cs/getPopup', json ? json : {});
		return res.data;
	}
	async setPopupList(json?:any) { // 팝업 리스트등록 [CS_POP]
		const res = await jsonApi('/bo/cs/setPopupList', json ? json : {});
		return res.data;
	}
	async insertPopup(formData:FormData) { // 팝업 등록 [CS_POP]
		const res = await formApi('/bo/cs/insertPopup', formData);
		return res.data;
	}
	async updatePopup(formData:FormData) { // 팝업 수정 [CS_POP]
		const res = await formApi('/bo/cs/updatePopup', formData);
		return res.data;
	}
	async deletePopup(formData:FormData) { // 팝업 삭제 [CS_POP]
		const res = await formApi('/bo/cs/getPopupList', formData);
		return res.data;
	}
}
export default new PopupService();

