import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

export class Expense {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ type: User })
  payer!: User;

  @ApiProperty({ type: User })
  beneficiary!: User;

  @ApiProperty({ example: 50 })
  amount!: number;

  @ApiProperty({ example: 'Dinner' })
  description!: string;

  @ApiProperty({ example: '2026-09-24T18:30:00.000Z' })
  createdAt!: string;
}

export class Balance {
  @ApiProperty({ type: User })
  debtor!: User;

  @ApiProperty({ type: User })
  creditor!: User;

  @ApiProperty({ example: 120 })
  amount!: number;
}
