import axios from 'axios';


export default axios.create({
    baseURL: "https://freestyle-backend.gogazo.com/"+'api',


    headers: {
        'Content-Type': 'application/json',
        //'Authorization':"Bearer " + localStorage.getItem('token')
    }
});
