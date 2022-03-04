import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasePageModulesList } from '../../../app.module';
import { DetailsCharacterComponent } from './details-character.component';

const routes = [{
    path: '',
    component: DetailsCharacterComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
    ],
    declarations: [
        DetailsCharacterComponent
    ],
    exports: [RouterModule],
})
export class DetailsCharacterModule { }