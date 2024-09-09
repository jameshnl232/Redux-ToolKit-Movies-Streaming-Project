import {
  Await,
  defer,
  Link,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom"
import {
  getCredits,
  getDetails,
  getSimilar,
} from "../features/movies/movies.api"
import { Cast, TvShow } from "../features/movies/movie.type"
import { useAppSelector } from "../app/hooks"
import { selectTheme } from "../features/theme/themeSlice"
import { api_config } from "../api/api_config"
import MovieCard from "../features/MovieCard"
import MovieList from "../features/MovieList"
import React from "react"
import AnimatedLayout from "../animation/AnimatedLayout"

export default function TvShowPage() {
  const theme = useAppSelector(selectTheme)

  const { tvShow, similarTvShows, credits } = useLoaderData() as {
    tvShow: TvShow
    similarTvShows: { results: TvShow[] }
    credits: { cast: Cast[] }
  }

  return (
    <>
      <AnimatedLayout>
        <React.Suspense fallback={<p className="text-center">Loading...</p>}>
          <div className="dark:bg-black  dark:text-gray-200 bg-white relative text-black min-h-screen font-mv transition-colors ease-in-out duration-500 ">
            <div className={theme === "dark" ? "dark" : ""}>
              <div
                className="flex items-center justify-center min-h-screen bg-cover bg-center  "
                style={{
                  backgroundImage: `url(${api_config.originalImage(
                    tvShow.backdrop_path
                      ? tvShow.backdrop_path
                      : tvShow.poster_path,
                  )})`,
                }}
              >
                <Await resolve={tvShow}>
                  {tvShow => (
                    <MovieCard
                      movie={tvShow}
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
                    Similar Tv-Show
                  </h1>
                  <div className="flex justify-start items-start">
                    <Link to={"/tv-shows/1"}>
                      <span className=" hover:underline font-semibold small lg:text-2xl md:text-lg ">
                        See more
                      </span>
                    </Link>
                  </div>
                </div>
                <Await resolve={similarTvShows}>
                  {similarTvShows => (
                    <MovieList items={similarTvShows.results} />
                  )}
                </Await>
              </div>
            </div>
          </div>
        </React.Suspense>
      </AnimatedLayout>
    </>
  )
}

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id as string
  const tvShow = (await getDetails("tv", id)) as TvShow
  const credits = (await getCredits("tv", id)) as { cast: Cast[] }

  const similarTvShows = (await getSimilar("tv", id)) as {
    results: TvShow[]
  }

  return defer({ tvShow, similarTvShows, credits })
}
