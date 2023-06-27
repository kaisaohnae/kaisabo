import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class DisplayProductService {
	async getDisplayProductList(json?:any) { // 전시상품 리스트 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/getDisplayProductList', json ? json : {});
		return res.data;
	}
	async getDisplayProduct(json?:any) { // 전시상품 상세조회 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/getDisplayProduct', json ? json : {});
		return res.data;
	}
	async setDisplayProductList(json?:any) { // 전시상품 리스트등록 [DP_DISP_PROD]
		const res = await jsonApi('/bo/dp/setDisplayProductList', json ? json : {});
		return res.data;
	}
	async insertDisplayProduct(formData:FormData) { // 전시상품 등록 [DP_DISP_PROD]
		const res = await formApi('/bo/dp/insertDisplayProduct', formData);
		return res.data;
	}
	async updateDisplayProduct(formData:FormData) { // 전시상품 수정 [DP_DISP_PROD]
		const res = await formApi('/bo/dp/updateDisplayProduct', formData);
		return res.data;
	}
	async deleteDisplayProduct(formData:FormData) { // 전시상품 삭제 [DP_DISP_PROD]
		const res = await formApi('/bo/dp/getDisplayProductList', formData);
		return res.data;
	}
}
export default new DisplayProductService();

