import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BasePageModulesList } from "../../../../app.module";
import { AdminDrawerModule } from "../../../../components/admin-drawer/admin-drawer.module";
import { UsersListComponent } from "./users-list.component";

const routes = [{
    path: '',
    component: UsersListComponent,
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ...BasePageModulesList,
        AdminDrawerModule,
    ],
    declarations: [
        UsersListComponent
    ],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersListModule { }