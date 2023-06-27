import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class PointService {
	async getPointList(json?:any) { // 포인트 리스트 [MB_PNT]
		const res = await jsonApi('/bo/mb/getPointList', json ? json : {});
		return res.data;
	}
	async getPoint(json?:any) { // 포인트 상세조회 [MB_PNT]
		const res = await jsonApi('/bo/mb/getPoint', json ? json : {});
		return res.data;
	}
	async setPointList(json?:any) { // 포인트 리스트등록 [MB_PNT]
		const res = await jsonApi('/bo/mb/setPointList', json ? json : {});
		return res.data;
	}
	async insertPoint(formData:FormData) { // 포인트 등록 [MB_PNT]
		const res = await formApi('/bo/mb/insertPoint', formData);
		return res.data;
	}
	async updatePoint(formData:FormData) { // 포인트 수정 [MB_PNT]
		const res = await formApi('/bo/mb/updatePoint', formData);
		return res.data;
	}
	async deletePoint(formData:FormData) { // 포인트 삭제 [MB_PNT]
		const res = await formApi('/bo/mb/getPointList', formData);
		return res.data;
	}
}
export default new PointService();

