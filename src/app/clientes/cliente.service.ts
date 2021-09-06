import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

//proyecto hecho hasta vbideo 343, ...344 no lo hice, es decir validacion desde Spring backend no la realize


@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient, private router : Router) { }      //inyectando el HTTPCliente que nos permite conectar al backend

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})


  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);                    //con esta linea este servicio traia ese JSON de manera estatica y local, era soolo como ejemplo
    return this.http.get(this.urlEndPoint).pipe(            //La respuesta o retorno del http.get devuelve un objeto tipo JSON, por lo que hay que castear para transformarla y poder usar su data. Para que luego devuevla una respuesta de tipo lista Cliente
    
      map(response => response as Cliente[])          
    //return this.http.get<Cliente[]>(this.urlEndpoint) es otra forma de escribirl el return, ambos devuelven una lista Cliente[]
      );
  }

  //En este metodo CREATE se recibe objeto cliente pero formato JSON, y devuelve un tipo observbable cliente que es el objeto que se acaba de crear 
  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(         //el ultimo parametro headers no explica que es

      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
        
      })
    );          
  
  
  
  } 

  getCliente(id) : Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(      //del pipe en adelante es para manejo de error desde el front/usuario
      catchError(e => {                                                    //y este codigo dsps del pipe dice que si llega a haber algun error en la peticion http, que rediriga a clientes y que muestre una ventana con los errores de e.
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  update(cliente : Cliente) : Observable<Cliente>{
  return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
      
    })
  )
  }

  delete(id : Number) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
        
      })
    )
  }

}

//Esta clase sera service la encargada de obtener toda la informacion del servidor(backend) para desacoplar nuestros componentes.
//Observable es una API y esta basado en que un sujeto es observable, en este caso cliente,
//y se tienen observadores que estan atentos y ven si tiene cambios el observable(cliente), Si clientes llega a cambiar
//su estado, se notifica a los observadores y se gatilla un cambio o algo ocurre un proceso.
//Entonces al cambiar un dato en el servidor, en los cliente, automaticamente se notifique el cambio y se modifique\
// en el cliente (front con angular), sin tener que recargar la pagina. Solo ocurriendo cuando
//cambie el estado del cliente(observable )