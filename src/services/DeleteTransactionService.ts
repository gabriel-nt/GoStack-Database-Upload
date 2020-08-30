// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    const findTransaction = await transactionRepository.findOne(id);

    if (!findTransaction) {
      throw new AppError('This transaction not exist');
    }

    await transactionRepository.remove(findTransaction);
  }
}

export default DeleteTransactionService;
