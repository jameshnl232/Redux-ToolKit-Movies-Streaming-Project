import { useEffect, useState } from "react"
import { api_config } from "../../api/api_config"
import Modal from "../Modal"
import { Cast, isMovie, Movie, TvShow } from "../movies/movie.type"
import { getVideos } from "../movies/movies.api"

import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { handleFavorites, selectFavorites } from "../movies/moviesSlice"
import { Swiper, SwiperSlide } from "swiper/react"

import {motion as m } from "framer-motion"

export default function MovieCard({
  movie,
  active, // to add animation
  isOnSlider = false,
  credits,
}: {
  movie: Movie | TvShow
  active: boolean
  isOnSlider?: boolean
  credits?: Cast[]
}) {
  const [showModal, setShowModal] = useState(false)

  const [video, setVideo] = useState<string | null>(null)

  const favorites = useAppSelector(selectFavorites)

  const isFavorite = favorites.some(fav => fav.id === movie.id)

  const dispatch = useAppDispatch()

  console.log(credits)

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await getVideos(
          movie.id.toString(),
          isMovie(movie) ? "movie" : "tv",
        )
        if (response.results.length > 0) {
          setVideo("https://www.youtube.com/embed/" + response.results[0].key)
        } else {
          setVideo(null)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchVideo()
  }, [movie.id])

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full relative pt-12 ">
      {/* Modal */}
      <Modal showModal={showModal} onClose={handleCloseModal} title="Trailer">
        {video === null ? (
          <div className="flex justify-center items-center w-full h-full py-20">
            <p className="text-white text-4xl">No trailer available</p>
          </div>
        ) : (
          <iframe
            className="p-4"
            width="500"
            height="500"
            src={video ? video : ""}
            title={isMovie(movie) ? movie.title : movie.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        )}
      </Modal>

      {/* Overlay */}
      <div className=" absolute inset-0 bg-black opacity-60"></div>

      {/* Content Container */}
      <div className="z-20 text-white flex items-center justify-center h-full w-full px-6 md:px-10 lg:py-12 lg:px-10 py-8">
        {/* Movie Card */}
        <div className="card flex items-center justify-between h-full w-full max-w-4xl">
          {/* Image Section - 50% width on large screens */}
          <figure className="hidden lg:flex justify-center items-center h-full w-full lg:w-1/2 p-4 lg:p-0">
            <img
              src={api_config.w500Image(movie.poster_path)}
              alt={isMovie(movie) ? movie.title : movie.name}
              className="rounded-2xl h-full object-cover "
            />
          </figure>

          {/* Text Section - 50% width on large screens */}
          <div className="card-body gap-y-5 flex flex-col items-center lg:items-start justify-center w-full lg:w-1/2 p-4 lg:p-8 text-center lg:text-left">
            <m.h2 className="card-title text-2xl md:text-4xl lg:text-6xl font-bold " initial={{opacity: 0, x: 100}} 
            animate={{opacity: 1, x: 0}} transition={{duration: 1}}
            
            >
              {isMovie(movie) ? movie.title : movie.name}
            </m.h2>
            <p className="text-base md:text-lg lg:text-xl mb-4">
              {movie.overview}
            </p>

            {/* Genre */}
            {!isOnSlider && movie.genres && movie.genres.length > 0 ? (
              <>
                <div className="flex flex-wrap gap-x-2">
                  {movie.genres.map(genre => (
                    <span
                      key={genre.id}
                      className="bg-yellow-400 dark:bg-gray-200 text-black bg-opacity-50 text-sm px-2 py-1 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </>
            ) : null}

            {!isOnSlider && credits && credits.length > 0 ? (
              <>
                {/* Rating */}
                <p className="text-lg lg:text-xl">
                  {isMovie(movie) ? "Rating: " : "Popularity: "}
                  {movie.vote_average}
                </p>
                {/**Cast and category*/}
                <p className="text-lg lg:text-xl">Cast: </p>
                <div className="flex justify-center w-full ">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={true}
                    className="flex flex-wrap gap-x-2"
                  >
                    {credits?.map((cast, index) => (
                      <SwiperSlide key={index}>
                        <div className="flex flex-col items-center">
                          <img
                            src={
                              cast.profile_path
                                ? api_config.w500Image(cast.profile_path)
                                : ""
                            }
                            alt={cast.name}
                            className="rounded-full h-20 w-20 object-cover"
                          />
                          <p className="text-sm text-center">
                            {cast.name} - {cast.character}{" "}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </>
            ) : null}

            {/* Actions */}
            <div className="card-actions h-auto flex justify-center lg:justify-start gap-x-5">
              {isOnSlider && (
                <Link
                  to={
                    isMovie(movie)
                      ? `/movies/details/${movie.id}`
                      : `/tv-shows/details/${movie.id}`
                  }
                >
                  <button className="btn btn-secondary border p-2 hover:bg-slate-500">
                    Watch now
                  </button>
                </Link>
              )}
              <button
                onClick={handleOpenModal}
                className="btn btn-secondary border p-2 hover:bg-slate-500"
              >
                Trailer
              </button>
              {!isOnSlider && (
                <button
                  onClick={() => dispatch(handleFavorites(movie))}
                  className="btn btn-secondary border p-2 hover:bg-slate-500"
                >
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
