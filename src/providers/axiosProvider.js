import axios from 'axios';


const baseUrl = 'https://incode-blog-internship.herokuapp.com/';

export default class axiosProvider {
  static async createPostRequest(uri, data) {
    const responsePostData = await axios.post(baseUrl + uri, data);
    return responsePostData.data;
  }

  static async createPostRequestWithToken(uri, data) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post(baseUrl + uri, data, config);
    return response.data;
  }

  static async getRequestWithToken(uri) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const responseUserData = await axios.get(baseUrl + uri, config);
    return responseUserData.data;
  }

  static async createDeleteRequest(uri) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.delete(baseUrl + uri, config);
    return response.data;
  }

  static async createPutRequestWithToken(uri, data) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.put(baseUrl + uri, data, config);
    return response.data;
  }
}
