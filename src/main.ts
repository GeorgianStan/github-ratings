/**
 * * Types
 */
import { UserField, PartialRecord, KeyValuePair } from './@types';

/**
 * * Serivces
 */
import { GithubAPI } from './github-api/github-api.service';

export class Main extends GithubAPI {
  // * private vars

  /* eslint-disable */
  #fetch: any; // ? fetch API from browser or node-fetch library based on the target

  constructor(fetch: any) {
    super(fetch);
    this.#fetch = fetch;
  }

  /**
   * * Public methods
   */

  /**
   * * Fetch information about a given user
   * @param username - user to fetch by
   * @param fields - fields to fetch for this user
   */
  async fetchUserInfo(
    username: string,
    fields: UserField[],
  ): Promise<PartialRecord<UserField, any>> {
    const fieldsMap: PartialRecord<UserField, any> = {
      name: super.fetchUser,
      bio: super.fetchUser,
      avatar_url: super.fetchUser,
      company: super.fetchUser,
      blog: super.fetchUser,
      location: super.fetchUser,
      email: super.fetchUser,
      twitter_username: super.fetchUser,
      public_repos: super.fetchUser,
      followers: super.fetchUser,
      following: super.fetchUser,
      created_at: super.fetchUser,
      stars: super.fetchUserStars,
    };

    fields.forEach((field: UserField) => {
      if (!fieldsMap[field]) {
        throw new Error(`Unknown field ${field}`);
      }
    });

    // ? create an unique array with all the functions that must be called to gather the data
    const fetchers: any[] = Array.from(
      new Set(fields.map((field: UserField) => fieldsMap[field])),
    ).map((_) => _.call(this, username));

    // ? gather all the data for the fields provided by the user
    const allData: KeyValuePair[] = await Promise.all(fetchers);

    // ? combine all the objects in just one object
    const res = allData.reduce((acc, dataSet) => {
      for (let key in dataSet) acc[key] = dataSet[key];
      return acc;
    }, {});

    // ? create an object only with the fields provided by the user
    return fields.reduce(
      (acc, field: UserField) => ((acc[field] = res[field]), acc),
      {},
    );
  }
}
