import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'boards',
    loadChildren: './boards/boards.module#BoardsModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        useHash: true,
        preloadingStrategy: PreloadAllModules
      })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
