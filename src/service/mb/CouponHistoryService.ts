import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CouponHistoryService {
	async getCouponHistoryList(json?:any) { // 회원쿠폰내역 리스트 [MB_CPN_HIST]
		const res = await jsonApi('/bo/mb/getCouponHistoryList', json ? json : {});
		return res.data;
	}
	async getCouponHistory(json?:any) { // 회원쿠폰내역 상세조회 [MB_CPN_HIST]
		const res = await jsonApi('/bo/mb/getCouponHistory', json ? json : {});
		return res.data;
	}
	async setCouponHistoryList(json?:any) { // 회원쿠폰내역 리스트등록 [MB_CPN_HIST]
		const res = await jsonApi('/bo/mb/setCouponHistoryList', json ? json : {});
		return res.data;
	}
	async insertCouponHistory(formData:FormData) { // 회원쿠폰내역 등록 [MB_CPN_HIST]
		const res = await formApi('/bo/mb/insertCouponHistory', formData);
		return res.data;
	}
	async updateCouponHistory(formData:FormData) { // 회원쿠폰내역 수정 [MB_CPN_HIST]
		const res = await formApi('/bo/mb/updateCouponHistory', formData);
		return res.data;
	}
	async deleteCouponHistory(formData:FormData) { // 회원쿠폰내역 삭제 [MB_CPN_HIST]
		const res = await formApi('/bo/mb/getCouponHistoryList', formData);
		return res.data;
	}
}
export default new CouponHistoryService();

