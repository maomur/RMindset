
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum Category {
  CLF = 'Inversión (CLF)',
  SAVINGS = 'Ahorro a Largo Plazo',
  EDUCATION = 'Formación',
  PLAY = 'Juego y Ocio',
  GIVE = 'Donaciones',
  GENERAL = 'Gasto General'
}

export enum UserLevel {
  HABITS = 'habits',
  ARCHITECT = 'architect',
  MASTER = 'master'
}

export interface Transaction {
  id: string;
  concept: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: Category;
  parentIncomeId?: string;
}
