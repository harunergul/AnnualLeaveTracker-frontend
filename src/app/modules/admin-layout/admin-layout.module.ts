import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~utils/shared.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardModule } from '~modules/dashboard/dashboard.module';
import { RequestPermissionModule} from '~modules/request-permission/request-permission.module';
import { ClientModule } from '~modules/client/client.module';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    DashboardModule, 
    RequestPermissionModule
  ],
  declarations: [
    AdminLayoutComponent
  ],
  providers: [],
  exports: []
})
export class AdminLayoutModule {
}
