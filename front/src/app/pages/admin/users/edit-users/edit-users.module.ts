import { OverlayModule } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BasePageModulesList } from "../../../../app.module";
import { AdminDrawerModule } from "../../../../components/admin-drawer/admin-drawer.module";
import { EditUsersComponent } from "./edit-users.component";

const routes = [{
    path: '',
    component: EditUsersComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
        AdminDrawerModule,
        OverlayModule
    ],
    declarations: [
        EditUsersComponent
    ],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditUsersModule { }