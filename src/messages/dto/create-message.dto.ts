import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'UUID do remetente da mensagem' })
  @IsUUID()
  senderId: string;

  @ApiProperty({ description: 'Nome do remetente da mensagem' })
  @IsString()
  senderName: string;

  @ApiProperty({ description: 'UUID do destinatário da mensagem' })
  @IsUUID()
  recipientId: string;

  @ApiProperty({ description: 'Nome do destinatário da mensagem' })
  @IsString()
  recipientName: string;

  @ApiProperty({ description: 'Conteúdo da mensagem' })
  @IsString()
  messageContent: string;

  @ApiProperty({
    description: 'URL de link associado com a mensagem',
    required: false,
  })
  @IsOptional()
  @IsString()
  linkUrl?: string;

  @ApiProperty({
    description: 'Tipo de entrega da mensagem',
    enum: ['push-message', 'message', 'push'],
  })
  @IsEnum(['push-message', 'message', 'push'])
  deliveryType: string;

  @ApiProperty({
    description: 'Tipo de mensagem',
    enum: ['internal-link', 'external-link', 'no-link'],
  })
  @IsEnum(['internal-link', 'external-link', 'no-link'])
  messageType: string;

  @ApiProperty({
    description: 'Estado de leitura da mensagem',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  messageRead?: boolean = false;
}
