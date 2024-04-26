import { validate } from 'class-validator';
import { MessageQueryDto } from './message-query.dto';

describe('MessageQueryDto', () => {
  let queryDto: MessageQueryDto;

  beforeEach(() => {
    queryDto = new MessageQueryDto();
  });

  it('should be valid when all optional fields are absent', async () => {
    const errors = await validate(queryDto);
    expect(errors.length).toBe(0);
  });

  it('should be valid when senderId is a valid UUID', async () => {
    queryDto.senderId = '123e4567-e89b-12d3-a456-426614174000';
    const errors = await validate(queryDto);
    expect(errors.length).toBe(0);
  });

  it('should be valid when recipientId is a valid UUID', async () => {
    queryDto.recipientId = '123e4567-e89b-12d3-a456-426614174000';
    const errors = await validate(queryDto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when senderId is an invalid UUID', async () => {
    queryDto.senderId = 'invalid-uuid';
    const errors = await validate(queryDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isUuid).toBeDefined();
  });

  it('should fail validation when recipientId is an invalid UUID', async () => {
    queryDto.recipientId = 'invalid-uuid';
    const errors = await validate(queryDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isUuid).toBeDefined();
  });
});
