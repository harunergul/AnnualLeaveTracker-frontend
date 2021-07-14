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
  
  constructor(
    @Inject(APIURL) public ApiURL,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  getUserPermissionRequests() : Observable<IPermissionRequest[]>{
    let info: IUser = this.auth.userInfo;
    return this.http.get<IPermissionRequest[]>(
      `${this.ApiURL}/permission-request/${info.id}`
    );
  }

  addRequestPermission(value: IPermissionRequest): Observable<any> {
    return this.http.post<Response>(`${this.ApiURL}/permission-request/add`,value);
  }

  deleteRequest(id: number):Observable<any> {
    return this.http.delete<any>(`${this.ApiURL}/permission-request/delete/${id}`);
  }
}
