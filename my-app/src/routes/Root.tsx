import { Outlet, useLocation, useOutlet } from "react-router-dom"
import Navigation from "../features/navigation"
import { useAppSelector } from "../app/hooks"
import { selectTheme } from "../features/theme/themeSlice"
import Footer from "../features/footer"
import { AnimatePresence } from "framer-motion"
import React from "react"


export default function Root() {
  const theme = useAppSelector(selectTheme)

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="dark:bg-black  dark:text-gray-200 bg-white text-gray-900 min-h-screen font-mv transition-colors ease-in-out duration-500 ">
        <Navigation />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}
