import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class PeakseasonService {
	async getPeakseasonList(json?:any) { // 성수기 리스트 [MB_PKSN]
		const res = await jsonApi('/bo/mb/getPeakseasonList', json ? json : {});
		return res.data;
	}
	async getPeakseason(json?:any) { // 성수기 상세조회 [MB_PKSN]
		const res = await jsonApi('/bo/mb/getPeakseason', json ? json : {});
		return res.data;
	}
	async setPeakseasonList(json?:any) { // 성수기 리스트등록 [MB_PKSN]
		const res = await jsonApi('/bo/mb/setPeakseasonList', json ? json : {});
		return res.data;
	}
	async insertPeakseason(formData:FormData) { // 성수기 등록 [MB_PKSN]
		const res = await formApi('/bo/mb/insertPeakseason', formData);
		return res.data;
	}
	async updatePeakseason(formData:FormData) { // 성수기 수정 [MB_PKSN]
		const res = await formApi('/bo/mb/updatePeakseason', formData);
		return res.data;
	}
	async deletePeakseason(formData:FormData) { // 성수기 삭제 [MB_PKSN]
		const res = await formApi('/bo/mb/getPeakseasonList', formData);
		return res.data;
	}
}
export default new PeakseasonService();

