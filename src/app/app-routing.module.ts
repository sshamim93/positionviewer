import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientHoldingComponent } from './client-holding/client-holding';
import { AssetHoldingComponent } from './asset-holding/asset-holding';
import { DepotHoldingComponent } from './depot-holding/depot-holding';
import { AgreementHoldingComponent } from './agreement-holding/agreement-holding';

const routes: Routes = [
  {
    path: 'account',
    component: ClientHoldingComponent
  },
  {
    path: 'instrument',
    component: AssetHoldingComponent
  },
  {
    path: 'markets',
    component: DepotHoldingComponent
  },
  {
    path: 'agreement',
    component: AgreementHoldingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
