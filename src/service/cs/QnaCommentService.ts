import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class QnaCommentService {
	async getQnaCommentList(json?:any) { // QNA 댓글 리스트 [CS_QNA_CMMT]
		const res = await jsonApi('/bo/cs/getQnaCommentList', json ? json : {});
		return res.data;
	}
	async getQnaComment(json?:any) { // QNA 댓글 상세조회 [CS_QNA_CMMT]
		const res = await jsonApi('/bo/cs/getQnaComment', json ? json : {});
		return res.data;
	}
	async setQnaCommentList(json?:any) { // QNA 댓글 리스트등록 [CS_QNA_CMMT]
		const res = await jsonApi('/bo/cs/setQnaCommentList', json ? json : {});
		return res.data;
	}
	async insertQnaComment(formData:FormData) { // QNA 댓글 등록 [CS_QNA_CMMT]
		const res = await formApi('/bo/cs/insertQnaComment', formData);
		return res.data;
	}
	async updateQnaComment(formData:FormData) { // QNA 댓글 수정 [CS_QNA_CMMT]
		const res = await formApi('/bo/cs/updateQnaComment', formData);
		return res.data;
	}
	async deleteQnaComment(formData:FormData) { // QNA 댓글 삭제 [CS_QNA_CMMT]
		const res = await formApi('/bo/cs/getQnaCommentList', formData);
		return res.data;
	}
}
export default new QnaCommentService();

