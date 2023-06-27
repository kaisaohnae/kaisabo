import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CouponService {
	async getCouponList(json?:any) { // 쿠폰 리스트 [MB_CPN]
		const res = await jsonApi('/bo/mb/getCouponList', json ? json : {});
		return res.data;
	}
	async getCoupon(json?:any) { // 쿠폰 상세조회 [MB_CPN]
		const res = await jsonApi('/bo/mb/getCoupon', json ? json : {});
		return res.data;
	}
	async setCouponList(json?:any) { // 쿠폰 리스트등록 [MB_CPN]
		const res = await jsonApi('/bo/mb/setCouponList', json ? json : {});
		return res.data;
	}
	async insertCoupon(formData:FormData) { // 쿠폰 등록 [MB_CPN]
		const res = await formApi('/bo/mb/insertCoupon', formData);
		return res.data;
	}
	async updateCoupon(formData:FormData) { // 쿠폰 수정 [MB_CPN]
		const res = await formApi('/bo/mb/updateCoupon', formData);
		return res.data;
	}
	async deleteCoupon(formData:FormData) { // 쿠폰 삭제 [MB_CPN]
		const res = await formApi('/bo/mb/getCouponList', formData);
		return res.data;
	}
}
export default new CouponService();

