import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class UserService {
	async getUserList(json?:any) { // 사용자 리스트 [MB_USR]
		const res = await jsonApi('/bo/mb/getUserList', json ? json : {});
		return res.data;
	}
	async getUser(json?:any) { // 사용자 상세조회 [MB_USR]
		const res = await jsonApi('/bo/mb/getUser', json ? json : {});
		return res.data;
	}
	async setUserList(json?:any) { // 사용자 리스트등록 [MB_USR]
		const res = await jsonApi('/bo/mb/setUserList', json ? json : {});
		return res.data;
	}
	async insertUser(formData:FormData) { // 사용자 등록 [MB_USR]
		const res = await formApi('/bo/mb/insertUser', formData);
		return res.data;
	}
	async updateUser(formData:FormData) { // 사용자 수정 [MB_USR]
		const res = await formApi('/bo/mb/updateUser', formData);
		return res.data;
	}
	async deleteUser(formData:FormData) { // 사용자 삭제 [MB_USR]
		const res = await formApi('/bo/mb/getUserList', formData);
		return res.data;
	}
}
export default new UserService();

