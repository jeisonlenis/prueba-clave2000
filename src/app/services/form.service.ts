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

  sendEmail(usuario: Form): Observable<Form> {
    const {
      modelo,
      nombre_completo,
      numero_celular,
      email,
      departamento,
      ciudad,
      fechacreacion,
      horacreacion,
    } = usuario;

    const mensaje = `
    Modelo: ${modelo} 
    Nombre: ${nombre_completo} 
    Numero celular: ${numero_celular} 
    Email: ${email} 
    Deparamento: ${departamento}
    Ciudad: ${ciudad}
    Fecha de solicitud: ${fechacreacion}
    Hora de envio:  ${horacreacion}
    `;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Form>(
      `${environment.url}backendclave2000/smtp/sendemail.php`,
      JSON.stringify(usuario),
      { headers: headers }
    );
  }
}
