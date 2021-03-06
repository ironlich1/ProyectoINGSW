import { Component, OnInit, Inject,forwardRef } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Paciente } from 'src/app/modelosapi/modelosapi.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  paciente:Paciente = new Paciente();
  prevision = new Array();
  sexo = new Array();
  rut_paciente

  constructor(private acRoute:ActivatedRoute, public alertController: AlertController,
              private apiRest: ApiService, private router:Router, private location:Location) {
                
              }

  ngOnInit() {
    this.rut_paciente = this.acRoute.snapshot.paramMap.get('rut_paciente');
    console.log(JSON.parse(this.acRoute.snapshot.params.pacEditar))
    this.paciente = new Paciente(JSON.parse(this.acRoute.snapshot.params.pacEditar))
    this.apiRest.Prevision().subscribe(previsiones =>{
      this.prevision = previsiones;
    },error=>{
      console.log("No previsiones")
    })
    this.apiRest.Sexo().subscribe(sexos =>{
      this.sexo = sexos;
    }, error =>{
      console.log("No sexos")
    })
    
  }

  myBackButton(){
    this.location.back();
    console.log(this.location)
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Actualizacion de registro del paciente',
      message: 'Se cancelará la actualización del registro del paciente. ¿Desea continuar?',
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

  ActualizarPaciente(pac:Paciente,rut:number){
    this.apiRest.ActualizarPaciente(pac,rut).subscribe(data=>{
      alert("Datos del paciente actualizados")
      this.router.navigate(['pacientes',])
    }, error =>{
      alert("Error al actualizar los datos del paciente")
  })
  
  }
}
