export class NotEnoughInBalanceException extends Error {
    constructor(message: string) {
      super(message);
      this.name = "notEnoughInBalanceException"; 
    }
}

export class AmountIsNegativeException extends Error {
    constructor(message: string) {
      super(message);
      this.name = "AmountIsNegativeException"; 
    }
}

export class BalanceIsNegativeException extends Error {
    constructor(message: string) {
      super(message);
      this.name = "BalanceIsNegativeException"; 
    }
}

export class Transaction {
    constructor(private _date: Date, private _amount: number, private _balance: number) {}

    get date(): Date {
        return this._date;
    }

    get amount(): number {
        return this._amount;
    }

    get balance(): number {
        return this._balance;
    }

}

export class Account {

    private _transactions: Transaction[]

    constructor(private _balance: number) {
        if (_balance < 0) {
            throw new BalanceIsNegativeException("Initial balance cannot be negative");
        }
        this._transactions = [];
    }

    deposit(amount: number): void {
        this.validateAmount(amount)
        this._balance += amount;
        this._transactions.push(new Transaction(new Date(), amount, this._balance));
    }

    withdraw(amount: number): void {
        this.validateAmount(amount)
        if (amount > this.balance) {
            throw new NotEnoughInBalanceException("Insufficient funds");
        }
        this._balance -= amount;
        this._transactions.push(new Transaction(new Date(), -amount, this._balance));
    }

    printStatement(): string {
        let statement = "Date        Amount  Balance\n";
        this._transactions.forEach(transaction => {
            statement += `${transaction.date.toLocaleDateString()}   ${transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount)}      ${transaction.balance}\n`;
        });
        return statement;
    }

    get balance(): number {
        return this._balance;
    }

    get transactions(): Transaction[] {
        return this._transactions;
    }

    private validateAmount(amount: number): void {
        if (amount <= 0) {
            throw new AmountIsNegativeException("Amount must be positive");
        }
    }
}