import axios from 'axios';


export default axios.create({
    //baseURL: "https://aicoronel-backend.gogazo.com/api",//process.env.REACT_APP_API,
    baseURL: "http://freestyle-backend/api",//process.env.REACT_APP_API,

   //baseURL: "http://localhost:8000/api",
    headers: {
        'Content-Type': 'application/json',
        //'Authorization':"Bearer " + localStorage.getItem('token')
    }
});
