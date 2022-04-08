import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/ciudad';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  constructor(public http: HttpClient) {}

  findByDepartamento(departamento: string): Observable<Ciudad> {
    return this.http.get<Ciudad>(
      `${environment.url}backendclave2000/getciudades.php?departamento=${departamento}`
    );
  }
}
