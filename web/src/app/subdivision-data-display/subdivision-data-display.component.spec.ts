import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubdivisionDataService } from '../services/subdivision-data-service';
import { SubdivisionDataDisplayComponent } from './subdivision-data-display.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

describe('MyComponent', () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdivisionDataDisplayComponent ],
      imports: [HttpClientTestingModule, FormsModule, NgxPaginationModule],
      providers: [SubdivisionDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Sub division Data Display Component', () => {
    expect(component).toBeTruthy();
  });

  it('should created in instance of SubdivisionDataService', () => {
    const service: SubdivisionDataService = TestBed.get(SubdivisionDataService);
    expect(service).toBeTruthy();
   });
});