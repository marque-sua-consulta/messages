import { validate } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

describe('CreateMessageDto', () => {
  let dto: CreateMessageDto;

  beforeEach(() => {
    dto = new CreateMessageDto();
    dto.senderId = '123e4567-e89b-12d3-a456-426614174000';
    dto.senderName = 'John Doe';
    dto.recipientId = '123e4567-e89b-12d3-a456-426614174000';
    dto.recipientName = 'Jane Doe';
    dto.messageContent = 'Hello, this is a test message';
    dto.linkUrl = 'http://example.com';
    dto.deliveryType = 'push-message';
    dto.messageType = 'internal-link';
    dto.messageRead = false;
  });

  it('should validate with correct data', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0); // Expect no errors if the DTO is correct
  });

  it('should fail validation if senderId is not a valid UUID', async () => {
    dto.senderId = 'invalid-uuid';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Expect errors
  });

  // Similar tests for other fields...

  it('should fail validation if deliveryType is not in the enum', async () => {
    dto.deliveryType = 'invalid-type'; // Invalid delivery type
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Expect errors
  });

  it('should accept optional fields as undefined', async () => {
    dto.linkUrl = undefined; // Optional field
    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No errors should be present
  });

  it('should handle optional boolean correctly', async () => {
    dto.messageRead = undefined; // Optional boolean field
    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No errors should be present
  });
});
