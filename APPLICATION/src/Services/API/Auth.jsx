import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../fetchBaseQuery";

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    loginAsAdmin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/admin/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    signupAsAdmin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/admin/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    otp_varification: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "PUT",
        body: data,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useSignupMutation,
  useProfileQuery,
  useLogoutMutation,
  useOtp_varificationMutation,
  useLoginAsAdminMutation,
  useSignupAsAdminMutation,
} = auth;
