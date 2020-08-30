import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions: Transaction[] = await this.find();

    const income = transactions.reduce((total, item) => {
      if (item.type === 'income') {
        return total + item.value;
      }

      return total;
    }, 0);

    const outcome = transactions.reduce((total, item) => {
      if (item.type === 'outcome') {
        return total + item.value;
      }

      return total;
    }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
