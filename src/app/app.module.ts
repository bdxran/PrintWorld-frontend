import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ModelManagementComponent } from './model-management/model-management.component';
import { ModelCardComponent } from './model-management/model-card/model-card.component';
import { ModelCreateComponent } from './model-management/model-create/model-create.component';
import { ModelModifyComponent } from './model-management/model-modify/model-modify.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModelManagementComponent,
    ModelCardComponent,
    ModelCreateComponent,
    ModelModifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
