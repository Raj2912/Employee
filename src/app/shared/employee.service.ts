import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  id: number;
  formData: Employee;
  list: Employee[];
  rootURL= 'http://dummy.restapiexample.com/api/v1';

  constructor(private http: HttpClient) { }

  postEmployee(formData: Employee){
  return this.http.post(this.rootURL + '/create', formData);
  }

  refreshlist(){
    this.http.get(this.rootURL + '/employees')
    .toPromise().then( res => this.list = res as Employee[]);
  }

  putEmployee(formData: Employee, id: string){
    return this.http.put(this.rootURL + '/update/'+ id, formData);
    }

    deleteEmployee(id: number): Observable<any> {
      return this.http.delete(this.rootURL +'/delete/'+id);
    }
}
