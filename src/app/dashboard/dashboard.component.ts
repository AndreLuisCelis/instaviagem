import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: DashboardService) {}



    myControl = new FormControl();
    hotels = [];
    searchedHotels = [];
    filterHotels: Observable<any[]> = new Observable();

    ngOnInit() {
      this.getHotels();
      this.filterHotels = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          this.hotels = JSON.parse(JSON.stringify(this._filter(value)));
          return this._filter(value)
        })
      );
    }

    getHotels(){
      this.service.getHotels().subscribe(res => {
        this.hotels = res as [];
        this.searchedHotels = JSON.parse(JSON.stringify(this.hotels))
      })
    }

    private _filter(value: string): any[] {
      const filterValue = value.toLowerCase();
      return this.searchedHotels.filter((option:any) => option?.name.toLowerCase().includes(filterValue));
    }

    private _filter2(value: string): any[] {
      const filterValue = value.toLowerCase();
      return this.searchedHotels.filter((option:any) => option?.type.toLowerCase().includes(filterValue));
    }

    teste(){
      this.myControl.setValue('abc');
    }
}
