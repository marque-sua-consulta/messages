import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({
    required: true,
    type: String,
    match:
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  senderId: string;

  @Prop({ required: true, example: 'Jose Algusto' })
  senderName: string;

  @Prop({
    required: true,
    type: String,
    match:
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    example: '987e6543-e21b-12d3-a456-426614174999',
  })
  recipientId: string;

  @Prop({ required: true, example: 'Leon Fernanda' })
  recipientName: string;

  @Prop({
    required: true,
    example:
      'Olá, Maria! Espero que você esteja bem. Gostaria de agendar nossa reunião para a próxima semana.',
  })
  messageContent: string;

  @Prop({
    example: 'https://www.exemplo.com/reuniao',
  })
  linkUrl: string;

  @Prop({
    required: true,
    enum: ['push-message', 'message', 'push'],
    example: 'push-message',
  })
  deliveryType: string;

  @Prop({
    required: true,
    enum: ['internal-link', 'external-link', 'no-link'],
    example: 'internal-link',
  })
  messageType: string;

  @Prop({ default: false, example: false })
  messageRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
