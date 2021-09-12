import http from "./http-common";

class DataService {
  getAll() {
    return http.get("/people");
  }

  getFilmData(url){
    return http.get(url,false)
  }

  
}

export default new DataService();