import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class EventService {
	async getEventList(json?:any) { // 이벤트 리스트 [DP_EVT]
		const res = await jsonApi('/bo/dp/getEventList', json ? json : {});
		return res.data;
	}
	async getEvent(json?:any) { // 이벤트 상세조회 [DP_EVT]
		const res = await jsonApi('/bo/dp/getEvent', json ? json : {});
		return res.data;
	}
	async setEventList(json?:any) { // 이벤트 리스트등록 [DP_EVT]
		const res = await jsonApi('/bo/dp/setEventList', json ? json : {});
		return res.data;
	}
	async insertEvent(formData:FormData) { // 이벤트 등록 [DP_EVT]
		const res = await formApi('/bo/dp/insertEvent', formData);
		return res.data;
	}
	async updateEvent(formData:FormData) { // 이벤트 수정 [DP_EVT]
		const res = await formApi('/bo/dp/updateEvent', formData);
		return res.data;
	}
	async deleteEvent(formData:FormData) { // 이벤트 삭제 [DP_EVT]
		const res = await formApi('/bo/dp/getEventList', formData);
		return res.data;
	}
}
export default new EventService();

