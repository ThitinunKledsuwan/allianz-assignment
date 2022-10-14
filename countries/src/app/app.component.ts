import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'countries';
  allCountries: any[] = [];
  list: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get('https://restcountries.com/v3.1/all').subscribe((data:any) => {
      this.allCountries = data.sort((a: any, b: any) => {
        if (a['name'].common < b['name'].common) {
          return -1;
        }
        if (a['name'].common > b['name'].common) {
          return 1;
        }
        return 0;
      });
      this.list = [...this.allCountries]
    });
  }

  searchCountry($event: any) {
    this.allCountries = this.list.filter((item: any) => { 
      if (item['name'].common.toLowerCase().includes($event.target.value)) {
        return item;
      }
    });
  }

}
