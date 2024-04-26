import { validate } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

describe('PaginationQueryDto', () => {
  let dto: PaginationQueryDto;

  beforeEach(() => {
    dto = new PaginationQueryDto();
  });

  it('should be valid when all optional fields are absent', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should be valid when limit and offset are positive numbers', async () => {
    dto.limit = 10;
    dto.offset = 1;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when limit is a negative number', async () => {
    dto.limit = -10;
    dto.offset = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isPositive).toBeDefined();
  });

  it('should fail validation when offset is a negative number', async () => {
    dto.limit = 10;
    dto.offset = -5;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isPositive).toBeDefined();
  });
});
