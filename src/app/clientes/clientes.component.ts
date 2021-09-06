import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})

export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }  //reco4rdar que asi se inyectaban dependencias, a traves del constructor

  ngOnInit() {
    this.clienteService.getClientes().subscribe(    //recordar que this.clientes hace referencia al atributo de la clase
       clientes => this.clientes = clientes        //getClientes es un observable. y aqui se esta pasando la info nueva de clientes a this.clientes y esto se pasa a la vista
    );
  }

  
  delete (cliente : Cliente) : void {
    //this.clienteService.delete(cliente.id).subscribe( 
      //response => this.clientes.filter(cli => cli !== cliente )) 
      //Este metodo solo borra, hay que actualizar apr ver los cambios, usalo si no funciona ssweetalert
    

      swal({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
  
          this.clienteService.delete(cliente.id).subscribe(
            response => {
              this.clientes = this.clientes.filter(cli => cli !== cliente)
              swal(
                'Cliente Eliminado!',
                `Cliente ${cliente.nombre} eliminado con éxito.`,
                'success'
              )
            }
          )
  
        }
      })
   
    

  }



}
