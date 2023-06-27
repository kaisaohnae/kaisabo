import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class BoardCategoryService {
	async getBoardCategoryList(json?:any) { // 게시판분류 리스트 [DP_BRD_CAT]
		const res = await jsonApi('/bo/dp/getBoardCategoryList', json ? json : {});
		return res.data;
	}
	async getBoardCategory(json?:any) { // 게시판분류 상세조회 [DP_BRD_CAT]
		const res = await jsonApi('/bo/dp/getBoardCategory', json ? json : {});
		return res.data;
	}
	async setBoardCategoryList(json?:any) { // 게시판분류 리스트등록 [DP_BRD_CAT]
		const res = await jsonApi('/bo/dp/setBoardCategoryList', json ? json : {});
		return res.data;
	}
	async insertBoardCategory(formData:FormData) { // 게시판분류 등록 [DP_BRD_CAT]
		const res = await formApi('/bo/dp/insertBoardCategory', formData);
		return res.data;
	}
	async updateBoardCategory(formData:FormData) { // 게시판분류 수정 [DP_BRD_CAT]
		const res = await formApi('/bo/dp/updateBoardCategory', formData);
		return res.data;
	}
	async deleteBoardCategory(formData:FormData) { // 게시판분류 삭제 [DP_BRD_CAT]
		const res = await formApi('/bo/dp/getBoardCategoryList', formData);
		return res.data;
	}
}
export default new BoardCategoryService();

