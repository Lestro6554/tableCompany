import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"

export const companyAPI = createApi({
    reducerPath: 'companyAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Company'],
    endpoints: (build) => ({
        fetchAllCompany: build.query({
            query: () => ({
                url: `/company`
            }),
            providesTags: result => ['Company']
        }),
        createCompany: build.mutation({
            query: (company) => ({
                url: `/company`,
                method: 'POST',
                body: company
            }),
            invalidatesTags: ['Company']
        }),
        updateCompany: build.mutation({
            query: (company) => ({
                url: `/company/${company.id}`,
                method: 'PUT',
                body: company
            }),
            invalidatesTags: ['Company']
        }),
        deleteCompany: build.mutation({
            query: (company) => ({
                url: `/company/${company.id}`,
                method: 'DELETE',
                body: company
            }),
            invalidatesTags: ['Company']
        }),
    })
})