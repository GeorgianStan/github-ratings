import fetch from 'node-fetch';
jest.mock('node-fetch', () => ({
  default: jest.fn(),
}));

/**
 * * Test Target
 */
import { GithubAPI } from './github-api.service';

describe('GithubAPI Service - Unit Tests', () => {
  const service = new GithubAPI(require('node-fetch').default);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUser()', () => {
    // *
    it('It should throw an error if user is not found', async () => {
      fetch.default.mockImplementation(() =>
        Promise.resolve({
          status: 404,
        }),
      );

      await expect(service.fetchUser('...')).rejects.toThrow('User not found');
    });

    it('It should throw an error if the res status is not 200', async () => {
      const err = 'Error message';
      fetch.default.mockImplementation(() =>
        Promise.resolve({
          status: 403,
          json: () => ({ message: err }),
        }),
      );

      await expect(service.fetchUser('...')).rejects.toThrow(err);
    });

    it('Should return the user details', async () => {
      const mockBody = { key: 'value' };
      fetch.default.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: () => mockBody,
        }),
      );

      const data = await service.fetchUser('....');

      expect(data).toEqual(mockBody);
    });
  });

  describe('fetchUserRepos()', () => {
    // *
    it('It should throw an error if user is not found', async () => {
      fetch.default.mockImplementation(() =>
        Promise.resolve({
          status: 404,
        }),
      );

      await expect(service.fetchUserRepos('...')).rejects.toThrow(
        'User not found',
      );
    });

    it('It should throw an error if the res status is not 200', async () => {
      const err = 'Error message';
      fetch.default.mockImplementation(() =>
        Promise.resolve({
          status: 403,
          json: () => ({ message: err }),
        }),
      );

      await expect(service.fetchUserRepos('...')).rejects.toThrow(err);
    });

    it('It should return all user repositories with subsequent requests', async () => {
      const firstMockBody = new Array(100).fill({ key: 'value' });
      const secondMockBody = new Array(20).fill({ key: 'value' });

      jest
        .spyOn(fetch, 'default')
        .mockImplementationOnce(() =>
          Promise.resolve({
            status: 200,
            json: () => {
              return firstMockBody;
            },
          }),
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            status: 200,
            json: () => {
              return secondMockBody;
            },
          }),
        );

      const data = await service.fetchUserRepos('....');

      expect(fetch.default).toBeCalledTimes(2);
      expect(data).toEqual([...firstMockBody, ...secondMockBody]);
    });
  });

  describe('fetchUserEvents()', () => {
    // *
    it('It should throw an error if user is not found', async () => {
      fetch.default.mockImplementation(() =>
        Promise.resolve({
          status: 404,
        }),
      );

      await expect(service.fetchUserEvents('...')).rejects.toThrow(
        'User not found',
      );
    });

    it('It should throw an error if the res status is not 200', async () => {
      const err = 'Error message';
      fetch.default.mockImplementation(() =>
        Promise.resolve({
          status: 403,
          json: () => ({ message: err }),
        }),
      );

      await expect(service.fetchUserEvents('...')).rejects.toThrow(err);
    });

    it('It should return all user events with subsequent requests', async () => {
      const firstMockBody = new Array(100).fill({ key: 'value' });
      const secondMockBody = new Array(20).fill({ key: 'value' });

      jest
        .spyOn(fetch, 'default')
        .mockImplementationOnce(() =>
          Promise.resolve({
            status: 200,
            json: () => {
              return firstMockBody;
            },
          }),
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            status: 200,
            json: () => {
              return secondMockBody;
            },
          }),
        );

      const data = await service.fetchUserEvents('....');

      expect(fetch.default).toBeCalledTimes(2);
      expect(data).toEqual([...firstMockBody, ...secondMockBody]);
    });
  });
});
