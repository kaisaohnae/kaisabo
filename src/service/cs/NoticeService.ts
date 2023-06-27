import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class NoticeService {
	async getNoticeList(json?:any) { // 공지 리스트 [CS_NOTI]
		const res = await jsonApi('/bo/cs/getNoticeList', json ? json : {});
		return res.data;
	}
	async getNotice(json?:any) { // 공지 상세조회 [CS_NOTI]
		const res = await jsonApi('/bo/cs/getNotice', json ? json : {});
		return res.data;
	}
	async setNoticeList(json?:any) { // 공지 리스트등록 [CS_NOTI]
		const res = await jsonApi('/bo/cs/setNoticeList', json ? json : {});
		return res.data;
	}
	async insertNotice(formData:FormData) { // 공지 등록 [CS_NOTI]
		const res = await formApi('/bo/cs/insertNotice', formData);
		return res.data;
	}
	async updateNotice(formData:FormData) { // 공지 수정 [CS_NOTI]
		const res = await formApi('/bo/cs/updateNotice', formData);
		return res.data;
	}
	async deleteNotice(formData:FormData) { // 공지 삭제 [CS_NOTI]
		const res = await formApi('/bo/cs/getNoticeList', formData);
		return res.data;
	}
}
export default new NoticeService();

