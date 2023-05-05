import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8765/api/carsharing/';

class CarsharingService {


  getUserDrives() {
    return axios.get(API_URL + "drives", {headers: authHeader()});
  }
 
  getFreeCars() {
    return axios.get(API_URL + "cars", {headers: authHeader()})
  }



}

export default new CarsharingService();