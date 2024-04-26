import { IsOptional, IsPositive, IsUUID } from 'class-validator';

export class MessagePaginationWrapperDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  @IsUUID()
  senderId: string;

  @IsOptional()
  @IsUUID()
  recipientId: string;
}
