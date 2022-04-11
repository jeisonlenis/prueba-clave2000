import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../models/form';
import { environment } from 'src/environments/environment';
import { emailprops } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(public http: HttpClient) {}

  create(usuario: Form): Observable<Form> {
    return this.http.post<Form>(
      `${environment.url}backendclave2000/postform.php`,
      JSON.stringify(usuario)
    );
  }

  sendEmail(cliente) {
    console.log(JSON.stringify(cliente));

    return this.http.post(`${emailprops.url}`, cliente);
  }
}
