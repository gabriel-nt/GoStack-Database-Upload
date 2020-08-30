import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const categoriesRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionRepository);

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Type not permited');
    }

    if (type === 'outcome') {
      const balance = await transactionRepository.getBalance();

      if (value > balance.total) {
        throw new AppError(
          'Invalid create outcome transaction without a valid balance',
        );
      }
    }

    const checkCategoryExist = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!checkCategoryExist) {
      const createCategory = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(createCategory);

      const transaction = transactionRepository.create({
        title,
        type,
        value,
        category_id: createCategory.id,
      });

      await transactionRepository.save(transaction);

      return transaction;
    }

    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category_id: checkCategoryExist.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
