export interface Movie {
  adult: boolean // Indicates if the movie is for adults
  backdrop_path: string // Path to the backdrop image of the movie
  genre_ids: number[] // Array of genre IDs associated with the movie
  genres: { id: number; name: string }[] // Array of genre objects associated with the movie
  id: number // Unique identifier for the movie
  original_language: string // Original language of the movie
  original_title: string // Original title of the movie
  overview: string // A brief summary of the movie
  popularity: number // Popularity score of the movie
  poster_path: string // Path to the poster image of the movie
  release_date: string // Release date of the movie in 'YYYY-MM-DD' format
  title: string // Title of the movie
  video: boolean // Indicates if there is a video associated with the movie
  vote_average: number // Average vote score for the movie
  vote_count: number // Total number of votes for the movie
}

export interface TvShow {
  backdrop_path: string // string type for backdrop_path
  first_air_date: string // string type for first_air_date
  genre_ids: number[] // array of integers (number type in TypeScript) for genre_ids
  genres: { id: number; name: string }[] // array of objects for genres
  id: number // integer type for id (number type in TypeScript), defaults to 0
  name: string // string type for name
  origin_country: string[] // array of strings for origin_country
  original_language: string // string type for original_language
  original_name: string // string type for original_name
  overview: string // string type for overview
  popularity: number // number type for popularity, defaults to 0
  poster_path: string // string type for poster_path
  vote_average: number // integer type for vote_average (number type in TypeScript), defaults to 0
  vote_count: number // integer type for vote_count (number type in TypeScript), defaults to 0
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

// Type guard to check if the item is a Movie
export function isMovie(item: Movie | TvShow): item is Movie {
  return (item as Movie).title !== undefined
}

// Type guard to check if the item is a TvShow
export function isTvShow(item: Movie | TvShow): item is TvShow {
  return (item as TvShow).name !== undefined
}
