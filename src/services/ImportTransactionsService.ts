import fs from 'fs';
import path from 'path';
import parse from 'csv-parse';
import { getRepository, getCustomRepository, In } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
import Transaction from '../models/Transaction';

import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';

interface Request {
  filename: string;
}

interface TransactionCSV {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute({ filename }: Request): Promise<Transaction[]> {
    const transactions: TransactionCSV[] = [];
    const categories: string[] = [];
    const categoriesRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionRepository);
    const csvPath = path.join(uploadConfig.directory, filename);

    const cvsFileReadStream = fs.createReadStream(csvPath);

    const parseConfig = parse({ delimiter: ',', from_line: 2 });

    const parseCSV = cvsFileReadStream.pipe(parseConfig);

    parseCSV.on('data', async csvrow => {
      const [title, type, value, category] = csvrow.map((row: string) =>
        row.trim(),
      );

      if (!title || !type || !value || !category) {
        throw new AppError('File CSV is incorrect');
      }

      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentCategories = await categoriesRepository.find({
      where: { title: In(categories) },
    });

    const existentCategoriesTitle = existentCategories.map(
      (category: Category) => category.title,
    );

    const addCategoryTitles = categories
      .filter(category => !existentCategoriesTitle.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoriesRepository.create(
      addCategoryTitles.map(title => ({
        title,
      })),
    );

    await categoriesRepository.save(newCategories);

    const finalCategories = [...newCategories, ...existentCategories];

    const createdTransactions = transactionRepository.create(
      transactions.map(transaction => {
        return {
          title: transaction.title,
          type: transaction.type,
          value: transaction.value,
          category: finalCategories.find(
            category => category.title === transaction.category,
          ),
        };
      }),
    );

    await transactionRepository.save(createdTransactions);

    await fs.promises.unlink(csvPath);

    return createdTransactions;
  }
}

export default ImportTransactionsService;
