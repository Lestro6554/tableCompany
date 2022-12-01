import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"

export const employeeAPI = createApi({
    reducerPath: 'employeeAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Employee'],
    endpoints: (build) => ({
        fetchAllEmployee: build.query({
            query: () => ({
                url: `/employee`
            }),
            providesTags: result => ['Employee']
        }),
        fetchOneEmployee: build.query({
            query: (idCompany) => ({
                url: `/employee?idCompany=${idCompany}`
            }),
            /*transformResponse(employee, meta) {
                return { employee, totalCount: (meta.response.headers.get('X-Total-Count')) }
            },*/
            providesTags: result => ['Employee']
        }),
        createEmployee: build.mutation({
            query: (employee) => ({
                url: `/employee`,
                method: 'POST',
                body: employee
            }),
            invalidatesTags: ['Employee']
        }),
        updateEmployee: build.mutation({
            query: (employee) => ({
                url: `/employee/${employee.id}`,
                method: 'PUT',
                body: employee
            }),
            invalidatesTags: ['Employee']
        }),
        deleteEmployee: build.mutation({
            query: (id) => ({
                url: `/employee/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Employee']
        }),
    })
})