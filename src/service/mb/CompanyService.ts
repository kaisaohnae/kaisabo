import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class CompanyService {
	async getCompanyList(json?:any) { // 업체 리스트 [MB_CMP]
		const res = await jsonApi('/bo/mb/getCompanyList', json ? json : {});
		return res.data;
	}
	async getCompany(json?:any) { // 업체 상세조회 [MB_CMP]
		const res = await jsonApi('/bo/mb/getCompany', json ? json : {});
		return res.data;
	}
	async setCompanyList(json?:any) { // 업체 리스트등록 [MB_CMP]
		const res = await jsonApi('/bo/mb/setCompanyList', json ? json : {});
		return res.data;
	}
	async insertCompany(formData:FormData) { // 업체 등록 [MB_CMP]
		const res = await formApi('/bo/mb/insertCompany', formData);
		return res.data;
	}
	async updateCompany(formData:FormData) { // 업체 수정 [MB_CMP]
		const res = await formApi('/bo/mb/updateCompany', formData);
		return res.data;
	}
	async deleteCompany(formData:FormData) { // 업체 삭제 [MB_CMP]
		const res = await formApi('/bo/mb/getCompanyList', formData);
		return res.data;
	}
}
export default new CompanyService();

