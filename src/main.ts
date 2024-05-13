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
    date: Date;
    amount: number;
    balance: number;

    constructor(date: Date, amount: number, balance: number) {
        this.date = date;
        this.amount = amount;
        this.balance = balance;
    }
}

export class Account {

    private transactions: Transaction[]

    constructor(private balance: number) {
        if (balance < 0) {
            throw new BalanceIsNegativeException("Initial balance cannot be negative");
        }
        this.transactions = [];
    }

    deposit(amount: number): void {
        this.validateAmount(amount)
        this.balance += amount;
        this.transactions.push(new Transaction(new Date(), amount, this.balance));
    }

    withdraw(amount: number): void {
        this.validateAmount(amount)
        if (amount > this.balance) {
            throw new NotEnoughInBalanceException("Insufficient funds");
        }
        this.balance -= amount;
        this.transactions.push(new Transaction(new Date(), -amount, this.balance));
    }

    printStatement(): string {
        let statement = "Date        Amount  Balance\n";
        this.transactions.forEach(transaction => {
            statement += `${transaction.date.toLocaleDateString()}   ${transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount)}      ${transaction.balance}\n`;
        });
        return statement;
    }

    getBalance(): number {
        return this.balance;
    }

    getTransactions(): Transaction[] {
        return this.transactions;
    }

    private validateAmount(amount: number): void {
        if (amount <= 0) {
            throw new AmountIsNegativeException("Amount must be positive");
        }
    }
}