import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class FaqService {
	async getFaqList(json?:any) { // FAQ 리스트 [CS_FAQ]
		const res = await jsonApi('/bo/cs/getFaqList', json ? json : {});
		return res.data;
	}
	async getFaq(json?:any) { // FAQ 상세조회 [CS_FAQ]
		const res = await jsonApi('/bo/cs/getFaq', json ? json : {});
		return res.data;
	}
	async setFaqList(json?:any) { // FAQ 리스트등록 [CS_FAQ]
		const res = await jsonApi('/bo/cs/setFaqList', json ? json : {});
		return res.data;
	}
	async insertFaq(formData:FormData) { // FAQ 등록 [CS_FAQ]
		const res = await formApi('/bo/cs/insertFaq', formData);
		return res.data;
	}
	async updateFaq(formData:FormData) { // FAQ 수정 [CS_FAQ]
		const res = await formApi('/bo/cs/updateFaq', formData);
		return res.data;
	}
	async deleteFaq(formData:FormData) { // FAQ 삭제 [CS_FAQ]
		const res = await formApi('/bo/cs/getFaqList', formData);
		return res.data;
	}
}
export default new FaqService();

