import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Bulletin = {
  __typename?: 'Bulletin';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BulletinInput = {
  id?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BulletinPagination = {
  __typename?: 'BulletinPagination';
  items: Array<Bulletin>;
  pageInfo: PaginationInfo;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bulletin: Bulletin;
  organization: Organization;
  user: UserMutations;
  video: VideoMutations;
};


export type MutationBulletinArgs = {
  bulletin: BulletinInput;
};


export type MutationOrganizationArgs = {
  organization: OrganizationInput;
};

export enum MutationStatus {
  Error = 'ERROR',
  Success = 'SUCCESS'
}

export type Organization = {
  __typename?: 'Organization';
  brregId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  editor: OrganizationEditor;
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  latestVideos?: Maybe<Array<Video>>;
  name: Scalars['String'];
  postalAddress: Scalars['String'];
  streetAddress: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrganizationEditor = {
  __typename?: 'OrganizationEditor';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type OrganizationInput = {
  brregId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  homepage?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  postalAddress?: InputMaybe<Scalars['String']>;
  streetAddress?: InputMaybe<Scalars['String']>;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  bulletin: Bulletin;
  bulletins: BulletinPagination;
  organization: Organization;
  schedule: SchedulePagination;
  session: Session;
  video: Video;
  videos: VideoPagination;
};


export type QueryBulletinArgs = {
  id: Scalars['ID'];
};


export type QueryBulletinsArgs = {
  page?: Scalars['Int'];
  perPage?: Scalars['Int'];
};


export type QueryOrganizationArgs = {
  id: Scalars['ID'];
};


export type QueryScheduleArgs = {
  filter: ScheduleFilter;
  page?: Scalars['Int'];
  perPage?: Scalars['Int'];
};


export type QueryVideoArgs = {
  id: Scalars['ID'];
};


export type QueryVideosArgs = {
  filter?: InputMaybe<VideoFilter>;
  page?: Scalars['Int'];
  perPage?: Scalars['Int'];
  sort?: InputMaybe<Array<VideoSort>>;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum RoleType {
  Editor = 'EDITOR',
  Member = 'MEMBER'
}

export type ScheduleFilter = {
  from?: InputMaybe<Scalars['DateTime']>;
  to?: InputMaybe<Scalars['DateTime']>;
};

export type ScheduleItem = {
  __typename?: 'ScheduleItem';
  endsAt: Scalars['DateTime'];
  id: Scalars['ID'];
  startsAt: Scalars['DateTime'];
  video: Video;
};

export type SchedulePagination = {
  __typename?: 'SchedulePagination';
  items: Array<ScheduleItem>;
  pageInfo: PaginationInfo;
};

export type Session = {
  __typename?: 'Session';
  authenticated: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  roles: Array<UserRole>;
};

export type UserMutationResult = {
  __typename?: 'UserMutationResult';
  status: MutationStatus;
  user?: Maybe<User>;
};

export type UserMutations = {
  __typename?: 'UserMutations';
  login: UserMutationResult;
  logout: UserMutationResult;
  register: UserMutationResult;
};


export type UserMutationsLoginArgs = {
  input: LoginInput;
};


export type UserMutationsRegisterArgs = {
  input: RegisterInput;
};

export type UserRole = {
  __typename?: 'UserRole';
  organization: Organization;
  role: RoleType;
};

export type Video = {
  __typename?: 'Video';
  assets: Array<VideoAsset>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  images: VideoImages;
  organization: Organization;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  viewCount?: Maybe<Scalars['Int']>;
};

export type VideoAsset = {
  __typename?: 'VideoAsset';
  id: Scalars['ID'];
  path: Scalars['String'];
  type: Scalars['String'];
};

export type VideoFilter = {
  organizationId?: InputMaybe<Scalars['ID']>;
  query?: InputMaybe<Scalars['String']>;
};

export type VideoImages = {
  __typename?: 'VideoImages';
  thumbLarge: Scalars['String'];
  thumbMedium: Scalars['String'];
  thumbSmall: Scalars['String'];
};

export type VideoInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  mediaId?: InputMaybe<Scalars['ID']>;
  organizationId?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type VideoMutationError = {
  message: Scalars['String'];
};

export type VideoMutationPayload = {
  __typename?: 'VideoMutationPayload';
  error?: Maybe<VideoMutationError>;
  status: MutationStatus;
  video?: Maybe<Video>;
  videoId?: Maybe<Scalars['ID']>;
};

export type VideoMutations = {
  __typename?: 'VideoMutations';
  create: VideoMutationPayload;
  delete: VideoMutationPayload;
  publish: VideoMutationPayload;
  unpublish: VideoMutationPayload;
  update: VideoMutationPayload;
};


export type VideoMutationsCreateArgs = {
  input: VideoInput;
};


export type VideoMutationsDeleteArgs = {
  videoId: Scalars['ID'];
};


export type VideoMutationsPublishArgs = {
  videoId: Scalars['ID'];
};


export type VideoMutationsUnpublishArgs = {
  videoId: Scalars['ID'];
};


export type VideoMutationsUpdateArgs = {
  input: VideoInput;
};

export type VideoPagination = {
  __typename?: 'VideoPagination';
  items: Array<Maybe<Video>>;
  pageInfo: PaginationInfo;
};

export enum VideoSort {
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC'
}

export type MutateOrganizationMutationVariables = Exact<{
  organization: OrganizationInput;
}>;


export type MutateOrganizationMutation = { __typename?: 'Mutation', organization: { __typename?: 'Organization', id: string, name: string, description?: string | null, homepage?: string | null, postalAddress: string, streetAddress: string, editor: { __typename?: 'OrganizationEditor', id: string, name: string, email: string } } };

export type GetOrganizationQueryVariables = Exact<{
  orgId: Scalars['ID'];
}>;


export type GetOrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'Organization', id: string, name: string, description?: string | null, homepage?: string | null, postalAddress: string, streetAddress: string, editor: { __typename?: 'OrganizationEditor', id: string, name: string, email: string }, latestVideos?: Array<{ __typename?: 'Video', id: string, title: string, description: string, createdAt: any, organization: { __typename?: 'Organization', id: string, name: string }, images: { __typename?: 'VideoImages', thumbLarge: string, thumbMedium: string, thumbSmall: string }, assets: Array<{ __typename?: 'VideoAsset', id: string, type: string, path: string }> }> | null } };

export type OrganizationDataFragment = { __typename?: 'Organization', id: string, name: string, description?: string | null, homepage?: string | null, postalAddress: string, streetAddress: string, editor: { __typename?: 'OrganizationEditor', id: string, name: string, email: string } };

export type FrontpageScheduleFragment = { __typename?: 'ScheduleItem', startsAt: any, endsAt: any, video: { __typename?: 'Video', id: string, title: string, description: string, organization: { __typename?: 'Organization', id: string, name: string } } };

export type GetFrontpageQueryVariables = Exact<{
  filter: ScheduleFilter;
}>;


export type GetFrontpageQuery = { __typename?: 'Query', schedule: { __typename?: 'SchedulePagination', items: Array<{ __typename?: 'ScheduleItem', startsAt: any, endsAt: any, video: { __typename?: 'Video', id: string, title: string, description: string, organization: { __typename?: 'Organization', id: string, name: string } } }> } };

export type GetBulletinsQueryVariables = Exact<{
  perPage: Scalars['Int'];
}>;


export type GetBulletinsQuery = { __typename?: 'Query', bulletins: { __typename?: 'BulletinPagination', items: Array<{ __typename?: 'Bulletin', id: string, text: string, title: string, createdAt: any, updatedAt: any }> } };

export type GetBulletinQueryVariables = Exact<{
  bulletinId: Scalars['ID'];
}>;


export type GetBulletinQuery = { __typename?: 'Query', bulletin: { __typename?: 'Bulletin', id: string, text: string, title: string, createdAt: any, updatedAt: any } };

export type UpdateBulletinMutationVariables = Exact<{
  bulletin: BulletinInput;
}>;


export type UpdateBulletinMutation = { __typename?: 'Mutation', bulletin: { __typename?: 'Bulletin', id: string, text: string, title: string, createdAt: any, updatedAt: any } };

export type BulletinFieldsFragment = { __typename?: 'Bulletin', id: string, text: string, title: string, createdAt: any, updatedAt: any };

export type GetScheduleQueryVariables = Exact<{
  filter: ScheduleFilter;
}>;


export type GetScheduleQuery = { __typename?: 'Query', schedule: { __typename?: 'SchedulePagination', items: Array<{ __typename?: 'ScheduleItem', startsAt: any, endsAt: any, video: { __typename?: 'Video', id: string, title: string, organization: { __typename?: 'Organization', id: string, name: string } } }> } };

export type ProgramFragment = { __typename?: 'ScheduleItem', startsAt: any, endsAt: any, video: { __typename?: 'Video', id: string, title: string, organization: { __typename?: 'Organization', id: string, name: string } } };

export type GetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { __typename?: 'Query', session: { __typename?: 'Session', authenticated: boolean, user?: { __typename?: 'User', id: string, email: string, name?: string | null, roles: Array<{ __typename?: 'UserRole', role: RoleType, organization: { __typename?: 'Organization', id: string, name: string } }> } | null } };

export type UserSessionFragment = { __typename?: 'Session', authenticated: boolean, user?: { __typename?: 'User', id: string, email: string, name?: string | null, roles: Array<{ __typename?: 'UserRole', role: RoleType, organization: { __typename?: 'Organization', id: string, name: string } }> } | null };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', session: { __typename?: 'Session', user?: { __typename?: 'User', id: string, email: string, name?: string | null, roles: Array<{ __typename?: 'UserRole', role: RoleType, organization: { __typename?: 'Organization', id: string, name: string } }> } | null } };

export type UserProfileFragment = { __typename?: 'User', id: string, email: string, name?: string | null, roles: Array<{ __typename?: 'UserRole', role: RoleType, organization: { __typename?: 'Organization', id: string, name: string } }> };

export type UserRolesFragment = { __typename?: 'UserRole', role: RoleType, organization: { __typename?: 'Organization', id: string, name: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutations', login: { __typename?: 'UserMutationResult', status: MutationStatus, user?: { __typename?: 'User', id: string, email: string } | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutations', logout: { __typename?: 'UserMutationResult', status: MutationStatus } } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', user: { __typename?: 'UserMutations', register: { __typename?: 'UserMutationResult', status: MutationStatus } } };

export type GetVideosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVideosQuery = { __typename?: 'Query', videos: { __typename?: 'VideoPagination', items: Array<{ __typename?: 'Video', id: string, title: string, createdAt: any, organization: { __typename?: 'Organization', id: string, name: string } } | null> } };

export type CreateVideoMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  mediaId: Scalars['ID'];
  organizationId: Scalars['ID'];
}>;


export type CreateVideoMutation = { __typename?: 'Mutation', video: { __typename?: 'VideoMutations', create: { __typename?: 'VideoMutationPayload', status: MutationStatus, video?: { __typename?: 'Video', id: string } | null } } };

export type UpdateVideoMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdateVideoMutation = { __typename?: 'Mutation', video: { __typename?: 'VideoMutations', update: { __typename?: 'VideoMutationPayload', status: MutationStatus, video?: { __typename?: 'Video', id: string } | null } } };

export type PublishVideoMutationVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type PublishVideoMutation = { __typename?: 'Mutation', video: { __typename?: 'VideoMutations', publish: { __typename?: 'VideoMutationPayload', status: MutationStatus } } };

export type DeleteVideoMutationVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type DeleteVideoMutation = { __typename?: 'Mutation', video: { __typename?: 'VideoMutations', delete: { __typename?: 'VideoMutationPayload', status: MutationStatus } } };

export type GetVideoQueryVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type GetVideoQuery = { __typename?: 'Query', video: { __typename?: 'Video', id: string, title: string, description: string, createdAt: any, organization: { __typename?: 'Organization', id: string, name: string, latestVideos?: Array<{ __typename?: 'Video', id: string, title: string, description: string, createdAt: any, organization: { __typename?: 'Organization', id: string, name: string }, images: { __typename?: 'VideoImages', thumbLarge: string, thumbMedium: string, thumbSmall: string }, assets: Array<{ __typename?: 'VideoAsset', id: string, type: string, path: string }> }> | null }, images: { __typename?: 'VideoImages', thumbLarge: string, thumbMedium: string, thumbSmall: string }, assets: Array<{ __typename?: 'VideoAsset', id: string, type: string, path: string }> } };

export type VideoAssetsFragment = { __typename?: 'Video', assets: Array<{ __typename?: 'VideoAsset', id: string, type: string, path: string }> };

export type BasicVideoMetadataFragment = { __typename?: 'Video', id: string, title: string, description: string, createdAt: any, organization: { __typename?: 'Organization', id: string, name: string }, images: { __typename?: 'VideoImages', thumbLarge: string, thumbMedium: string, thumbSmall: string } };

export type LatestVideosFragment = { __typename?: 'Organization', id: string, name: string, latestVideos?: Array<{ __typename?: 'Video', id: string, title: string, description: string, createdAt: any, organization: { __typename?: 'Organization', id: string, name: string }, images: { __typename?: 'VideoImages', thumbLarge: string, thumbMedium: string, thumbSmall: string }, assets: Array<{ __typename?: 'VideoAsset', id: string, type: string, path: string }> }> | null };

export const OrganizationDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrganizationData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"homepage"}},{"kind":"Field","name":{"kind":"Name","value":"postalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"streetAddress"}},{"kind":"Field","name":{"kind":"Name","value":"editor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<OrganizationDataFragment, unknown>;
export const FrontpageScheduleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontpageSchedule"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<FrontpageScheduleFragment, unknown>;
export const BulletinFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BulletinFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bulletin"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<BulletinFieldsFragment, unknown>;
export const ProgramFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Program"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ProgramFragment, unknown>;
export const UserSessionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSession"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Session"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticated"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserSessionFragment, unknown>;
export const UserRolesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserRoles"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserRole"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<UserRolesFragment, unknown>;
export const UserProfileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserRoles"}}]}}]}},...UserRolesFragmentDoc.definitions]} as unknown as DocumentNode<UserProfileFragment, unknown>;
export const VideoAssetsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoAssets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]} as unknown as DocumentNode<VideoAssetsFragment, unknown>;
export const BasicVideoMetadataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicVideoMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbLarge"}},{"kind":"Field","name":{"kind":"Name","value":"thumbMedium"}},{"kind":"Field","name":{"kind":"Name","value":"thumbSmall"}}]}}]}}]} as unknown as DocumentNode<BasicVideoMetadataFragment, unknown>;
export const LatestVideosFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LatestVideos"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"latestVideos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbLarge"}},{"kind":"Field","name":{"kind":"Name","value":"thumbMedium"}},{"kind":"Field","name":{"kind":"Name","value":"thumbSmall"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<LatestVideosFragment, unknown>;
export const MutateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MutateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organization"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organization"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organization"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationData"}}]}}]}},...OrganizationDataFragmentDoc.definitions]} as unknown as DocumentNode<MutateOrganizationMutation, MutateOrganizationMutationVariables>;
export const GetOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrganizationData"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LatestVideos"}}]}}]}},...OrganizationDataFragmentDoc.definitions,...LatestVideosFragmentDoc.definitions]} as unknown as DocumentNode<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const GetFrontpageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFrontpage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontpageSchedule"}}]}}]}}]}},...FrontpageScheduleFragmentDoc.definitions]} as unknown as DocumentNode<GetFrontpageQuery, GetFrontpageQueryVariables>;
export const GetBulletinsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBulletins"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulletins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"perPage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BulletinFields"}}]}}]}}]}},...BulletinFieldsFragmentDoc.definitions]} as unknown as DocumentNode<GetBulletinsQuery, GetBulletinsQueryVariables>;
export const GetBulletinDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBulletin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bulletinId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulletin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bulletinId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BulletinFields"}}]}}]}},...BulletinFieldsFragmentDoc.definitions]} as unknown as DocumentNode<GetBulletinQuery, GetBulletinQueryVariables>;
export const UpdateBulletinDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBulletin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bulletin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulletinInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulletin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bulletin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bulletin"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BulletinFields"}}]}}]}},...BulletinFieldsFragmentDoc.definitions]} as unknown as DocumentNode<UpdateBulletinMutation, UpdateBulletinMutationVariables>;
export const GetScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Program"}}]}}]}}]}},...ProgramFragmentDoc.definitions]} as unknown as DocumentNode<GetScheduleQuery, GetScheduleQueryVariables>;
export const GetSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSession"}}]}}]}},...UserSessionFragmentDoc.definitions]} as unknown as DocumentNode<GetSessionQuery, GetSessionQueryVariables>;
export const GetProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserProfile"}}]}}]}}]}},...UserProfileFragmentDoc.definitions]} as unknown as DocumentNode<GetProfileQuery, GetProfileQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetVideosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVideos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetVideosQuery, GetVideosQueryVariables>;
export const CreateVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mediaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"mediaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mediaId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateVideoMutation, CreateVideoMutationVariables>;
export const UpdateVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateVideoMutation, UpdateVideoMutationVariables>;
export const PublishVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publish"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"videoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PublishVideoMutation, PublishVideoMutationVariables>;
export const DeleteVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"videoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteVideoMutation, DeleteVideoMutationVariables>;
export const GetVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicVideoMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoAssets"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LatestVideos"}}]}}]}}]}},...BasicVideoMetadataFragmentDoc.definitions,...VideoAssetsFragmentDoc.definitions,...LatestVideosFragmentDoc.definitions]} as unknown as DocumentNode<GetVideoQuery, GetVideoQueryVariables>;