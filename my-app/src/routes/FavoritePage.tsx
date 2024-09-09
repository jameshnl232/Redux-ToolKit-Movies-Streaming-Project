import AnimatedLayout from "../animation/AnimatedLayout"
import { useAppSelector } from "../app/hooks"
import ItemGrid from "../features/itemGrid"
import type { Movie, TvShow } from "../features/movies/movie.type"
import { selectFavorites } from "../features/movies/moviesSlice"

export default function FavoritePage() {
  const favorites = useAppSelector(selectFavorites) as (Movie | TvShow)[]

  if (favorites.length === 0) {
    return (
      <AnimatedLayout>
        <div className="min-h-screen pt-16 lg:pt-20 ">
          <h1 className="text-center text-3xl">You have no favorites yet</h1>
        </div>
      </AnimatedLayout>
    )
  }

  return (
    <AnimatedLayout>
      <div className="min-h-screen pt-16 lg:pt-20 ">
        <ItemGrid items={favorites} />
      </div>
    </AnimatedLayout>
  )
}
