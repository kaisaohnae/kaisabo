import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class EventProductService {
	async getEventProductList(json?:any) { // 이벤트상품 리스트 [DP_EVT_PROD]
		const res = await jsonApi('/bo/dp/getEventProductList', json ? json : {});
		return res.data;
	}
	async getEventProduct(json?:any) { // 이벤트상품 상세조회 [DP_EVT_PROD]
		const res = await jsonApi('/bo/dp/getEventProduct', json ? json : {});
		return res.data;
	}
	async setEventProductList(json?:any) { // 이벤트상품 리스트등록 [DP_EVT_PROD]
		const res = await jsonApi('/bo/dp/setEventProductList', json ? json : {});
		return res.data;
	}
	async insertEventProduct(formData:FormData) { // 이벤트상품 등록 [DP_EVT_PROD]
		const res = await formApi('/bo/dp/insertEventProduct', formData);
		return res.data;
	}
	async updateEventProduct(formData:FormData) { // 이벤트상품 수정 [DP_EVT_PROD]
		const res = await formApi('/bo/dp/updateEventProduct', formData);
		return res.data;
	}
	async deleteEventProduct(formData:FormData) { // 이벤트상품 삭제 [DP_EVT_PROD]
		const res = await formApi('/bo/dp/getEventProductList', formData);
		return res.data;
	}
}
export default new EventProductService();

