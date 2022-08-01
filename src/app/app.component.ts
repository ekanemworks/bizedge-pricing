import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedService } from "../app/service/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bizedge-pricing';
  appConfig: any;

  constructor(private shared: SharedService,private http: HttpClient){}

  ngOnInit() {
    

  }

  supplyConfig() {
    // this.http.get('/assets/appsettings.json').subscribe(data => {
    //   let appConfig = <AppSettingsModel> data;
    //   this.appConfig = appConfig;
    //   console.log(appConfig);
    // });
    
    // return this.appConfig
  }




}
