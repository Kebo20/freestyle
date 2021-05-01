import axios from 'axios';


export default axios.create({
    baseURL: process.env.VUE_APP_API+'api',

    headers: {
        'Content-Type': 'application/json',
        //'Authorization':"Bearer " + localStorage.getItem('token')
    }
});
