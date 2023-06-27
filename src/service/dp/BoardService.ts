import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class BoardService {
	async getBoardList(json?:any) { // 게시판 리스트 [DP_BRD]
		const res = await jsonApi('/bo/dp/getBoardList', json ? json : {});
		return res.data;
	}
	async getBoard(json?:any) { // 게시판 상세조회 [DP_BRD]
		const res = await jsonApi('/bo/dp/getBoard', json ? json : {});
		return res.data;
	}
	async setBoardList(json?:any) { // 게시판 리스트등록 [DP_BRD]
		const res = await jsonApi('/bo/dp/setBoardList', json ? json : {});
		return res.data;
	}
	async insertBoard(formData:FormData) { // 게시판 등록 [DP_BRD]
		const res = await formApi('/bo/dp/insertBoard', formData);
		return res.data;
	}
	async updateBoard(formData:FormData) { // 게시판 수정 [DP_BRD]
		const res = await formApi('/bo/dp/updateBoard', formData);
		return res.data;
	}
	async deleteBoard(formData:FormData) { // 게시판 삭제 [DP_BRD]
		const res = await formApi('/bo/dp/getBoardList', formData);
		return res.data;
	}
}
export default new BoardService();

