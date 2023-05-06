import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8765/api/carsharing/';

class CarsharingService {


  getUserDrives() {
    return axios.get(API_URL + "drives", {headers: authHeader()});
  }
 
  getFreeCars() {
    return axios.get(API_URL + "cars", {headers: authHeader()});
  }

  getCurrentDrive() {
    return axios.get(API_URL + "drive", {headers: authHeader()});
  }

  startDrive(carId) {
    return axios.post(API_URL + "drives/start", {carId: carId}, {headers: authHeader()})
  }

}

export default new CarsharingService();