import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { FormService } from 'src/app/services/form.service';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { CiudadService } from 'src/app/services/ciudad.service';

import { Form } from '../../../models/form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css'],
})
export class FormAddComponent implements OnInit {
  public myForm!: FormGroup;

  public form = new Form();

  hora: any;

  public optionsmodelo: any[] = [];
  public optionsdepartamento: any[] = [];
  public optionsciudad: any[] = [];
  submitted!: boolean;

  constructor(
    private fb: FormBuilder,
    //private router: Router,
    private serviceForm: FormService,
    public serviceDepartamento: DepartamentosService,
    public serviceCiudad: CiudadService
  ) {
    this.myForm = this.fb.group({
      modelo: ['', [Validators.required]],
      nombre_completo: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      numero_celular: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('[0-9 ]*'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      // ubicacion
      departamento: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
    });

    this.optionsmodelo.push({ modelo: 'SELECCIONAR', value: '' });
    this.optionsdepartamento.push({ id: '0', departamento: 'SELECCIONAR' });
    this.optionsciudad.push({ ciudad: 'SELECCIONAR', id: 0 });
  }

  ngOnInit(): void {
    this.hora = new Date();

    this.optionsmodelo = [
      { modelo: 'XLV', value: 'XLV' },
      { modelo: 'KORANDO', value: 'KORANDO' },
      { modelo: 'REXTON', value: 'REXTON' },
    ];

    this.serviceDepartamento.findAll().subscribe((data: any) => {
      this.optionsdepartamento.push(...data);
      console.log(this.optionsdepartamento);
    });
  }

  ciudadSelect(departamento: string): void {
    console.log(departamento);

    this.serviceCiudad
      .findByDepartamento(departamento)
      .subscribe((data: any) => {
        this.optionsciudad = [];
        this.optionsciudad.push(...data);
      });
  }

  guardar(): void {
    const horaEnvio = moment(this.hora).format('HH:mm:ss');

    this.form.modelo = this.myForm.value.modelo;
    this.form.nombre_completo = this.myForm.value.nombre_completo;
    this.form.numero_celular = this.myForm.value.numero_celular;
    this.form.email = this.myForm.value.email;
    this.form.ciudad = this.myForm.value.ciudad;
    this.form.departamento = this.myForm.value.departamento;
    this.form.fechacreacion = moment(this.myForm.value.fechacreacion).format(
      'YYYY-MM-DD'
    );
    this.form.horacreacion = horaEnvio;

    if (this.form) {
      this.serviceForm.create(this.form).subscribe((data) => {
        console.log(data);

        /* if (data.message === 'Save Success') {
          setTimeout(() => {
            this.router.navigate(['/form/form-add/'], {
              queryParams: { id: data._id, title: 'Form' },
            });
          }, 2000);
        } else if (data.message === 'Same day') {
        } else {
        } */
      });

      this.serviceForm.sendEmail(this.form).subscribe((data) => {
        console.log(data);
      });
    } else {
    }
  }
}
