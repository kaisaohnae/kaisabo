import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class ProductService {
	async getProductList(json?:any) { // 상품 리스트 [PR_PROD]
		const res = await jsonApi('/bo/pr/getProductList', json ? json : {});
		return res.data;
	}
	async getProduct(json?:any) { // 상품 상세조회 [PR_PROD]
		const res = await jsonApi('/bo/pr/getProduct', json ? json : {});
		return res.data;
	}
	async setProductList(json?:any) { // 상품 리스트등록 [PR_PROD]
		const res = await jsonApi('/bo/pr/setProductList', json ? json : {});
		return res.data;
	}
	async insertProduct(formData:FormData) { // 상품 등록 [PR_PROD]
		const res = await formApi('/bo/pr/insertProduct', formData);
		return res.data;
	}
	async updateProduct(formData:FormData) { // 상품 수정 [PR_PROD]
		const res = await formApi('/bo/pr/updateProduct', formData);
		return res.data;
	}
	async deleteProduct(formData:FormData) { // 상품 삭제 [PR_PROD]
		const res = await formApi('/bo/pr/getProductList', formData);
		return res.data;
	}
}
export default new ProductService();

