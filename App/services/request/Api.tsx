import axios from 'axios';
import {APP_API_URL} from '../../utils/constrats';
export default axios.create({
  baseURL: APP_API_URL,
});
