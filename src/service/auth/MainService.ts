import { jsonApi } from '../../utils/jsonApi';
import { formApi } from '../../utils/formApi';

class MainService {
	async getDashboard(json?:any) {
		const res = await jsonApi('/main/getDashboard', json ? json : {});
		return res.data;
	}
	async getCalendar(json?:any) {
		const res = await jsonApi('/main/getCalendar', json ? json : {});
		return res.data;
	}
}
export default new MainService();

