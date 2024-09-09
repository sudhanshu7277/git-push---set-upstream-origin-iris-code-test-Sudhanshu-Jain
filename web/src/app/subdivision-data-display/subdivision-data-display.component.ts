import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { SubdivisionDataService } from '../services/subdivision-data-service';

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css']
})
export class SubdivisionDataDisplayComponent implements OnInit {
  @ViewChild('searchText') searchTextRef: any;
  temporarySubData: any = [];
  subData: any = [];
  title: any = "Sub Division data component";
  zoom = 5;
  center!: google.maps.LatLngLiteral;
  public navigator?: Navigator;
  p: any = "1";
  count: any = "25";
  formGroup = this.formBuilder.group({ filter: [''] });
  searchString: string = '';
  sorted: boolean = false;

  constructor(private subdivisionDataService: SubdivisionDataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllSubDivisionRecords();
  }

  stNthRd(d: any) {
    const last = +String(d).slice(-2);
    if (last > 3 && last < 21) return `${d}th`;
    const remainder = last % 10;
    if (remainder === 1) return `${d}st`;
    if (remainder === 2) return `${d}nd`;
    if (remainder === 3) return `${d}rd`;
    return `${d}th`;
  };

  timeStampToActual(stamp: any) {
      let temp = new Date(stamp);
      let year = temp.getFullYear();
      let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      let months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
      let temp_month = temp.getMonth();
      let month = months[temp_month];
      var dayOfWeek = days[temp.getDay()]
      let date_ = this.stNthRd(temp.getDay());
      let finalFormatted = `${dayOfWeek}, ${date_} ${month} ${year}`
      return finalFormatted;
  }

  quickProcess(nearMapImageDate: any) {
    console.log();
    let temp = new Date(nearMapImageDate);
      let timeRetreived = temp.getTime();
      return timeRetreived;
  }

  sortByNearMapImageDate() {
      this.sorted=!this.sorted;
      if(this.sorted) {
      this.subData = this.subData.sort((x: { nearMapImageDate: number; }, y: { nearMapImageDate: number; }) => {
        return this.quickProcess(x.nearMapImageDate) - this.quickProcess(y.nearMapImageDate);
      });
    }

    if(!this.sorted) {
      this.subData = this.subData.sort((x: { nearMapImageDate: number; }, y: { nearMapImageDate: number; }) => {
        return this.quickProcess(y.nearMapImageDate) - this.quickProcess(x.nearMapImageDate);
      });
    }
  }

  getAllSubDivisionRecords() {
    this.subdivisionDataService.getSubDivisionData().subscribe((result: any) => {
      for (let each of result.subdivisions) {
        this.subData.push({
          id: each.id, position: {
            lat: each.latitude, lng: each.longitude
          }, title: each.name, territoryName: each.fieldSurveyTerritoryName,
          country: each.county,
          community: each.community,
          subdivisionStatusCode: each.subdivisionStatusCode,
          nearMapImageDate: each.nearMapImageDate,
          nearMapImageDate_formatted: this.timeStampToActual(each.nearMapImageDate),
          options: {
            zoom: 5,
            center: { lat: each.latitude, lng: each.longitude },
            mapTypeId: 'hybrid',
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            maxZoom: 15,
            minZoom: 3
          }
        })
      }
      console.log('subData  ', this.subData);
    });
  }

  ngAfterViewInit() {
    if (this.searchTextRef) {
      fromEvent(this.searchTextRef.nativeElement, 'keyup')
        .pipe(
          debounceTime(800),
          distinctUntilChanged()
        ).subscribe(value => {
          if (this.searchTextRef.nativeElement.value) {
            this.subData = this.subData.filter((each: any) => {
              return each.subdivisionStatusCode.toLowerCase().includes(this.searchTextRef.nativeElement.value.toLowerCase())
            })
            console.log('filtered array subData  ', this.subData);
          }

          if (this.searchTextRef.nativeElement.value == '') {
            this.subData = [];
            this.getAllSubDivisionRecords();
            console.log('unfiltered array subData  ', this.subData);
          }
        }
        )
    }
  }

  zoomIn(sub: any) {
    console.log('sub in zoom in  ', sub);
    if (this.zoom < sub.options.maxZoom!) this.zoom++;
  }

  zoomOut(sub: any) {
    console.log('sub in zoom out  ', sub);
    if (this.zoom > sub.options.minZoom!) this.zoom--;
  }
}
