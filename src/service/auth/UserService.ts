/* eslint-disable no-debugger */
import { formApi } from '../../utils/formApi';

class UserService {
  async getUserLogin(formData:FormData) {
    const res = await formApi('/auth/getUserLogin', formData);
    return res.data;
  }
}
export default new UserService();
