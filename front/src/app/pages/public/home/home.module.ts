import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasePageModulesList } from '../../../app.module';
import { HomePublicComponent } from './home.component';

const routes = [{
    path: '',
    component: HomePublicComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
        OverlayModule
    ],
    declarations: [
        HomePublicComponent,
    ],
    exports: [RouterModule],
})
export class HomePublicModule { }