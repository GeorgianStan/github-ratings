// * User fields that match the API response

// ? If the fields are collected directly from the API response then their name must match the key value returned by the API

type NameField = 'name';
type BioField = 'bio';
type AvatarURLField = 'avatar_url';
type CompanyField = 'company';
type BlogField = 'blog';
type LocationField = 'location';
type EmailField = 'email';
type TwitterUsernameField = 'twitter_username';
type PublicReposCountField = 'public_repos';
type FollowersCountField = 'followers';
type FollowingCountField = 'following';
type CreatedDateField = 'created_at';

export type UserFieldFromAPI =
  | NameField
  | BioField
  | AvatarURLField
  | CompanyField
  | BlogField
  | LocationField
  | EmailField
  | TwitterUsernameField
  | PublicReposCountField
  | FollowersCountField
  | FollowingCountField
  | CreatedDateField;

// * Custom user fields computed by the applicaiton
type UserStarsCountField = 'stars';

export type CustomUserField = UserStarsCountField;

export type UserField = UserFieldFromAPI | CustomUserField;

// * -----

export type PartialRecord<K extends string | number | symbol, T> = {
  [P in K]?: T;
};
