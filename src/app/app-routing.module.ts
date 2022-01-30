import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full' },
  {path:'home', component:HomeComponent },
  {path:'about', component:AboutComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
