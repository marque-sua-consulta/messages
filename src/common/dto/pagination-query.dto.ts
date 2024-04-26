import { IsOptional, IsPositive } from 'class-validator';

/* PaginationQueryDto - FINAL CODE */
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
