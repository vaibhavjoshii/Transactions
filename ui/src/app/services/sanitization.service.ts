import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SanitizationService {

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeInput(input: any): string {
    return this.sanitizer.sanitize(SecurityContext.HTML, input) || '';
  }

  validateAndSanitize(bodyData: any): any {
    return {
      id: this.sanitizeInput(bodyData.id),
      date: bodyData.date, // Assuming this is a number, not needing sanitization
      sender: {
        firstName: this.sanitizeInput(bodyData.sender.firstName),
        lastName: this.sanitizeInput(bodyData.sender.lastName),
        dateOfBirth: this.sanitizeInput(bodyData.sender.dateOfBirth),
        IDNumber: this.sanitizeInput(bodyData.sender.IDNumber),
      },
      recipient: {
        firstName: this.sanitizeInput(bodyData.recipient.firstName),
        lastName: this.sanitizeInput(bodyData.recipient.lastName),
        email: this.sanitizeInput(bodyData.recipient.email),
        accountNumber: this.sanitizeInput(bodyData.recipient.accountNumber),
        bank: this.sanitizeInput(bodyData.recipient.bank),
      },
      Amount: bodyData.Amount, // Assuming this is a number, not needing sanitization
      CurrencyCd: this.sanitizeInput(bodyData.CurrencyCd),
      Comments: this.sanitizeInput(bodyData.Comments),
      status: this.sanitizeInput(bodyData.status),
    };
  }

  isBodyDataComplete(bodyData: any): boolean {
    // Check if any field in the bodyData is missing or empty
    return Object.values(bodyData).every(value => {
      if (typeof value === 'object') {
        return this.isBodyDataComplete(value);
      }
      return value !== undefined && value !== null && value !== '';
    });
  }
}
