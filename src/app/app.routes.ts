import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { AboutComponent } from './Component/about/about.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HomeComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
