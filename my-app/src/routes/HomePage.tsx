import Footer from "../features/footer"
import Navigation from "../features/navigation"
import Slider from "../features/Slider"
import { useAppSelector } from "../app/hooks"
import { selectTheme } from "../features/theme/themeSlice"
import {
  selectStatus,
  selectTrendingMovies,
} from "../features/movies/moviesSlice"
import { fetchTrendingMovies } from "../features/movies/moviesSlice"
import { useAppDispatch } from "../app/hooks"
import { Suspense, useEffect } from "react"
import MovieList from "../features/MovieList"
import { getMovieList, getTVList } from "../features/movies/movies.api"
import { Await, defer, Link, useLoaderData } from "react-router-dom"
import { Movie, TvShow } from "../features/movies/movie.type"
import React from "react"
import { AnimatePresence, motion as m } from "framer-motion"
import AnimatedLayout from "../animation/AnimatedLayout"

export default function HomePage() {
  const theme = useAppSelector(selectTheme)

  const trendingMovies = useAppSelector(selectTrendingMovies)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()

  type loaderDataTypes = {
    popularMovies: Movie[] | null
    upcomingMovies: Movie[] | null
    topRatedMovies: Movie[] | null
    popularTvShows: TvShow[] | null
    topRatedTvShows: TvShow[] | null
  }

  const {
    popularMovies,
    upcomingMovies,
    topRatedMovies,
    popularTvShows,
    topRatedTvShows,
  } = useLoaderData() as loaderDataTypes

  useEffect(() => {
    const promise = dispatch(fetchTrendingMovies(1))
    return () => {
      promise.abort()
    }
  }, [dispatch])

  console.log(trendingMovies)

  //handle loading

  return (
    <>
      <div className={theme === "dark" ? "dark" : ""}>
        <div className="dark:bg-black  dark:text-gray-200 bg-white text-black min-h-screen font-mv transition-colors ease-in-out duration-500 ">
          <Navigation />

          <AnimatedLayout>
            {/*Slider hero */}
            {status === "loading" && <p className="text-center">Loading...</p>}
            <Slider movies={trendingMovies} />

            {/*Popular Movie list */}
            <React.Suspense
              fallback={<p className="text-center">Loading...</p>}
            >
              <Await resolve={popularMovies}>
                {popularMovies => (
                  <div className="flex-col justify-start px-10 pt-5 pb-5">
                    <div className="flex justify-between items-center pb-4">
                      <h1 className="lg:text-4xl text-2xl font-bold py-2">
                        Popular Movies
                      </h1>
                      <div className="flex justify-start items-start">
                        <Link to={"/movies/1"}>
                          <span className=" hover:underline font-semibold small lg:text-2xl md:text-lg ">
                            See more
                          </span>
                        </Link>
                      </div>
                    </div>
                    <MovieList items={popularMovies} />
                  </div>
                )}
              </Await>

              {/*Popular TV Shows list */}

              <Await resolve={popularTvShows}>
                {popularTvShows => (
                  <div className="flex-col justify-start px-10 pb-10">
                    <div className="flex justify-between items-center pb-4">
                      <h1 className="lg:text-4xl text-2xl font-bold py-2">
                        Popular TV Shows
                      </h1>
                      <div className="flex justify-start items-start">
                        <Link to={"/tv-shows/1"}>
                          <span className="hover:underline font-semibold small lg:text-2xl md:text-lg ">
                            See more
                          </span>
                        </Link>
                      </div>
                    </div>
                    <MovieList items={popularTvShows} />
                  </div>
                )}
              </Await>

              {/*Top rated Movie List */}
              <Await resolve={topRatedMovies}>
                {(topRatedMovies: Movie[]) => (
                  <div className="flex-col justify-start px-10 pb-10">
                    <div className="flex justify-between items-center pb-4">
                      <h1 className="lg:text-4xl text-2xl font-bold py-2">
                        Top rated Movie
                      </h1>
                      <div className="flex justify-start items-start">
                        <Link to={"/movies/1"}>
                          <span className="hover:underline font-semibold small lg:text-2xl md:text-lg ">
                            See more
                          </span>
                        </Link>
                      </div>
                    </div>
                    <MovieList items={topRatedMovies} />
                  </div>
                )}
              </Await>

              {/*Top rated TV Shows List */}
              <Await resolve={topRatedTvShows}>
                {topRatedTvShows => (
                  <div className="flex-col justify-start px-10 pb-10">
                    <div className="flex justify-between items-center pb-4">
                      <h1 className="lg:text-4xl text-2xl font-bold py-2">
                        Top rated TV Shows
                      </h1>
                      <div className="flex justify-start items-start">
                        <Link to={"/tv-shows/1"}>
                          <span className="hover:underline font-semibold small lg:text-2xl md:text-lg ">
                            See more
                          </span>
                        </Link>
                      </div>
                    </div>
                    <MovieList items={topRatedTvShows} />
                  </div>
                )}
              </Await>

              {/*Upcoming Movie List */}
              <Await resolve={upcomingMovies}>
                {upcomingMovies => (
                  <div className="flex-col justify-start px-10 pb-10">
                    <div className="flex justify-between items-center pb-4">
                      <h1 className="lg:text-4xl text-2xl font-bold py-2">
                        Upcoming Movies
                      </h1>
                      <div className="flex justify-start items-start">
                        <Link to={"/movies/1"}>
                          <span className="hover:underline font-semibold small lg:text-2xl md:text-lg ">
                            See more
                          </span>
                        </Link>
                      </div>
                    </div>
                    <MovieList items={upcomingMovies} />
                  </div>
                )}
              </Await>
            </React.Suspense>
          </AnimatedLayout>
        </div>
      </div>

      <Footer />
    </>
  )
}

export async function loader() {
  const popularMoviesData = await getMovieList("popular", 1)
  const popularMovies = popularMoviesData?.results

  const upcomingMoviesData = await getMovieList("upcoming", 1)
  const upcomingMovies = upcomingMoviesData?.results
  const topRatedMoviesData = await getMovieList("top_rated", 1)
  const topRatedMovies = topRatedMoviesData?.results

  const popularTvShowsData = await getTVList("popular", 1)
  const popularTvShows = popularTvShowsData?.results
  const topRatedTvShowsData = await getTVList("top_rated", 1)
  const topRatedTvShows = topRatedTvShowsData?.results

  return defer({
    popularMovies,
    upcomingMovies,
    topRatedMovies,
    popularTvShows,
    topRatedTvShows,
  })
}
