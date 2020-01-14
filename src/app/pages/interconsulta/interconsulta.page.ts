import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente, Interconsulta, Especialidad } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-interconsulta',
  templateUrl: './interconsulta.page.html',
  styleUrls: ['./interconsulta.page.scss'],
})
export class InterconsultaPage implements OnInit {
  paciente:Paciente
  interconsulta:Interconsulta = new Interconsulta()
  especialidad = new Array()
  medico = new Array()
  id_paciente:number

  constructor(private location:Location, private acRoute:ActivatedRoute, public alertController: AlertController,
    private apiRest: ApiService, private router:Router) {
      this.apiRest.Especialidad().subscribe(especialidades =>{
        this.especialidad = especialidades;
      },error=>{
        console.log("No especialidades")
      })
      this.apiRest.Medico().subscribe(medicos =>{
        this.medico = medicos;
      },error=>{
        console.log("No medicos")
      })
    }

  ngOnInit() {
    this.paciente = new Paciente(JSON.parse(this.acRoute.snapshot.params.pacIntercon))
    console.log(this.paciente)
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

  AgregarInterconsulta(){
    this.apiRest.AgregarInterconsulta(this.interconsulta).subscribe(res => {
      this.IngresarControl(this.interconsulta)
    }, err =>{
      alert("La interconsulta no pudo registrarse. Revise que todos los campos estén llenados.");
    })
    console.log(this.interconsulta)
  }

  AddIndexPaciente(indpac:Interconsulta){
    this.id_paciente = this.paciente['rut_paciente']
    indpac['id_paciente'] = this.id_paciente
    this.AgregarInterconsulta()
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Ingreso de registro del pariente',
      message: 'Se cancelará el ingreso del registro del pariente. ¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.myBackButton()
          }
        }
      ]
    });
    await alert.present();
  }

  IngresarControl(Interconsulta:Interconsulta){
    this.router.navigate(['/controlmedico', {id_interconsulta: JSON.stringify(Interconsulta)}])
  }

}