import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class MessageHistoryService {
	async getMessageHistoryList(json?:any) { // 문자메시지이력 리스트 [BS_MSG_HIST]
		const res = await jsonApi('/bo/bs/getMessageHistoryList', json ? json : {});
		return res.data;
	}
	async getMessageHistory(json?:any) { // 문자메시지이력 상세조회 [BS_MSG_HIST]
		const res = await jsonApi('/bo/bs/getMessageHistory', json ? json : {});
		return res.data;
	}
	async setMessageHistoryList(json?:any) { // 문자메시지이력 리스트등록 [BS_MSG_HIST]
		const res = await jsonApi('/bo/bs/setMessageHistoryList', json ? json : {});
		return res.data;
	}
	async insertMessageHistory(formData:FormData) { // 문자메시지이력 등록 [BS_MSG_HIST]
		const res = await formApi('/bo/bs/insertMessageHistory', formData);
		return res.data;
	}
	async updateMessageHistory(formData:FormData) { // 문자메시지이력 수정 [BS_MSG_HIST]
		const res = await formApi('/bo/bs/updateMessageHistory', formData);
		return res.data;
	}
	async deleteMessageHistory(formData:FormData) { // 문자메시지이력 삭제 [BS_MSG_HIST]
		const res = await formApi('/bo/bs/getMessageHistoryList', formData);
		return res.data;
	}
}
export default new MessageHistoryService();

