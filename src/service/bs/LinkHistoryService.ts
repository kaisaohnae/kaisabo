import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class LinkHistoryService {
	async getLinkHistoryList(json?:any) { // 연동이력 리스트 [BS_LINK_HIST]
		const res = await jsonApi('/bo/bs/getLinkHistoryList', json ? json : {});
		return res.data;
	}
	async getLinkHistory(json?:any) { // 연동이력 상세조회 [BS_LINK_HIST]
		const res = await jsonApi('/bo/bs/getLinkHistory', json ? json : {});
		return res.data;
	}
	async setLinkHistoryList(json?:any) { // 연동이력 리스트등록 [BS_LINK_HIST]
		const res = await jsonApi('/bo/bs/setLinkHistoryList', json ? json : {});
		return res.data;
	}
	async insertLinkHistory(formData:FormData) { // 연동이력 등록 [BS_LINK_HIST]
		const res = await formApi('/bo/bs/insertLinkHistory', formData);
		return res.data;
	}
	async updateLinkHistory(formData:FormData) { // 연동이력 수정 [BS_LINK_HIST]
		const res = await formApi('/bo/bs/updateLinkHistory', formData);
		return res.data;
	}
	async deleteLinkHistory(formData:FormData) { // 연동이력 삭제 [BS_LINK_HIST]
		const res = await formApi('/bo/bs/getLinkHistoryList', formData);
		return res.data;
	}
}
export default new LinkHistoryService();

