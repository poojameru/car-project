import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobleService {

  constructor(public htts: HttpClient) { }

  baseApi = "http://localhost:3000/user";

  //fetchapi
  getApi(): Observable<any>{
    return this.htts.get(this.baseApi);
  }

  // create orderapi
  postApi(data: any): Observable<any>{
    return this.htts.post(this.baseApi,data);
  }

  //update api
  updateApi(data:any,id:any): Observable<any>{
    return this.htts.put(`${this.baseApi}/${id}`,data);
  }


  //delete Api
  deleteApi(id:any){
    return this.htts.delete(`${this.baseApi}/${id}`);

  }
}
