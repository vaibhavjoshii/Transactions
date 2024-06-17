import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { TransactionDetailsComponent } from "./transaction-details/transaction-details.component";

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        AppComponent,
        TransactionsComponent,
        TransactionDetailsComponent
    ],
    providers: []
})

export class AppModule {}