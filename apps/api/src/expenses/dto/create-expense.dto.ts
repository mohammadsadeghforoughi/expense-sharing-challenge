import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'alice' })
  @IsString()
  @IsNotEmpty()
  payerId!: string;

  @ApiProperty({ example: 'bob' })
  @IsString()
  @IsNotEmpty()
  beneficiaryId!: string;

  @ApiProperty({ example: 50, description: 'Amount in currency units' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(1000000)
  amount!: number;

  @ApiProperty({ example: 'Dinner' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  description!: string;
}
