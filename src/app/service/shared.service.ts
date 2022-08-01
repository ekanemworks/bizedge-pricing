import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigModel } from '../models/appsettings_model';
import {catchError, map} from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class SharedService {
  rate: number =0;
  currency: String = 'NGN';
  appConfig: any;

  baseUrl: any;
  path:any;


  constructor(private http: HttpClient) { 
  }


  appSettings_Services(){
    return fetch('/assets/appsettings.json');
  }



  get_services_api(baseAPI:string,path:string,apikey:string)
  { 
    return this.http.get(baseAPI+path,{headers: {"x-api-key":apikey}})
      .pipe(
        catchError(err => {
          return throwError(() => err);
        },  
        ),
      );
  }


  get_services_api_parameter(baseAPI:string,path:string,apikey:string,parameter)
  { 
    
    return this.http.get(baseAPI+path+parameter,{headers: {"x-api-key":apikey}})
      .pipe(
        catchError(err => {
          return throwError(() => err);
        },  
        ),
      );
  }



  // post_services_api(baseAPI:string,path:string,apikey:string,body)
  // { 
  //   return this.http.post(baseAPI+path,body,{headers: {"x-api-key":apikey}})
  //     .pipe(
  //       catchError(err => {
  //         return throwError(() => err);
  //       },  
  //       ),
  //     );
  // }




  post_services_api(baseAPI:string,path:string,apikey:string,body)
  { 

    console.log(body);
    
    return this.http.post(baseAPI+path,body,
        {headers: 
          {
            "x-api-key":apikey,
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
          }
        })
      .pipe(
        catchError(err => {
          return throwError(() => err);
        },  
        ),
      );
  }




  get_api_camonta_server()
  { 
    
    return this.http.get('http://localhost:3000/testboy',
        {headers: 
          {
            'Content-Type': 'application/json',
          }
        })
      .pipe(
        catchError(err => {
          return throwError(() => err);
        },  
        ),
      );
  }






}
