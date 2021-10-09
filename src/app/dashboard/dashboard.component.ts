import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { merge, Observable } from 'rxjs';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';
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
    private service: DashboardService) { }



  searchControl = new FormControl();
  hotels: any[] = [];
  copyHotelsForSearchAndFilter = [];
  filterHotels: Observable<any[]> = new Observable();

  ngOnInit() {
    this.getHotels();
    this.startSearch();
  }

  getHotels() {
    this.service.getHotels().subscribe(res => {
      this.hotels = res as [];
      this.addLikedInHotels();
      this.createCopyHotelsForSearchAndFilter();
    })
  }

  addLikedInHotels(){
    this.hotels.forEach((hotel:any) => {
      hotel.liked = false;
      return hotel;
    });
  }

  createCopyHotelsForSearchAndFilter(){
    this.copyHotelsForSearchAndFilter = JSON.parse(JSON.stringify(this.hotels));
  }

  startSearch() {
    // Faz uma subscrição para pegar o valor do input de pesquisa e retornar o resultado
    merge(this.searchControl.valueChanges).pipe(
      startWith(''),
      map(value => {
        this.hotels = this.search(value) as [];
        return this.hotels
      })
    ).subscribe();
  }

  private search(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.copyHotelsForSearchAndFilter.filter((option: any) => option?.name.toLowerCase().includes(filterValue));
  }

  filterForType() {
    let filterValue = this.getValuesSelectedOnFilter();
    let hotelsFiltered: any[] = [];
    if(!filterValue.length){
      this.hotels= this.copyHotelsForSearchAndFilter;
      return;
    }
    filterValue.forEach(element => {
      let copy = JSON.parse(JSON.stringify(this.copyHotelsForSearchAndFilter));
      let filtered = this.copyHotelsForSearchAndFilter.filter((option: any) => option?.type.toLowerCase().includes(element));
      console.log(filtered)
      hotelsFiltered = [...hotelsFiltered, ...filtered];
    });
    this.hotels = hotelsFiltered as [];
  }



  getValuesSelectedOnFilter() {
    let filterTypeNode = document.getElementsByName('filterType');
    let arrayFilters = Array.prototype.slice.call(filterTypeNode);
    return arrayFilters.filter(selecionado => selecionado.checked == true)
      .map(selecionado => selecionado.value);
  }

}
