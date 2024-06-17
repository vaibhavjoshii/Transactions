import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionsComponent } from "./transactions/transactions.component";
import { TransactionDetailsComponent } from "./transaction-details/transaction-details.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TransactionsComponent, TransactionDetailsComponent]
})
export class AppComponent {
  title = 'Transaction';
}
