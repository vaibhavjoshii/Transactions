import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { SanitizationService } from '../services/sanitization.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  transactionArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  currenttransactionsID = "";

  id: String = "";
  date: string = "";
  senderFirstName: String = "";
  senderLastName: String = "";
  dateOfBirth: String = "";
  IDNumber: String = "";
  recipientFirstName: String = "";
  recipientLastName: String = "";
  email: String = "";
  accountNumber: String = "";
  bank: String = "";
  Amount: Number = 0;
  CurrencyCd: String = "";
  Comments: string = "";
  status: String = "";
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private transactionService: TransactionService,
    private sanitizationService: SanitizationService
   ) 
  {
    this.getAllTransactions();
  }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getAllTransactions().subscribe({
      next: (res: any) => {
        this.transactionArray = res.lists;
        this.transactionArray.forEach(item => {
          const date = new Date(item.date);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          item.formattedDate = `${day}/${month}/${year}`;
        });
      },
      error: console.log,
    });
  }

  emptyFieldValues() {
    this.id = "";
    this.date = "";
    this.senderFirstName = "";
    this.senderLastName = "";
    this.dateOfBirth = "";
    this.IDNumber = "";
    this.recipientFirstName = "";
    this.recipientLastName = "";
    this.email = "";
    this.accountNumber = "";
    this.bank = "";
    this.Amount = 0;
    this.CurrencyCd = "";
    this.Comments = '';
    this.status = "";
  }

  register() {
    const dateObject = new Date(this.date);
    const unixTimestampMs = dateObject.getTime();

    let bodyData = {
      "id": this.id,
      "date": unixTimestampMs,
      "sender": {
        "firstName": this.senderFirstName,
        "lastName": this.senderLastName,
        "dateOfBirth": this.dateOfBirth,
        "IDNumber": this.IDNumber
      },
      "recipient": {
        "firstName": this.recipientFirstName,
        "lastName": this.recipientLastName,
        "email": this.email,
        "accountNumber": this.accountNumber,
        "bank": this.bank
      },
      "Amount": this.Amount,
      "CurrencyCd": this.CurrencyCd,
      "Comments": this.Comments,
      "status": this.status
    };

    bodyData = this.sanitizationService.validateAndSanitize(bodyData);

    if (!this.sanitizationService.isBodyDataComplete(bodyData)) {
      alert("Please complete the entire form before submitting.");
      return;
    }

    this.http.post("http://localhost:3000/transactions/add",bodyData).subscribe((resultData: any)=>
    {
        alert("Transactions added Successfully");
        this.emptyFieldValues();
        this.getAllTransactions();
    });
  }

  viewTransaction(data: any) 
  {
    this.router.navigate(['transaction-details'], { state: data });
  }
  
  deleteTransaction(data: any) {
    this.http.delete("http://localhost:3000/transactions/delete/"+ data._id).subscribe((resultData: any)=>
    {
        alert("Transaction Deleted")
        this.getAllTransactions();
    });
  }
    
  save() {
    if (this.currenttransactionsID == '') {
      this.register();
    }      
  }
}
