import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, Paciente, Prevision, Sexo, Pariente, Parentezco, Especialidad, Control, Diagnostico, Interconsulta,
         Exlab, Medico, Indicacion } from '../modelosapi/modelosapi.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isLogged:any = false;
  
  constructor(public http: HttpClient,public afAuth:AngularFireAuth){
    afAuth.authState.subscribe(user => (this.isLogged = user));
  }

  //login
  async onLogin(user:User){
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log('Error en el login',error);
    }
  }

  //register
  async onRegister(user:User){
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log('Error al registrar',error);
    }
  }

  ActualizarPariente(Pariente:Pariente, rutpac:number): Observable<any>{
    return this.http.patch<any>("http://localhost:5000/pacientes/actualizarpariente/" + rutpac,Pariente)
  }
  ActualizarPaciente(Paciente:Paciente, rutpac:number): Observable<any>{
    return this.http.patch<any>("http://localhost:5000/pacientes/actualizarpaciente/" + rutpac,Paciente)
  }
  AgregarComentIntercon(i:Interconsulta,id_intercon:number): Observable<any>{
    return this.http.patch<any>("http://localhost:5000/pacientes/addcommentintercon/"+id_intercon,i);
  }
  AgregarPaciente(Paciente: Paciente): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarpaciente",Paciente);
  }
  AgregarControl(Control: Control): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarcontrol",Control);
  }
  AgregarPariente(Pariente: Pariente): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarpariente",Pariente);
  }
  AgregarExlab(Exlab:Exlab): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarexlab",Exlab);
  }
  AgregarDiagnostico(Diagnostico:Diagnostico): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresardiagnostico",Diagnostico);
  }
  AgregarIndicacion(Indicacion:Indicacion): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarindicacion",Indicacion);
  }
  EliminarPaciente(rutpac:number): Observable<any>{
    return this.http.delete<any>("http://localhost:5000/pacientes/eliminarpaciente/" + rutpac)
  }
  EliminarPariente(rutpar:number): Observable<any>{
    return this.http.delete<any>("http://localhost:5000/pacientes/eliminarpariente/" + rutpar)
  }
  EliminarInterconsulta(idintercon:number): Observable<any>{
    return this.http.delete<any>("http://localhost:5000/pacientes/eliminarinterconsulta/" + idintercon)
  }
  EliminarControl(idcontrol:number): Observable<any>{
    return this.http.delete<any>("http://localhost:5000/pacientes/eliminarcontrol/"+idcontrol)
  }
  VerPacientes(): Observable <Paciente[]> {
    return this.http.get<Paciente[]>("http://localhost:5000/pacientes");
  }
  VerPerfilPaciente(rut_pac:number): Observable <Paciente[]> {
    return this.http.get<Paciente[]>("http://localhost:5000/pacientes/"+rut_pac);
  }
  VerParientes(rutpac:number): Observable <Pariente[]> {
    return this.http.get<Pariente[]>("http://localhost:5000/parientes/" + rutpac);
  }
  VerInterconsulta(rut_pac:number,id_intercon:number):Observable <Interconsulta[]> {
    return this.http.get<Interconsulta[]>("http://localhost:5000/lastInterconsulta/"+rut_pac+"/"+id_intercon);
  }
  AgregarInterconsulta(Interconsulta: Interconsulta): Observable<any>{
    return this.http.post<any>("http://localhost:5000/pacientes/ingresarinterconsulta",Interconsulta);
  }
  Prevision():Observable <Prevision[]> {
    return this.http.get<Prevision[]>("http://localhost:5000/previsiones");
  }
  Sexo():Observable <Sexo[]> {
    return this.http.get<Sexo[]>("http://localhost:5000/sexos");
  }
  Parentezco():Observable <Parentezco[]> {
    return this.http.get<Parentezco[]>("http://localhost:5000/parentezcos");
  }
  Especialidad():Observable <Especialidad[]> {
    return this.http.get<Especialidad[]>("http://localhost:5000/especialidades");
  }
  Medico():Observable <Medico[]> {
    return this.http.get<Medico[]>("http://localhost:5000/medicos");
  }
  VerUltimaInterconsulta(): Observable <Interconsulta[]> {
    return this.http.get<Interconsulta[]>("http://localhost:5000/lastIntercon");
  }
  VerUltimoControl(id_intercon): Observable <Control[]> {
    return this.http.get<Control[]>("http://localhost:5000/lastControl/"+id_intercon);
  }
  VerHistorial(rut_pac:number): Observable <any> {
    return this.http.get<any>("http://localhost:5000/historial/"+rut_pac);
  }
  VerDiagnostico(id_intercon:number): Observable <Diagnostico[]> {
    return this.http.get<Diagnostico[]>("http://localhost:5000/historial/diagnostico/"+id_intercon);
  }
  VerIndicacion(id_intercon:number): Observable <Indicacion[]> {
    return this.http.get<Indicacion[]>("http://localhost:5000/historial/indicacion/"+id_intercon);
  }
  VerInterconsultaHistorial(rut_pac:number,id_intercon:number): Observable <any> {
    return this.http.get<any>("http://localhost:5000/historial/"+rut_pac+"/"+id_intercon);
  }
  ListarCtrles(id_intercon:number): Observable <any> {
    return this.http.get<any>("http://localhost:5000/control/"+id_intercon);
  }
  ExlabCtrl(id_control:number): Observable <any> {
    return this.http.get<any>("http://localhost:5000/exlab/"+id_control);
  }
}