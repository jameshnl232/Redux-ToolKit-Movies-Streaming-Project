import type { LoaderFunctionArgs } from "react-router-dom"
import { Await, useLoaderData, useParams } from "react-router-dom"
import ItemGrid from "../features/itemGrid"
import { getTVList } from "../features/movies/movies.api"
import type { TvShow } from "../features/movies/movie.type"
import { useEffect, useState } from "react"
import Pagination from "../features/pagination"
import React from "react"
import AnimatedLayout from "../animation/AnimatedLayout"

export default function TVshowsPage() {
  const params = useParams() as { page: string }
  const [page, setPage] = useState(params.page ? parseInt(params.page) : 1)

  const { popularTvShows } = useLoaderData() as {
    popularTvShows: { results: TvShow[]; total_pages: number }
  }

  useEffect(() => {
    setPage(parseInt(params.page))
  }, [params.page])

  return (
    <>
      <AnimatedLayout>
        <React.Suspense fallback={<p className="text-center">Loading...</p>}>
          <Await resolve={popularTvShows}>
            {popularTvShows => (
              <div className="min-h-screen pt-16 lg:pt-20 ">
                <ItemGrid items={popularTvShows.results} />
                <Pagination
                  totalPages={popularTvShows.total_pages}
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
  const popularTvShows = (await getTVList(
    "popular",
    parseInt(params.page as string),
  )) as { results: TvShow[]; total_pages: number }
  return { popularTvShows }
}
