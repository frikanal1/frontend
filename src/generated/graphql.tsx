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
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BulletinPagination = {
  __typename?: 'BulletinPagination';
  items: Array<Bulletin>;
  pageInfo: PaginationInfo;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Session;
  logout?: Maybe<Scalars['Boolean']>;
  updateBulletin?: Maybe<Bulletin>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateBulletinArgs = {
  bulletin: BulletinInput;
  id?: InputMaybe<Scalars['ID']>;
};

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
  profileData?: Maybe<UserProfileData>;
};

export type UserProfileData = {
  __typename?: 'UserProfileData';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type Video = {
  __typename?: 'Video';
  assets: Array<VideoAsset>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
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

export type VideoPagination = {
  __typename?: 'VideoPagination';
  items: Array<Maybe<Video>>;
  pageInfo: PaginationInfo;
};

export enum VideoSort {
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC'
}

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
  bulletinId?: InputMaybe<Scalars['ID']>;
}>;


export type UpdateBulletinMutation = { __typename?: 'Mutation', updateBulletin?: { __typename?: 'Bulletin', id: string, text: string, title: string, createdAt: any, updatedAt: any } | null };

export type BulletinFieldsFragment = { __typename?: 'Bulletin', id: string, text: string, title: string, createdAt: any, updatedAt: any };

export type FrontpageScheduleFragment = { __typename?: 'ScheduleItem', startsAt: any, video: { __typename?: 'Video', id: string, title: string, description: string, organization: { __typename?: 'Organization', id: string, name: string } } };

export type GetFrontpageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFrontpageQuery = { __typename?: 'Query', schedule: { __typename?: 'SchedulePagination', items: Array<{ __typename?: 'ScheduleItem', startsAt: any, video: { __typename?: 'Video', id: string, title: string, description: string, organization: { __typename?: 'Organization', id: string, name: string } } }> } };

export type GetLatestVideosQueryVariables = Exact<{
  orgId: Scalars['ID'];
}>;


export type GetLatestVideosQuery = { __typename?: 'Query', organization: { __typename?: 'Organization', id: string, latestVideos?: Array<{ __typename?: 'Video', id: string, title: string, description: string, createdAt: any, organization: { __typename?: 'Organization', id: string, name: string }, assets: Array<{ __typename?: 'VideoAsset', id: string, type: string, path: string }> }> | null } };

export type LatestVideosFragment = { __typename?: 'Organization', latestVideos?: Array<{ __typename?: 'Video', id: string, title: string, description: string, createdAt: any, organization: { __typename?: 'Organization', id: string, name: string }, assets: Array<{ __typename?: 'VideoAsset', id: string, type: string, path: string }> }> | null };

export type GetOrganizationQueryVariables = Exact<{
  orgId: Scalars['ID'];
}>;


export type GetOrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'Organization', id: string, name: string, description?: string | null, homepage?: string | null, postalAddress: string, streetAddress: string, editor: { __typename?: 'OrganizationEditor', id: string, name: string, email: string } } };

export type GetVideosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVideosQuery = { __typename?: 'Query', videos: { __typename?: 'VideoPagination', items: Array<{ __typename?: 'Video', id: string, title: string, createdAt: any, organization: { __typename?: 'Organization', id: string, name: string } } | null> } };

export type GetVideoQueryVariables = Exact<{
  videoId: Scalars['ID'];
}>;


export type GetVideoQuery = { __typename?: 'Query', video: { __typename?: 'Video', id: string, title: string, description: string, createdAt: any, organization: { __typename?: 'Organization', id: string, name: string }, assets: Array<{ __typename?: 'VideoAsset', id: string, type: string, path: string }> } };

export type VideoAssetsFragment = { __typename?: 'Video', assets: Array<{ __typename?: 'VideoAsset', id: string, type: string, path: string }> };

export type BasicVideoMetadataFragment = { __typename?: 'Video', id: string, title: string, description: string, createdAt: any, organization: { __typename?: 'Organization', id: string, name: string } };

export const BulletinFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BulletinFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bulletin"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<BulletinFieldsFragment, unknown>;
export const FrontpageScheduleFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontpageSchedule"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<FrontpageScheduleFragment, unknown>;
export const BasicVideoMetadataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicVideoMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<BasicVideoMetadataFragment, unknown>;
export const VideoAssetsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoAssets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]} as unknown as DocumentNode<VideoAssetsFragment, unknown>;
export const LatestVideosFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LatestVideos"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Organization"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latestVideos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicVideoMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoAssets"}}]}}]}},...BasicVideoMetadataFragmentDoc.definitions,...VideoAssetsFragmentDoc.definitions]} as unknown as DocumentNode<LatestVideosFragment, unknown>;
export const GetBulletinsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBulletins"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulletins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"perPage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BulletinFields"}}]}}]}}]}},...BulletinFieldsFragmentDoc.definitions]} as unknown as DocumentNode<GetBulletinsQuery, GetBulletinsQueryVariables>;
export const GetBulletinDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBulletin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bulletinId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulletin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bulletinId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BulletinFields"}}]}}]}},...BulletinFieldsFragmentDoc.definitions]} as unknown as DocumentNode<GetBulletinQuery, GetBulletinQueryVariables>;
export const UpdateBulletinDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBulletin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bulletin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulletinInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bulletinId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBulletin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bulletin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bulletin"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bulletinId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BulletinFields"}}]}}]}},...BulletinFieldsFragmentDoc.definitions]} as unknown as DocumentNode<UpdateBulletinMutation, UpdateBulletinMutationVariables>;
export const GetFrontpageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFrontpage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontpageSchedule"}}]}}]}}]}},...FrontpageScheduleFragmentDoc.definitions]} as unknown as DocumentNode<GetFrontpageQuery, GetFrontpageQueryVariables>;
export const GetLatestVideosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLatestVideos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LatestVideos"}}]}}]}},...LatestVideosFragmentDoc.definitions]} as unknown as DocumentNode<GetLatestVideosQuery, GetLatestVideosQueryVariables>;
export const GetOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"homepage"}},{"kind":"Field","name":{"kind":"Name","value":"postalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"streetAddress"}},{"kind":"Field","name":{"kind":"Name","value":"editor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const GetVideosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVideos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetVideosQuery, GetVideosQueryVariables>;
export const GetVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicVideoMetadata"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoAssets"}}]}}]}},...BasicVideoMetadataFragmentDoc.definitions,...VideoAssetsFragmentDoc.definitions]} as unknown as DocumentNode<GetVideoQuery, GetVideoQueryVariables>;