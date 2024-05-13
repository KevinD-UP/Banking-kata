import { expect } from 'chai'
import { 
    Account,
    NotEnoughInBalanceException,
    AmountIsNegativeException,
    BalanceIsNegativeException,
    Transaction 
} from '../src/main'

describe('Account class', () => {
    let account: Account;

    beforeEach(() => {
        account = new Account(100);
    });

    describe('Account - deposit()', () => {
        it("should deposit money into the account", () => {
            account.deposit(50);
            expect(account.getBalance()).to.equal(150);
        });
        it("should not allow negative deposit amount", () => {
            expect(() => account.deposit(-50)).to.throw(AmountIsNegativeException);
        });
    })

    describe('Account - withdraw()', () => {
        it("should not allow withdrawal of more money than the account balance", () => {
            expect(() => account.withdraw(150)).to.throw(NotEnoughInBalanceException);
        });

        it("should withdraw money from the account", () => {
            account.withdraw(50);
            expect(account.getBalance()).to.equal(50);
        });

        it("should not allow negative withdrawal amount", () => {
            expect(() => account.withdraw(-50)).to.throw(AmountIsNegativeException);
        });
    })

    describe('Account - printStatement()', () => {
        it("should print the account statement", () => {
            account.deposit(500);
            account.withdraw(100);
            const expectedStatement = "Date        Amount  Balance\n" +
                                    `${new Date().toLocaleDateString()}   +500      600\n` +
                                    `${new Date().toLocaleDateString()}   -100      500\n`;
            expect(account.printStatement()).to.equal(expectedStatement);
        });
    })

    it('should throw an error when trying to create an account with a negative balance', () => {
        expect(() => new Account(-500)).to.throw(BalanceIsNegativeException); // Vérifie qu'une exception est lancée
    });
})