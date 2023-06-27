import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class HolidayService {
	async getHolidayList(json?:any) { // 휴일 리스트 [MB_HLD]
		const res = await jsonApi('/bo/mb/getHolidayList', json ? json : {});
		return res.data;
	}
	async getHoliday(json?:any) { // 휴일 상세조회 [MB_HLD]
		const res = await jsonApi('/bo/mb/getHoliday', json ? json : {});
		return res.data;
	}
	async setHolidayList(json?:any) { // 휴일 리스트등록 [MB_HLD]
		const res = await jsonApi('/bo/mb/setHolidayList', json ? json : {});
		return res.data;
	}
	async insertHoliday(formData:FormData) { // 휴일 등록 [MB_HLD]
		const res = await formApi('/bo/mb/insertHoliday', formData);
		return res.data;
	}
	async updateHoliday(formData:FormData) { // 휴일 수정 [MB_HLD]
		const res = await formApi('/bo/mb/updateHoliday', formData);
		return res.data;
	}
	async deleteHoliday(formData:FormData) { // 휴일 삭제 [MB_HLD]
		const res = await formApi('/bo/mb/getHolidayList', formData);
		return res.data;
	}
}
export default new HolidayService();

