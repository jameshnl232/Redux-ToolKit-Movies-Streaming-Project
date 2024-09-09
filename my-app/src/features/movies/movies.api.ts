import http from "../../api/api_config"

export const API_ACCESS_TOKEN: string = import.meta.env.VITE_MOVIES_ACCESS_TOKEN

const auth = `Bearer ${API_ACCESS_TOKEN}`

export type MovieType = "upcoming" | "popular" | "top_rated"

const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
}

export type TVType = "popular" | "top_rated"

const tvType = {
  popular: "popular",
  top_rated: "top_rated",
}

export type CategoryType = "movie" | "tv"

const category = {
  movie: "movie",
  tv: "tv",
}

// Get movie list
export const getMovieList = async (type: MovieType, page: number) => {
  try {
    const options = {
      method: "GET",
      url: "/movie/" + movieType[type],
      params: { language: "en-US", page: page },
      headers: {
        accept: "application/json",
        Authorization: auth,
      },
    }
    const response = await http.request(options)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

// get trending movies list
export const getTrendingMovies = async (page: number) => {

  try {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/movie/day",
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: auth, // Corrected Authorization header format
      },
    }
    const response = await http.request(options)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

// get tv list
export const getTVList = async (type: TVType, page: number) => {
  try {
    const options = {
      method: "GET",
      url: "/tv/" + tvType[type],
      params: { language: "en-US", page: page },
      headers: {
        accept: "application/json",
        Authorization: auth,
      },
    }
    const response = await http.request(options)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

// get video
export const getVideos = async (id: string, category: CategoryType) => {
  try {
    const options = {
      method: "GET",
      url: `/${category}/${id}/videos`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: auth,
      },
    }
    const response = await http.request(options)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

// get details
export const getDetails = async (category: CategoryType, id: string) => {
  try {
    const options = {
      method: "GET",
      url: `/${category}/${id}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: auth,
      },
    }
    const response = await http.request(options)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

// get credits
export const getCredits = async (category: CategoryType, id: string) => {
  try {
    const options = {
      method: "GET",
      url: `/${category}/${id}/credits`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: auth,
      },
    }
    const response = await http.request(options)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

// get similar
export const getSimilar = async (category: CategoryType, id: string) => {
  try {
    const options = {
      method: "GET",
      url: `/${category}/${id}/similar`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: auth,
      },
    }
    const response = await http.request(options)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const searchList = async (type: string, query: string, page: number) => {
  try {
    const options = {
      method: "GET",
      url: `search/${type}?query=${query}`,
      params: { page: page },

      headers: {
        accept: "application/json",
        Authorization: auth,
      },
    }
    const response = await http.request(options)
    console.log(response)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}
