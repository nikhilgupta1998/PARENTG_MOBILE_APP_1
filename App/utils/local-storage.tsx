import AsyncStorage from "@react-native-async-storage/async-storage";
export const setStringValue = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // save error
  }
};

export const setObjectValue = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // save error
  }
};

export const getMyStringValue = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export const getMyObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }

};
export const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);

  } catch (e) {

    // remove error
  }


};
const clearToStorage = async () => await AsyncStorage.clear();
const storage = {
  get: (key: string) => getMyStringValue(key),
  set: (key: string, value: any) => setObjectValue(key, value),
  clear: (key: string) => removeValue(key),
  remove: () => clearToStorage(),
};
export default storage;
