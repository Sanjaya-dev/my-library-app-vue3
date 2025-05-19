
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth',{
    state: () => ({
        user: null,
        isAuthenticated: false
    }),

    sction: {
        login(username,password) {
            //dalam aplikasi nyata, ini akan melakukan permintaan api
            return new Promise((resolve,rejects) => {
                //simulasi autentikasi sederhana
                if(username === 'admin' && password === 'admin123') {
                    this.user = {
                        id: 1,
                        username: 'admin',
                        name: 'Administrator',
                        role: 'admin'
                    };
                    this.isAuthenticated = true;
                    resolve(this.user);
                } else {
                    rejects(new Error('Invalid username or password'));
                }
            })
        },

        logout() {
            this.user = null;
            this.isAuthenticated = false
        }
    }
});