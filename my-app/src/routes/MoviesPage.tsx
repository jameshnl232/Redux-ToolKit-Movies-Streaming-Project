import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom"
import ItemGrid from "../features/itemGrid"
import { getMovieList } from "../features/movies/movies.api"
import { Movie } from "../features/movies/movie.type"
import { useState } from "react"
import Pagination from "../features/pagination"
import React from "react"
import { AnimatePresence, motion as m } from "framer-motion"
import AnimatedLayout from "../animation/AnimatedLayout"

export default function MoviesPage() {
  const [page, setPage] = useState(1)

  const { popularMoviesData } = useLoaderData() as {
    popularMoviesData: { results: Movie[]; total_pages: number }
  }

  return (
    <>
      <AnimatedLayout>
        <React.Suspense fallback={<p className="text-center">Loading...</p>}>
          <Await resolve={popularMoviesData}>
            {popularMoviesData => (
              <div className="min-h-screen pt-16 lg:pt-20 ">
                <ItemGrid items={popularMoviesData.results} />
                <Pagination
                  totalPages={popularMoviesData.total_pages}
                  currentPage={page}
                  setCurrentPage={setPage}
                />
              </div>
            )}
          </Await>
        </React.Suspense>
      </AnimatedLayout>
    </>
  )
}

export async function loader({ params }: LoaderFunctionArgs) {
  const popularMoviesData = (await getMovieList(
    "popular",
    parseInt(params.page as string),
  )) as {
    popularMoviesData: { results: Movie[]; total_pages: number }
  }
  return defer({ popularMoviesData })
}
