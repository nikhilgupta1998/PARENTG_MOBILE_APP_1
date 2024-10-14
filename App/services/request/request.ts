import axios from "axios";
import { getMyStringValue } from "../../utils/local-storage";
import fs from "react-native-fs";
import { decode } from "base64-arraybuffer";
import Api from "./Api";
import DeviceInfo from "react-native-device-info";
export const get = async (path: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  
  return Api.get(path, {
    headers: {
      Authorization: "Bearer " + token || "",
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};
export const getWithID = async (path: any, data: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return Api.get(`${path}/${data}`, {
    headers: {
      Authorization: "Bearer " + token || "",
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};
export const getChart = async (path: any, data: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return Api.get(`${path}`, {
    headers: {
      Authorization: "Bearer " + token || "",
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};
export const postFile = async (path: any, data: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return Api.put(path, data, {
    headers: {
      Authorization: "Bearer " + token || "",
      "Content-Type": "multipart/form-data",
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};

export const returnSignUrl = async (
  signedUrl: any,
  data: any,
  contentType: any
) => {
  const base64 = await fs.readFile(data, "base64");
  const arrayBuffer = decode(base64);
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return fetch(signedUrl, {
    method: "PUT",
    body: arrayBuffer,
    headers: {
      "Content-Type": contentType,
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};
export const postFilePost = async (path: any, data: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return Api.post(path, data, {
    headers: {
      Authorization: "Bearer " + token || "",
      "Content-Type": "multipart/form-data",
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};
export const post = async (path: any, data: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return Api.post(path, data, {
    headers: {
      Authorization: "Bearer " + token || "",
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};

export const put = async (path: any, data: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return Api.put(path, data, {
    headers: {
      Authorization: "Bearer " + token || "",
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};
export const putWithId = async (path: any, data: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return Api.put(`${path}/${data._id}`, data, {
    headers: {
      Authorization: "Bearer " + token || "",
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};
export const putWithIdWithoutData = async (path: any, id: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return Api.put(
    `${path}/${id}`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token || "",
        UniqueId: UniqueId,
        DeviceName: DeviceName,
        IpAddress: IpAddress,
        deviceType: deviceType,
        BaseOs: BaseOs,
      },
    }
  );
};

export const patch = async (path: any, data: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return Api.patch(path, data, {
    headers: {
      Authorization: "Bearer " + token || "",
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};
export const deleteCall = async (path: any, data: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return Api.delete(`${path}/${data}`, {
    headers: {
      Authorization: "Bearer " + token || "",
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};
export const deleteCallNoti = async (path: any) => {
  const token = await getMyStringValue("@token");
  const UniqueId = await DeviceInfo.getUniqueId();
  const BaseOs = await DeviceInfo.getBaseOs();
  const DeviceName = await DeviceInfo.getDeviceName();
  const IpAddress = await DeviceInfo.getIpAddress();
  const deviceType = await DeviceInfo.getDeviceType();
  return Api.delete(`${path}`, {
    headers: {
      Authorization: "Bearer " + token || "",
      UniqueId: UniqueId,
      DeviceName: DeviceName,
      IpAddress: IpAddress,
      deviceType: deviceType,
      BaseOs: BaseOs,
    },
  });
};
