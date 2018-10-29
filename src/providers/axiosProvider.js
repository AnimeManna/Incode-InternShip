import axios from 'axios'


const baseUrl = 'https://incode-blog-internship.herokuapp.com/'

export default class axiosProvider {



    static async createPostRequest(uri, data) {
        let responsePostData = await axios.post(baseUrl + uri, data);
        return responsePostData.data
    }

    static  async createPostRequestWithToken(uri,data) {
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        let response = await axios.post(baseUrl+uri,data,config);
        return response.data
    }

    static async getRequestWithToken(uri) {
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        let responseUserData = await axios.get(baseUrl + uri, config);
        return responseUserData.data
    }

    static async createDeleteRequest(uri){
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        let response = await axios.delete(baseUrl + uri,config);
        return response.data
    }

    static async createPutRequestWithToken(uri, data){
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        let response = await axios.put(baseUrl + uri,data, config );
        return response.data
    }

}