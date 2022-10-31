import axios from 'axios';

const instance = axios.create({
     baseURL: "https://tinder-backend12112.herokuapp.com"
})

export default instance;