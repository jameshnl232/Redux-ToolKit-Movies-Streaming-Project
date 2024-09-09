import React, { useEffect, useRef, useState } from "react"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "./Slider.module.css"
import { Autoplay } from "swiper/modules"
import SwiperCore from "swiper"

import { Movie } from "../movies/movie.type"
import { api_config } from "../../api/api_config"
import Modal from "../Modal/Modal"

import { getVideos } from "../movies/movies.api"
import MovieCard  from "../MovieCard/MovieCard"

export default function Slider({ movies }: { movies: Movie[] }) {
  SwiperCore.use([Autoplay])

  return (
    <div className="z-10 flex items-center justify-center min-h-screen ">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay]} // Add modules you need
        centeredSlides={true} // Centers active slide
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true} // Enables infinite loop
        className="w-full h-full" // Limits max width of the swiper
      >
        {movies.slice(0, 9).map((movie, index) => (
          <SwiperSlide
            key={movie.id}
            className="flex min-h-screen bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${api_config.originalImage(
                movie.backdrop_path ? movie.backdrop_path : movie.poster_path,
              )})`,
            }}
          >
            {({ isActive }) => <MovieCard movie={movie} active={isActive} isOnSlider={true} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}


