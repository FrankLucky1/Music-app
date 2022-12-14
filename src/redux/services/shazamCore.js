import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

    export const shazamCoreApi = createApi({
        reducerPath: 'shazamCoreApi',  
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
            prepareHeaders: (headers) => {
                headers.set('X-RapidAPI-key', 'd4a23114a5msh5d46b1cfe70a437p165a2ejsn33fd469a061b');
            
            return headers;
            },
        }),
        endpoints: (builder) => ({
            getTopCharts: builder.query({query: () => '/charts/world'}),
            getSongsByGenre: builder.query({query: (genre)=> `/charts/genre-world?genre_code=${genre}`}),
            getSongDetails: builder.query({query: ({songid}) => `/tracks/details?track_id=${songid}`}),
            getSongRelated: builder.query({query: ({songid})=> `/tracks/related?track_id=${songid}`}),
            getArtistDetails: builder.query({query: (artistId)=> `/artists/details?artist_id=${artistId}`}),
            getSongsByCountry: builder.query({query: (countryCode)=> `/charts/country?country_code=${countryCode}`}),
        }),
    });
    export const {
        useGetTopChartsQuery,
        useGetSongsByGenreQuery,
        useGetSongDetailsQuery,
        useGetSongRelatedQuery,
        useGetArtistDetailsQuery,
        useGetSongsByCountryQuery,
    } = shazamCoreApi;