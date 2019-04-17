import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'boards',
    loadChildren: './boards/boards.module#BoardsModule'
  },
  {
    path: 'digital',
    loadChildren: './digital/digital.module#DigitalModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules, enableTracing: true
      })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
