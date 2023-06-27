import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class OrderService {
	async getOrderList(json?:any) { // 주문 리스트 [OR_ORD]
		const res = await jsonApi('/bo/or/getOrderList', json ? json : {});
		return res.data;
	}
	async getOrder(json?:any) { // 주문 상세조회 [OR_ORD]
		const res = await jsonApi('/bo/or/getOrder', json ? json : {});
		return res.data;
	}
	async setOrderList(json?:any) { // 주문 리스트등록 [OR_ORD]
		const res = await jsonApi('/bo/or/setOrderList', json ? json : {});
		return res.data;
	}
	async insertOrder(formData:FormData) { // 주문 등록 [OR_ORD]
		const res = await formApi('/bo/or/insertOrder', formData);
		return res.data;
	}
	async updateOrder(formData:FormData) { // 주문 수정 [OR_ORD]
		const res = await formApi('/bo/or/updateOrder', formData);
		return res.data;
	}
	async deleteOrder(formData:FormData) { // 주문 삭제 [OR_ORD]
		const res = await formApi('/bo/or/getOrderList', formData);
		return res.data;
	}
}
export default new OrderService();

