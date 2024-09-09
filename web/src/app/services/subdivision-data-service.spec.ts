import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { subdivisionsMocked } from './mockData';
import { SubdivisionDataService } from './subdivision-data-service';

describe('BooksService', () => {
	let service: SubdivisionDataService;
  let httpController: HttpTestingController;
	
	  beforeEach(() => {
	    TestBed.configureTestingModule({
	      imports: [HttpClientTestingModule],
	    });
	    service = TestBed.inject(SubdivisionDataService);
	    httpController = TestBed.inject(HttpTestingController);
	  });


	it('should call getSubDivisionData and return an array of subdivisions', () => {
			
		  service.getSubDivisionData().subscribe((res) => {
	      expect(res).toEqual(subdivisionsMocked);
	    });
	
	    const req = httpController.expectOne({
	      method: 'GET',
	      url: `${service.baseUrl}`,
	    });

			//4
	    req.flush(subdivisionsMocked);
	  });
});

// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
// import { SubdivisionDataService } from './subdivision-data-service';
// import { of, take } from 'rxjs';
// import { subdivisions } from './mockData';

// const provide = (mock: any): any => mock;
// describe('Sub division Data Service ', () => {
//   let dataService: SubdivisionDataService;
//   let controller: HttpTestingController;

//   const http = { get: jest.fn(() => of(subdivisions)) };
//   beforeEach(() => {
//     dataService = new SubdivisionDataService(provide(http));
//   });

//   it('should create/ instantiate sub division service', () => {
//     expect(dataService).toBeTruthy();
//   });

//   it('Should return a 1598 objects of sub divisions data', () => {
//     dataService.getSubDivisionData().subscribe(items => {
//       expect(http.get).toBeCalledWith('http://localhost:3000/v1/subdivisions');
//       expect(items.length).toBe(1598);
//     });
//   });

//   it('should handle get data properly', (): void => {
//     dataService
//       .getSubDivisionData()
//       .pipe(take(1))
//       .subscribe((res: any): void => {
//         expect(res.length).toEqual(1598);
//         expect(res[0]).toEqual({});
//       });

//     const request: TestRequest = controller.expectOne({
//       method: 'GET',
//       url: dataService.baseUrl,
//     });

//     request.flush([{}]); // <-- this is how our response body will look like, an array with one empty object
//   });
// });