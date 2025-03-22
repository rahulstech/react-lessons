import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/users/' }),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ''
        }),
    })
})

export default userApi;

export const { useGetAllUsersQuery, } = userApi;
