import { Link } from "react-router-dom"
import { isMovie, Movie, TvShow } from "../movies/movie.type"

export default function ItemGrid({
  items,
}: {
  items: Movie[] | TvShow[] | null | (Movie | TvShow)[]
}) {
  return (
    <>
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid  grid-flow-row-2 grid-cols-2 gap-3 md:grid-cols-3 md:grid-flow-col-3 md:gap-4 lg:grid-cols-5 lg:grid-rows-4 lg:gap-5  ">
            {items && items.length > 0
              ? items.map((item, index) => (
                  <Link
                    key={item.id}
                    to={
                      isMovie(item)
                        ? `/movies/details/${item.id}`
                        : `/tv-shows/details/${item.id}`
                    }
                  >
                    <div className="flex relative z-10 rounded-2xl w-full h-full hover:scale-105 transition-transform duration-500">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={isMovie(item) ? item.title : item.name}
                        className="rounded-2xl w-full h-full"
                      />
                      {/* Overlay for darkening background */}
                      <div className="absolute flex items-center justify-center w-full h-full hover:scale-105 transition-transform duration-500 bg-black bg-opacity-0 hover:bg-opacity-40 rounded-2xl">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-500/80 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              : ""}
          </div>
        </div>
      </section>
    </>
  )
}
