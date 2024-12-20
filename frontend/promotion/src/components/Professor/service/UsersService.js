import axios from "axios";

class UserService {
    static BASE_URL = "http://localhost:8080";


    static async login(email, password) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {email, password});
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
            }
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async register(userData){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData)
           /* {
                headers: {Authorization: `Bearer ${token}`}
            })*/
            return response.data;
        }catch(err){
            throw err;
        }
    }
        static async getAllUsers(token){
            try{
                const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                return response.data;
            }catch(err){
                throw err;
            }
       
    }
    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admincommission/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')

    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }
    static getRole() {
        return localStorage.getItem('role');
    }

    static isAdmin() {
        return UserService.getRole() === 'ADMIN';
    }

    static isProf() {
        return UserService.getRole() === 'PROFESSOR';
    }

    static isCommission() {
        return UserService.getRole() === 'COMMISSION';
    }
    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }


}
export default UserService;