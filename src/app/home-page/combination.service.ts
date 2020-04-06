import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class CombinationSerivce {
    endPointURL = "http://localhost:9000/";
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
    constructor(private http: HttpClient) { }
    getData(phoneNumber,pageIndex,pageSize) {
        //http://localhost:9000/222?pageIdx=1&pageNum=20
        return  this.http.get(this.endPointURL+phoneNumber+'?pageIdx='+pageIndex+'&pageNum='+pageSize);
        // return this.http.post(this.endPointURL,phoneNumber,this.httpOptions)
    }
}