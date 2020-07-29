import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientHoldingComponent } from './client-holding/client-holding';
import { DepotHoldingComponent } from './depot-holding/depot-holding';
import { AssetHoldingComponent } from './asset-holding/asset-holding';
import { AgreementHoldingComponent } from './agreement-holding/agreement-holding';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule } from '@angular/common/http';

import { PositionService } from './position.service';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ClientHoldingComponent,
    DepotHoldingComponent,
    AssetHoldingComponent,
    AgreementHoldingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    [...modules],
  ],
  providers: [PositionService],
  bootstrap: [AppComponent],
})
export class AppModule { }
