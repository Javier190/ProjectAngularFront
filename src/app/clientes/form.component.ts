import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router , ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  private cliente : Cliente = new Cliente();                //ngModel es para poblar con los datos del formulario al objeto cliente ysus atributos. En ottras palabras hace un Binding
  private titulo : string = "Crear Cliente";                                                           //ngModel(enlazar/binding) es como el findviewbyID. Sirve para pasar datos del form al backend o recuperar info que venga desde el back/servidor

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute ) {}                                       
  ngOnInit() {
    this.cargarCliente();   //el metodo no se llama de ningun boton , solo se ejecuta al inicio
  }

      cargarCliente() : void {          //aca esta preguntando si la id viene con datos, que se asigne el parametros de la consulta, al atributo de la clase (this.cliente) para poder mostrarse por pantalla
      this.activatedRoute.params.subscribe(params => {  //activated route servia para obtener id que estamos pasando por URl, luego se hacia la consulta por el servicio y luego se pasaba a este metodo cargarcliente() video 330 para repasar este codigo.

        let id = params['id']
        if(id){
          this.clienteService.getCliente(id).subscribe( (cliente ) => this.cliente = cliente)
        }
      } )
      }


      create() : void{                                                  //La idea es que el metodo create se conecte a la API REst para persistir la informacion del nuevo cliente

      this.clienteService.create(this.cliente).subscribe(
        response => {
        
        this.router.navigate(['/clientes'])
        swal('Nuevo cliente', `Cliente ${this.cliente.nombre} creado con exito!`, 'success')
      }
      )
    }

  update() : void {
    this.clienteService.update(this.cliente). subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con exito`, 'success')
      }
    )
  }

  



//Se usa el create() del cliente.service.ts, por lo que se inyecta
//response es lo que se recibe. Una vez que se creo el objeto, retorna la respuesta y esta contiene el objeto creado
//y la idea es redirigir al listado de nuevo para mostrar el listado con los cambios. por eso usamos
//luego angularRouter para redirigir a la lista
}
