import {
  Await,
  defer,
  Link,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Cast, Movie, TvShow } from "../features/movies/movie.type"
import { selectTheme } from "../features/theme/themeSlice"
import {
  getCredits,
  getDetails,
  getSimilar,
} from "../features/movies/movies.api"
import { api_config } from "../api/api_config"
import MovieCard from "../features/MovieCard/MovieCard"
import MovieList from "../features/MovieList"
import { Suspense } from "react"
import React from "react"
import AnimatedLayout from "../animation/AnimatedLayout"

export default function MoviePage() {
  const theme = useAppSelector(selectTheme)

  const { movie, similarMovies, credits } = useLoaderData() as {
    movie: Movie
    similarMovies: { results: Movie[] }
    credits: { cast: Cast[] }
  }

  return (
    <AnimatedLayout>
      <React.Suspense fallback={<p className="text-center">Loading...</p>}>
        <div className="dark:bg-black  dark:text-gray-200 bg-white relative text-black min-h-screen font-mv transition-colors ease-in-out duration-500 ">
          <div className={theme === "dark" ? "dark" : ""}>
            <div
              className="flex items-center justify-center min-h-screen bg-cover bg-center  "
              style={{
                backgroundImage: `url(${api_config.originalImage(
                  movie.backdrop_path ? movie.backdrop_path : movie.poster_path,
                )})`,
              }}
            >
              <Await resolve={movie}>
                {movie => (
                  <MovieCard
                    movie={movie}
                    active={true}
                    isOnSlider={false}
                    credits={credits.cast}
                  />
                )}
              </Await>
            </div>
            <div className="flex-col justify-start px-10 pt-5 pb-10 lg:pb-20">
              <div className="flex justify-between items-center pb-4">
                <h1 className="lg:text-4xl text-2xl font-bold py-2">
                  Similar Movies
                </h1>
                <div className="flex justify-start items-start">
                  <Link to={"/movies/1"}>
                    <span className=" hover:underline font-semibold small lg:text-2xl md:text-lg ">
                      See more
                    </span>
                  </Link>
                </div>
              </div>
              <Await resolve={similarMovies}>
                {similarMovies => <MovieList items={similarMovies.results} />}
              </Await>
            </div>
          </div>
        </div>
      </React.Suspense>
    </AnimatedLayout>
  )
}

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id as string
  const movie = (await getDetails("movie", id)) as Movie
  const similarMovies = (await getSimilar("movie", id)) as { results: Movie[] }
  const credits = (await getCredits("movie", id)) as { cast: Cast[] }
  return defer({ movie, similarMovies, credits })
}
