import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartamentosService {
  constructor(public http: HttpClient) {}

  findAll(): Observable<Departamento> {
    return this.http.get<Departamento>(
      `${environment.url}backendclave2000/getdepartamentos.php/`
    );
  }
}
