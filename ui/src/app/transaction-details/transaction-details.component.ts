import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
export class TransactionDetailsComponent {
  isEditable = true; 
  transaction: any;
  Comments: string = "";

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as {
      transaction: any;
    };
    this.transaction = state;
    this.Comments = this.transaction.Comments;
  }

  goBack() {
    this.router.navigate(['/transactions']);
  }

  updateRecords(data: String)
  {
    const dateObject = new Date(this.transaction.date);
    const unixTimestampMs = dateObject.getTime();

    let bodyData = {
      "id": this.transaction.id,
      "date": unixTimestampMs,
      "sender": {
        "firstName": this.transaction.sender.firstName,
        "lastName": this.transaction.sender.lastName,
        "dateOfBirth": this.transaction.sender.dateOfBirth,
        "IDNumber": this.transaction.sender.IDNumber
      },
      "recipient": {
        "firstName": this.transaction.recipient.firstName,
        "lastName": this.transaction.recipient.lastName,
        "email": this.transaction.recipient.email,
        "accountNumber": this.transaction.recipient.accountNumber,
        "bank": this.transaction.recipient.bank
      },
      "Amount": this.transaction.Amount,
      "CurrencyCd": this.transaction.CurrencyCd,
      "Comments": data,
      "status": this.transaction.status
    };
    console.log(bodyData);
    this.http.put("http://localhost:3000/transactions/update/"+ this.transaction._id,bodyData).subscribe((resultData: any)=>
    {
        alert("Transactions details updated");
        this.router.navigate(['/transactions']);
    });
  }
}