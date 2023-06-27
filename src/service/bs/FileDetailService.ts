import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class FileDetailService {
	async getFileDetailList(json?:any) { // 파일상세 리스트 [BS_FILE_DTL]
		const res = await jsonApi('/bo/bs/getFileDetailList', json ? json : {});
		return res.data;
	}
	async getFileDetail(json?:any) { // 파일상세 상세조회 [BS_FILE_DTL]
		const res = await jsonApi('/bo/bs/getFileDetail', json ? json : {});
		return res.data;
	}
	async setFileDetailList(json?:any) { // 파일상세 리스트등록 [BS_FILE_DTL]
		const res = await jsonApi('/bo/bs/setFileDetailList', json ? json : {});
		return res.data;
	}
	async insertFileDetail(formData:FormData) { // 파일상세 등록 [BS_FILE_DTL]
		const res = await formApi('/bo/bs/insertFileDetail', formData);
		return res.data;
	}
	async updateFileDetail(formData:FormData) { // 파일상세 수정 [BS_FILE_DTL]
		const res = await formApi('/bo/bs/updateFileDetail', formData);
		return res.data;
	}
	async deleteFileDetail(formData:FormData) { // 파일상세 삭제 [BS_FILE_DTL]
		const res = await formApi('/bo/bs/getFileDetailList', formData);
		return res.data;
	}
}
export default new FileDetailService();

