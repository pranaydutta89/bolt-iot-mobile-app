import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { ComponentsModule } from '../components/components.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginPage
            }
        ])
    ],
    declarations: [LoginPage]
})
export class LoginPageModule { }
