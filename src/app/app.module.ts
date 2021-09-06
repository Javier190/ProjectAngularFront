import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms'

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,   //este nos permite poder conectarnos con el servidor (backend)
    FormsModule,                    
    RouterModule.forRoot(routes)            //importante para poder uesar el routing
  ],
  providers: [ClienteService],              //aca van los services
  bootstrap: [AppComponent]
})
export class AppModule { }

//Para poder usar el routing:
//primero importa RouterModule, Routes
//crea las rutas en como esta hecho mas arriba en el arreglo
//agregar RouterModule for root en imports
//en el html principal se dejo router outlet y en el html header se uso routerLink