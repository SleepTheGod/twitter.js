import type {
  APIPlaceGeo,
  APIPlaceGeoBoundingBox,
  APIPollOption,
  APITweetAttachments,
  APITweetGeo,
  APITweetGeoCoordinates,
  APITweetReferencedTweet,
  APITweetReferencedTweetType,
  APIUserPublicMetrics,
  DeleteUnfollowUserResponse,
  PostFollowUserResponse,
  Snowflake,
} from 'twitter-types';

/**
 * The class for storing data required for generating an API request
 */
export class RequestData<Q, B> {
  /**
   * The query for the request
   */
  query: Q;

  /**
   * The body of the request
   */
  body: B;

  constructor(query: Q, body: B) {
    this.query = query;
    this.body = body;
  }
}

export class TweetAttachments {
  mediaKeys: Array<string>;
  pollIds: Array<string>;

  constructor(data: APITweetAttachments) {
    this.mediaKeys = data.media_keys ?? [];
    this.pollIds = data.poll_ids ?? [];
  }
}

export class TweetReference {
  /**
   * The relation between this tweet and the referenced tweet
   */
  type: APITweetReferencedTweetType;

  /**
   * The ID of the referenced tweet
   */
  id: Snowflake;

  constructor(data: APITweetReferencedTweet) {
    this.type = data.type;
    this.id = data.id;
  }
}

export class TweetGeo {
  placeID: string;
  type: 'Point' | null;
  coordinates: TweetGeoCoordinates | null;

  constructor(data: APITweetGeo) {
    this.placeID = data.place_id;
    this.type = data.coordinates?.type ?? null;
    this.coordinates = data.coordinates ? new TweetGeoCoordinates(data.coordinates) : null;
  }
}

export class TweetGeoCoordinates {
  latitude: number | null;
  longitude: number | null;

  constructor(data: APITweetGeoCoordinates) {
    this.latitude = data.coordinates?.[0] ?? null;
    this.longitude = data.coordinates?.[1] ?? null;
  }
}

export class UserPublicMetrics {
  followersCount: number;
  followingCount: number;
  tweetCount: number;
  listedCount: number;

  constructor(data: APIUserPublicMetrics) {
    this.followersCount = data.followers_count;
    this.followingCount = data.following_count;
    this.tweetCount = data.tweet_count;
    this.listedCount = data.listed_count;
  }
}

export class PollOption {
  position: number;
  label: string;
  votes: number;

  constructor(data: APIPollOption) {
    this.position = data.position;
    this.label = data.label;
    this.votes = data.votes;
  }
}

export class PlaceGeo {
  type: string;
  bbox: APIPlaceGeoBoundingBox;
  properties: Record<string, unknown>;

  constructor(data: APIPlaceGeo) {
    this.type = data.type;
    this.bbox = data.bbox;
    this.properties = data.properties;
  }
}

/**
 * A class that represents the data returned when the authorized user follows a target user
 */
export class UserFollowResponse {
  /**
   * Whether the authorized user is following the target user
   */
  following: boolean;

  /**
   * Whether the follow request of authorized user is yet to be approved by the target user
   */
  pendingFollow: boolean;

  constructor(data: PostFollowUserResponse) {
    this.following = data.data.following;
    this.pendingFollow = data.data.pending_follow;
  }
}

/**
 * A class that represents the data returned when the authorized user unfollows a target user
 */
export class UserUnfollowResponse {
  /**
   * Whether the authorized user is following the target user
   */
  following: boolean;

  constructor(data: DeleteUnfollowUserResponse) {
    this.following = data.data.following;
  }
}
