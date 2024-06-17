import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

export const routes: Routes = [
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transaction-details', component: TransactionDetailsComponent },
  { path: '', redirectTo: '/transactions', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
