// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import { isMovie, Movie, TvShow } from "../movies/movie.type"
import { Link, NavLink } from "react-router-dom"



export default function MovieList({
  items,
}: {
  items: Movie[] | TvShow[] | null
}) {


  return (
    <>
      <Swiper
        slidesPerView={2.5}
        spaceBetween={30}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4.5,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 5.5,
            spaceBetween: 20,
          },
        }}
        modules={[]}
        className="mySwiper min-w-screen "
      >
        {items && items.length > 0
          ? items.map((item, index) => (
              <SwiperSlide key={index}>
                <Link
                  to={
                    isMovie(item)
                      ? `/movies/details/${item.id}`
                      : `/tv-shows/details/${item.id}`
                  }
                  className="flex items-center justify-center "
                >
                  <div className="flex relative z-10 rounded-2xl w-48 h-72 lg:w-80 lg:h-96 hover:scale-105 transition-transform duration-500">
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
              </SwiperSlide>
            ))
          : ""}
      </Swiper>
    </>
  )
}
