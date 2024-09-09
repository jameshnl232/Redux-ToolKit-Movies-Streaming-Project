import { Form, useLoaderData, useNavigate, useSubmit } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectTheme } from "../features/theme/themeSlice"
import { useCallback, useEffect, useState } from "react"
import type { Movie, TvShow } from "../features/movies/movie.type"
import { searchList } from "../features/movies/movies.api"
import ItemGrid from "../features/itemGrid"
import AnimatedLayout from "../animation/AnimatedLayout"

export default function SearchPage() {
  const theme = useAppSelector(selectTheme)

  const query = useLoaderData() as { search: string }

  const [search, setSearch] = useState(query.search || "")

  const [onSearch, setOnSearch] = useState(false)

  const submit = useSubmit()

  const navigate = useNavigate()

  const [items, setItems] = useState<(Movie | TvShow)[]>([])
  const [type, setType] = useState<"movie" | "tv">("movie")
  const [page, setPage] = useState(1)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const searchItems = useCallback(async () => {
    setOnSearch(true)
    const response = (await searchList(type, search, page)) as {
      results: (Movie | TvShow)[]
      total_pages: number
    }
    if (response) {
      if (page > 1) {
        setItems([...items, ...response.results])
      } else {
        setItems(response.results)
      }
    } else {
      setItems([])
    }
    setOnSearch(false)
  }, [search, type, page, items])

  useEffect(() => {
    if (search.trim().length === 0) {
      setItems([])
      setPage(1)
      return
    }
    searchItems()
  }, [search, type, page])

  useEffect(() => {
    setItems([])
    setPage(1)
  }, [type])

  useEffect(() => {
    const isFirstSearch = search == null
    navigate(`?q=${search}`, { replace: isFirstSearch }) // Update URL with ?q=value
  }, [search, navigate])

  const handleLoadMore = () => {
    setPage(page + 1)
  } 


  return (
          <AnimatedLayout>

    <div className={theme === "dark" ? "dark" : ""}>
      <div className="dark:bg-black  dark:text-gray-200 bg-white text-gray-900 min-h-screen font-mv transition-colors ease-in-out duration-500 ">
        <div className=" pt-16 lg:pt-20 ">
          <div className="flex justify-center items-center min-w-screen pt-10">
            <div className="flex-col justify-center items-center min-w-screen">
              <div className="flex justify-center items-center gap-x-5 pb-10 text-base lg:text-xl  ">
                <button
                  onClick={() => setType("movie")}
                  className={
                    type === "movie"
                      ? "bg-yellow-500 hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white font-bold py-2 px-4 rounded"
                      : "bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white font-bold py-2 px-4 rounded"
                  }
                >
                  Movie
                </button>
                <button
                  onClick={() => setType("tv")}
                  className={
                    type === "tv"
                      ? "bg-yellow-500 hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white font-bold py-2 px-4 rounded"
                      : "bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white font-bold py-2 px-4 rounded"
                  }
                >
                  Tv-Show
                </button>
              </div>
              <Form
                className="flex justify-center gap-x-5 w-screen px-10"
                role="search"
              >
                <input
                  onChange={handleSearch}
                  id="q"
                  type="text"
                  placeholder="Movie or TV Show"
                  value={search}
                  className="w-4/5 border-2 bg-gray-400 bg-opacity-30 border-gray-900 dark:border-gray-300 dark:bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                />
              </Form>
            </div>
          </div>
        </div>
        {items.length > 0 && (
          <>
            <ItemGrid items={items} />
            <div className="flex justify-center items-center pb-10 ">
              <button
                onClick={handleLoadMore}
                className=" border hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white font-bold py-2 px-4 rounded"
              >
                Load more
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </AnimatedLayout>
  )
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  return { search: q }
}
