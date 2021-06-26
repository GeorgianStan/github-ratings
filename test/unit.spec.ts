/**
 * * Test Target
 */
import Library from '../dist/node';

describe('Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    // *
    it('It should instantiate the object', async () => {
      expect(Library).toBeDefined();
    });
  });
});
