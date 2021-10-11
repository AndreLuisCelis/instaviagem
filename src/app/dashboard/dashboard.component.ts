import { DashboardService } from './dashboard.service';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { merge, Observable } from 'rxjs';
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
    private service: DashboardService) { }


  @ViewChildren('filterType')filters:QueryList<ElementRef> = new QueryList();
  searchControl = new FormControl();
  hotels: any[] = [];
  copyHotelsForSearchAndFilter = [];

  ngOnInit() {
    this.getHotels();
    this.startSearch();
  }

  getHotels() {
    this.service.getHotels().subscribe(res => {
      this.hotels = res as [];
      this.addLikedInHotels();
      this.createCopyHotelsForSearchAndFilter();
    });
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
    if(this.notHasFilterActived()){
      this.hotels= this.copyHotelsForSearchAndFilter;
      return;
    }

    // let filterValue = this.getValuesSelectedOnFilter();
    let filterValue = this.getFiltersSelected();
    let hotelsFiltered: any[] = [];
    filterValue.forEach(element => {
      let filtered = this.copyHotelsForSearchAndFilter.filter((option: any) => option?.type.toLowerCase().includes(element));
      hotelsFiltered = [...hotelsFiltered, ...filtered];
    });
    this.hotels = hotelsFiltered as [];
  }

  getValuesSelectedOnFilter():any[] {
    let arrayFilters = this.getArrayByElementName('filterType');
    return arrayFilters.filter(selecionado => selecionado.checked == true)
      .map(selecionado => selecionado.value);
  }

  /// METODO UTILIZANDO JAVASCRIPT PARA PEGAR OS ELEMENTOS
  getArrayByElementName (elementName: string):any[]{
    let elements = document.getElementsByName(elementName);
    return Array.prototype.slice.call(elements);
  }


  //  METODO UTILIZANDO VIEWCHILDREN PARA PEGAR OS FILTROS SELECIONADOS
  getFiltersSelected():any[]{
    return this.filters.toArray()
    .map((element)=> element.nativeElement)
    .filter(nativeElement => nativeElement.checked)
    .map(filterName=> filterName.value);
  }

  notHasFilterActived():boolean {
    return !this.getValuesSelectedOnFilter().length;
  }

}
