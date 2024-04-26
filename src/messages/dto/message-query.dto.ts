import { IsOptional, IsUUID } from 'class-validator';

export class MessageQueryDto {
  @IsOptional()
  @IsUUID()
  senderId: string;

  @IsOptional()
  @IsUUID()
  recipientId: string;
}
