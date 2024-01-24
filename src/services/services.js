import instance from "./axiosInterceptors";
import AsyncStorageHelper from '../Helper/AsyncStorageHelper';

export const post = async (url, formData, type) => {
  let token = await localStorage.getItem('token');
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: type == true ? "multipart/form-data" : "application/json",
      "Content-Type": "application/json",
    },

  };
  return instance
    .post(url, formData, options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.log("post method api error========", error);
      return error;
    });
};

export const get = async (url, type = 0) => {
  let token = await localStorage.getItem('token');
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return instance
    .get(url, options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.log('Get method api error========', error);
      return error;
    });
};

export const put = async (url, formData, type) => {
  // let token = await AsyncStorageHelper.getData('token');
  const options = {
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: type == true ? "multipart/form-data" : "application/json",
      "Content-Type": type == true ? "multipart/form-data" : "application/json",
    },
  };
  return instance
    .put(url, formData, options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.log('Put method api error========', error);
      return error;
    });
};

export const deleteApi = async (url, type = 0) => {
  // let token = await AsyncStorageHelper.getData('token');
  const options = {
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return instance
    .delete(url, options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.log('Delete method api error========', error);
      return error;
    });
};

export const ImageUpload = async (url, data) => {
  // let token = await AsyncStorageHelper.getData('token');
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return instance
    .post(url, data, options)
    .then(function (response) {
      if (response?.data?.success == 0) {
        // alert(response?.data?.message);
      }
      return response.data;
    })
    .catch(function (error) {
      // console.log('Image Upload method api error========', error);
    });
};

export const postImage = async (url, Data, type) => {
  // let token = await AsyncStorageHelper.getData('token');
  const options = {
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: type ? "multipart/form-data" : "application/json",
      "Content-Type": "application/json",
    },
  };
  return instance
    .post(url, Data, options)
    .then(function (response) {
      if (response?.data?.success == 0) {
        // alert(response?.data?.message);
      }
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
