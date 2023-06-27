import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class MemberService {
	async getMemberList(json?:any) { // 회원 리스트 [MB_MBR]
		const res = await jsonApi('/bo/mb/getMemberList', json ? json : {});
		return res.data;
	}
	async getMember(json?:any) { // 회원 상세조회 [MB_MBR]
		const res = await jsonApi('/bo/mb/getMember', json ? json : {});
		return res.data;
	}
	async setMemberList(json?:any) { // 회원 리스트등록 [MB_MBR]
		const res = await jsonApi('/bo/mb/setMemberList', json ? json : {});
		return res.data;
	}
	async insertMember(formData:FormData) { // 회원 등록 [MB_MBR]
		const res = await formApi('/bo/mb/insertMember', formData);
		return res.data;
	}
	async updateMember(formData:FormData) { // 회원 수정 [MB_MBR]
		const res = await formApi('/bo/mb/updateMember', formData);
		return res.data;
	}
	async deleteMember(formData:FormData) { // 회원 삭제 [MB_MBR]
		const res = await formApi('/bo/mb/getMemberList', formData);
		return res.data;
	}
}
export default new MemberService();

