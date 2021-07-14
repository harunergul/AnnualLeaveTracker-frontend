import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { IPermissionRequest, IUser } from "~app/models";
import { APIURL } from "~app/utils/config";

import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class RequestPermissionService {
  
  private serviceUrl:string;

  constructor(
    @Inject(APIURL) public ApiURL,
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.serviceUrl = ApiURL+"/permission-request"
  }

  getUserPermissionRequests() : Observable<IPermissionRequest[]>{
    let info: IUser = this.auth.userInfo;
    return this.http.get<IPermissionRequest[]>(
      `${this.serviceUrl}/all/${info.id}`
    );
  }

  addRequestPermission(value: IPermissionRequest): Observable<any> {
    if(value.id){
      return this.http.post<Response>(`${this.serviceUrl}/update`,value);
    }

    return this.http.post<Response>(`${this.serviceUrl}/add`,value);
  }

  deleteRequest(id: number):Observable<any> {
    return this.http.delete<any>(`${this.serviceUrl}/delete/${id}`);
  }

  getOne(id: number) {
    return this.http.get<any>(`${this.serviceUrl}/${id}`);
  }
  
}
