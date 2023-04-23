import axiosApi from '@/common/axios';
import {
  LoginUser,
  MultipleArticlesResponse,
  MultipleCommentsResponse,
  NewArticle,
  NewComment,
  NewUser,
  ProfileResponse,
  SingleArticleResponse,
  SingleCommentResponse,
  TagsResponse,
  UpdateArticle,
  UpdateUser,
  User,
  UserResponse
} from '@/common/models';
import { setToken } from '@/utils/token';

// Article
const getArticleBySlug = async (slug: string) => {
  const response = await axiosApi.get<SingleArticleResponse>(`articles/${slug}`);
  return response.data.article;
};

const deleteArticle = async (slug: string) => {
  const response = await axiosApi.delete(`articles/${slug}`);
  return response.data;
};

// Comment
const getComments = async (slug: string) => {
  const response = await axiosApi.get<MultipleCommentsResponse>(`articles/${slug}/comments`);
  return response.data.comments;
};

const createComment = async (slug: string, comment: NewComment) => {
  const response = await axiosApi.post<SingleCommentResponse>(`articles/${slug}/comments`, {
    comment
  });
  return response.data.comment;
};

const deleteComment = async (slug: string, id: number) => {
  const response = await axiosApi.delete(`articles/${slug}/comments/${id}`);
  return response.data;
};

// Auth
const login = async (user: LoginUser) => {
  const response = await axiosApi.post<UserResponse>('users/login', { user });
  localStorage.setItem('api_token', response.data.user.token);
  setToken(response.data.user.token);
  return response.data.user;
};

const register = async (user: NewUser) => {
  const response = await axiosApi.post<UserResponse>('users', { user });
  localStorage.setItem('api_token', response.data.user.token);
  setToken(response.data.user.token);
  return response.data.user;
};

const getCurrentUser = async () => {
  const response = await axiosApi.get<UserResponse>('user');
  setUser(response.data.user);
  return response.data.user;
};

const setUser = (user: User | null) => {
  if (user && !user.image) {
    user.image = 'https://api.realworld.io/images/smiley-cyrus.jpeg';
  }
};

// Editor
const createArticle = async (article: NewArticle) => {
  const response = await axiosApi.post<SingleArticleResponse>(`articles`, { article });
  return response.data.article;
};

const updateArticle = async (slug: string, article: UpdateArticle) => {
  const response = await axiosApi.put<SingleArticleResponse>(`articles/${slug}`, { article });
  return response.data.article;
};

// Home
const getYourFeed = async () => {
  const response = await axiosApi.get<MultipleArticlesResponse>('articles/feed');
  return response.data.articles;
};

const getGlobalFeed = async () => {
  const response = await axiosApi.get<MultipleArticlesResponse>('articles');
  return response.data.articles;
};

const getArticlesByTag = async (tag: string) => {
  const response = await axiosApi.get<MultipleArticlesResponse>('articles', { params: { tag } });
  return response.data.articles;
};

const getTags = async () => {
  const response = await axiosApi.get<TagsResponse>('tags');
  return response.data.tags;
};

// Profile
const getProfile = async (username: string) => {
  const response = await axiosApi.get<ProfileResponse>(`profiles/${username}`);
  return response.data.profile;
};

const getProfileArticles = async (articlesType: string, username: string) => {
  const response = await axiosApi.get<MultipleArticlesResponse>(
    `articles?${articlesType}=${username}`
  );
  return response.data.articles;
};

// Settings
const updateUser = async (user: UpdateUser) => {
  const response = await axiosApi.put<UserResponse>('user', { user });
  return response.data.user;
};

// Buttons
const toggleFavorite = async (favorited: boolean, slug: string) => {
  let response;

  if (favorited) {
    response = await axiosApi.delete<SingleArticleResponse>(`articles/${slug}/favorite`);
  } else {
    response = await axiosApi.post<SingleArticleResponse>(`articles/${slug}/favorite`, {});
  }
  return response.data.article;
};

const toggleFollow = async (following: boolean, username: string) => {
  let response;

  if (following) {
    response = await axiosApi.delete<ProfileResponse>(`profiles/${username}/follow`);
  } else {
    response = await axiosApi.post<ProfileResponse>(`profiles/${username}/follow`, {});
  }
  return response.data.profile;
};

const appApi = {
  getArticleBySlug,
  deleteArticle,
  getComments,
  deleteComment,
  createComment,
  login,
  register,
  getCurrentUser,
  createArticle,
  updateArticle,
  getYourFeed,
  getGlobalFeed,
  getArticlesByTag,
  getTags,
  getProfile,
  getProfileArticles,
  updateUser,
  toggleFavorite,
  toggleFollow
};

export default appApi;
