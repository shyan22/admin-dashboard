import axios, { AxiosInstance } from "axios";
import { UserRequest, UserResponse } from "../pages/users/Users";
import { baseUrl } from "../utils/constant";

export interface ICommonService {
    _token?: string
    login: (email: string, password: string) => Promise<boolean | void>
    register: (email: string, password: string) => Promise<boolean | void>
    logout: () => Promise<void>
    getUsers: (params: UserRequest) => Promise<UserResponse>
}

class CommonService implements ICommonService {
    private _client: AxiosInstance;
    _token?: string = undefined;

    constructor() {
        this._client = axios.create({
            baseURL: baseUrl
        });
    }
    async login(email: string, password: string) {
        const response = await this._client.post('/login', { email, password })
        this._token = response.data.token;
        return true;
    }
    async register(email: string, password: string) {
        const response = await this._client.post('/register', { email, password })
        this._token = response.data.token;
        return true;
    }
    async logout() {
        await this._client.post('/logout');
        this._token = undefined;
    }

    async getUsers(params: UserRequest) {
        var response = await this._client.get('/users', { params });

        return response.data;
    }
}

const commonService = new CommonService();

export default commonService;