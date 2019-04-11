import { DigitalModule } from './digital/digital.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DigitalListComponent } from './digital/digital.page';


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

];

@NgModule({
  imports: [
    DigitalModule,
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules, enableTracing: true
      })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
