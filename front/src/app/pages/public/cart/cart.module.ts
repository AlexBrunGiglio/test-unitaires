import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasePageModulesList } from '../../../app.module';
import { CartComponent } from './cart.component';

const routes = [{
    path: '',
    component: CartComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
    ],
    declarations: [
        CartComponent
    ],
    exports: [RouterModule],
})
export class CartModule { }