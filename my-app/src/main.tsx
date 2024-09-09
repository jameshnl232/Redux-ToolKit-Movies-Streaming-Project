import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./routes/Root"
import HomePage from "./routes/HomePage"
import FavoritePage from "./routes/FavoritePage"
import MoviesPage from "./routes/MoviesPage"
import TVshowsPage from "./routes/TVshowsPage"
import ErrorPage from "./routes/ErrorPage"
import { loader as HomeLoader } from "./routes/HomePage"
import { loader as TVshowsLoader } from "./routes/TVshowsPage"
import { loader as MoviesLoader } from "./routes/MoviesPage"
import { loader as MovieLoader } from "./routes/MoviePage"
import { loader as TvShowLoader } from "./routes/TvShowPage"
import { loader as SearchPageLoader } from "./routes/SearchPage"

import { AnimatePresence, motion as m } from "framer-motion"
import MoviePage from "./routes/MoviePage"
import TvShowPage from "./routes/TvShowPage"
import SearchPage from "./routes/SearchPage"
import AnimatedLayout from "./animation/AnimatedLayout"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      loader: HomeLoader,
      errorElement: <ErrorPage />,
    },
    {
      path: "/favorite",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <FavoritePage />,
        },
      ],
    },
    {
      path: "/movies/:page",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <MoviesPage />,

          loader: MoviesLoader,
        },
      ],
    },
    {
      path: "/movies/details/:id",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <MoviePage />,
          loader: MovieLoader,
        },
      ],
    },
    {
      path: "/TV-shows/:page",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <TVshowsPage />,
          loader: TVshowsLoader,
        },
      ],
    },
    {
      path: "/TV-shows/details/:id",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <TvShowPage />,
          loader: TvShowLoader,
        },
      ],
    },
    {
      path: "/search",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <SearchPage />,
          loader: SearchPageLoader,
        },
      ],
    },
  ])

  root.render(
    <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
