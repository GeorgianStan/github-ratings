/**
 * * Types
 */
import { PartialRecord, UserField, UserFieldFromAPI } from 'src/@types';

class GithubAPI {
  #apiURL = 'https://api.github.com';

  /* eslint-disable */
  #fetch: any;

  constructor(fetch: any) {
    this.#fetch = fetch;
  }
  /**
   * * Public methods
   */
  async fetchUser(
    username: string,
  ): Promise<PartialRecord<UserFieldFromAPI, number | string>> {
    const url = `${this.#apiURL}/users/${username}`;

    const res: Response = await this.#fetch(url);

    if (res.status === 404) {
      throw new Error('User not found');
    }

    if (res.status !== 200) {
      throw new Error((await res.json()).message);
    }

    return res.json();
  }

  async fetchUserRepos(username: string): Promise<any[]> {
    // ? get all the repos
    let repos = [];

    let currentPage = 1;
    const perPageCount = 100;

    while (true) {
      const url = `${
        this.#apiURL
      }/users/${username}/repos?page=${currentPage}&per_page=${perPageCount}`;

      const res: Response = await this.#fetch(url);

      if (res.status === 404) {
        throw new Error('User not found');
      }

      if (res.status !== 200) {
        throw new Error((await res.json()).message);
      }

      const paginatedRepos = await res.json();

      repos.push(...paginatedRepos);

      // ? if all repositories were fetched
      if (paginatedRepos.length < perPageCount) {
        break;
      }

      // ? fetch next repositories
      currentPage++;
    }

    return repos;
  }

  async fetchUserStars(
    username: string,
  ): Promise<PartialRecord<UserField, number | string>> {
    const repos = await this.fetchUserRepos(username);

    const stars: number = repos.reduce(
      (acc, current) => acc + current.stargazers_count,
      0,
    );
    return { stars };
  }
}

export { GithubAPI };
