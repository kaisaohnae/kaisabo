import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class UserGroupService {
	async getUserGroupList(json?:any) { // 그룹 리스트 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/getUserGroupList', json ? json : {});
		return res.data;
	}
	async getUserGroup(json?:any) { // 그룹 상세조회 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/getUserGroup', json ? json : {});
		return res.data;
	}
	async setUserGroupList(json?:any) { // 그룹 리스트등록 [MB_USR_GRP]
		const res = await jsonApi('/bo/mb/setUserGroupList', json ? json : {});
		return res.data;
	}
	async insertUserGroup(formData:FormData) { // 그룹 등록 [MB_USR_GRP]
		const res = await formApi('/bo/mb/insertUserGroup', formData);
		return res.data;
	}
	async updateUserGroup(formData:FormData) { // 그룹 수정 [MB_USR_GRP]
		const res = await formApi('/bo/mb/updateUserGroup', formData);
		return res.data;
	}
	async deleteUserGroup(formData:FormData) { // 그룹 삭제 [MB_USR_GRP]
		const res = await formApi('/bo/mb/getUserGroupList', formData);
		return res.data;
	}
}
export default new UserGroupService();

