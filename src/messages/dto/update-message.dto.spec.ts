import { validate } from 'class-validator';
import { UpdateMessageDto } from './update-message.dto';

describe('UpdateMessageDto', () => {
  it('should be valid with no fields provided', async () => {
    const dto = new UpdateMessageDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No errors if no fields are provided
  });

  it('should be valid with partial fields provided', async () => {
    const dto = new UpdateMessageDto();
    dto.senderId = '123e4567-e89b-12d3-a456-426614174000'; // Valid UUID
    dto.messageContent = 'Some content'; // Valid string
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when provided senderId is invalid UUID', async () => {
    const dto = new UpdateMessageDto();
    dto.senderId = 'invalid-uuid'; // Invalid UUID
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isUuid).toBeDefined();
  });
});
