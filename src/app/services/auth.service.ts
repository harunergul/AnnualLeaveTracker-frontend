import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { AuthResponse, IRole, IUser, AuthRequest } from "../models";
import { CONSTANST } from "~utils/constanst";
import { APIURL } from "~app/utils/config";

@Injectable()
export class AuthService {
  public englishLocale = "en-US,en;q=5";
  public turkishLocale = "tr-TR,tr;q=5";
  public static EN="en";
  public static TR="tr";
  public loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(@Inject(APIURL) public ApiURL, public http: HttpClient) {}

  login(user: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.ApiURL + "/auth/login", {
      username: user.username,
      password: user.password,
    });
  }

  logout(): Observable<any> {
    return new Observable((observer) => {
      console.log("ABC");
      observer.next({ success: true });
    });
  }

  hasToken(): boolean {
    return !!localStorage.getItem("token");
  }

  getPayload() {
    let token = localStorage.getItem("token");
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  initializeUsers() {
    console.log("ABC");
    this.http
      .get<any>(this.ApiURL + "/auth/create-users")
      .subscribe((result) => {
        console.log(result);
      });
  }

  get userInfo() {
    let payload = this.getPayload();
    let user: IUser = payload.user;
    return user;
  }

  get isAdmin() {
    let user: IUser = this.userInfo;
    let roles: IRole[] = user.roles;
    for (let role of roles) {
      if (role.role == "ROLE_ADMIN") {
        return true;
      }
    }
    return false;
  }

  public set language(language:string) {
    if (language == "tr") {
      let value = JSON.stringify({'language': 'tr', 'accept-language': this.turkishLocale});
      localStorage.setItem("locale", value);
    } else {
      let value = JSON.stringify({'language': 'en', 'accept-language': this.englishLocale});
      localStorage.setItem("locale", value);
    }
  }

  public get language() {
    let locale = localStorage.getItem("locale");
    if(locale!=null){
      return JSON.parse(locale)['language'];
    }else{
      return 'tr';
    }
  }

  public get locale() {
    let locale = localStorage.getItem("locale");
    if(locale){
      return JSON.parse(locale)['language'];
    }else{
      return null;
    }
  }
}
