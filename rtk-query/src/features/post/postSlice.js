import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/posts/' }),
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: (userId) => ({
                url: '',
                params: userId ? { userId } : {}
            }),
            refetchOnMountOrArgChange: true,
        }),

        createPost: builder.mutation({
            query: (newPost) => ({
                url: '',
                method: 'POST',
                body: { ...newPost }
            })
        }),

    })
})

export default postApi;

export const { useGetAllPostsQuery, useCreatePostMutation } = postApi;
