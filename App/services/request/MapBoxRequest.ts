import axios from 'axios';
import {MAP_BOX_ACCESS_TOKEN, MAP_BOX_PATH} from '../../utils/constrats';
export const getPlaces = async (data: string) => {
  return axios.get(
    `${MAP_BOX_PATH}/${data}.json?access_token=${MAP_BOX_ACCESS_TOKEN}`,
  );
};
