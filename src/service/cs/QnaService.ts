import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class QnaService {
	async getQnaList(json?:any) { // QNA 리스트 [CS_QNA]
		const res = await jsonApi('/bo/cs/getQnaList', json ? json : {});
		return res.data;
	}
	async getQna(json?:any) { // QNA 상세조회 [CS_QNA]
		const res = await jsonApi('/bo/cs/getQna', json ? json : {});
		return res.data;
	}
	async setQnaList(json?:any) { // QNA 리스트등록 [CS_QNA]
		const res = await jsonApi('/bo/cs/setQnaList', json ? json : {});
		return res.data;
	}
	async insertQna(formData:FormData) { // QNA 등록 [CS_QNA]
		const res = await formApi('/bo/cs/insertQna', formData);
		return res.data;
	}
	async updateQna(formData:FormData) { // QNA 수정 [CS_QNA]
		const res = await formApi('/bo/cs/updateQna', formData);
		return res.data;
	}
	async deleteQna(formData:FormData) { // QNA 삭제 [CS_QNA]
		const res = await formApi('/bo/cs/getQnaList', formData);
		return res.data;
	}
}
export default new QnaService();

