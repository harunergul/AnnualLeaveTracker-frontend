import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../utils/shared.module";
import { RequestPermissionComponent } from "./request-permission/request-permission.component";
import { FormsComponent } from "./request-permission/forms/forms.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: RequestPermissionComponent },
    ]),
    SharedModule,
    
  ],
  declarations: [RequestPermissionComponent, FormsComponent],
  entryComponents: [
    FormsComponent
  ],
  exports: [RouterModule],
})
export class RequestPermissionModule {}
