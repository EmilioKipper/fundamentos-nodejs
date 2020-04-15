import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const initialValues = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = transactions.reduce((obj, currentItem) => {
      const balanceValues = obj;

      if (currentItem.type === 'income')
        balanceValues.income += currentItem.value;

      if (currentItem.type === 'outcome')
        balanceValues.outcome += currentItem.value;

      balanceValues.total = balanceValues.income - balanceValues.outcome;

      return balanceValues;
    }, initialValues);

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
