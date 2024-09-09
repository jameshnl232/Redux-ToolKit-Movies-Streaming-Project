import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
}) {
  const [hasPrevious, setHasPrevious] = useState(false)
  const [hasNext, setHasNext] = useState(false)
  const previousPage = currentPage - 1
  const nextPage = currentPage + 1

  useEffect(() => {
    setHasPrevious(currentPage > 1 && currentPage !== 1)
    setHasNext(currentPage < totalPages && currentPage !== totalPages)
  }, [currentPage, totalPages])
 
  return (
    <>
      {totalPages > 1 && (
        <div className="flex justify-center items-center pt-5 pb-5 lg:pb-10 gap-2">
          {/* Display the previous page link */}
          {hasPrevious && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!hasPrevious}
              className={`px-3 py-1 border rounded ${
                hasPrevious
                  ? "hover:bg-gray-700 hover:text-white border-gray-500"
                  : "border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Link to={`/tv-shows/${previousPage}`}>Previous</Link>
            </button>
          )}

          {/* Display first page link if not on the first page */}
          {currentPage > 2 && (
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-700 hover:text-white"
            >
              <Link to={`/tv-shows/1`}>1</Link>
            </button>
          )}

          {/* Display the current page */}
          <button
            onClick={() => setCurrentPage(currentPage)}
            className="px-3 py-1 border border-gray-500 rounded bg-gray-700 text-white"
          >
            {currentPage}
          </button>

          {/* Display "..." if there are pages between current and next visible */}
          {hasNext && currentPage + 1 < totalPages && (
            <span className="px-3 py-1">...</span>
          )}

          {/* Display the next few pages */}
          {hasNext && nextPage + 5 <= totalPages && (
            <button
              onClick={() => setCurrentPage(nextPage + 5)}
              className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-700 hover:text-white"
            >
              <Link to={`/tv-shows/${nextPage + 5}`}>{nextPage + 5}</Link>
            </button>
          )}

          {hasNext && nextPage + 10 <= totalPages && (
            <button
              onClick={() => setCurrentPage(nextPage + 10)}
              className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-700 hover:text-white"
            >
              <Link to={`/tv-shows/${nextPage + 10}`}>{nextPage + 10}</Link>
            </button>
          )}

          {/* Display the next page */}
          <button
            onClick={() => setCurrentPage(nextPage)}
            disabled={!hasNext}
            className={`px-3 py-1 border rounded ${
              hasNext
                ? "hover:bg-gray-700 hover:text-white border-gray-500"
                : "border-gray-300 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Link to={`/tv-shows/${nextPage}`}>Next</Link>
          </button>
        </div>
      )}
    </>
  )
}
