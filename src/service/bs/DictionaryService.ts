import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class DictionaryService {
	async getDictionaryList(json?:any) { // 사전 리스트
		const res = await jsonApi('/bo/bs/getDictionaryList', json ? json : {});
		return res.data;
	}
	async setDictionaryList(json?:any) { // 사전 리스트등록
		const res = await jsonApi('/bo/bs/setDictionaryList', json ? json : {});
		return res.data;
	}
}
export default new DictionaryService();

