import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../utils/shared.module";
import { RequestPermissionComponent } from "./request-permission/request-permission.component";
import { FormsComponent } from "./request-permission/forms/forms.component";
import { PermissionRequestAdminComponent } from "./permission-request-admin/permission-request-admin.component";
import { FormsAdminComponent } from "./permission-request-admin/forms/forms.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "", component: RequestPermissionComponent },
      { path: "admin", component: PermissionRequestAdminComponent },
    ]),
    SharedModule,
  ],
  declarations: [
    RequestPermissionComponent,
    FormsComponent,
    PermissionRequestAdminComponent,
    FormsAdminComponent
  ],
  entryComponents: [FormsComponent],
  exports: [RouterModule],
})
export class RequestPermissionModule {}
