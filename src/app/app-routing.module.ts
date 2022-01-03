import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModelManagementComponent} from "./model-management/model-management.component";
import {ModelModifyComponent} from "./model-management/model-modify/model-modify.component";
import {ModelCreateComponent} from "./model-management/model-create/model-create.component";

const routes: Routes = [
  {path: "", component: ModelManagementComponent},
  {path: "createModel", component: ModelCreateComponent},
  {path: "modifyModel/:id", component: ModelModifyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
