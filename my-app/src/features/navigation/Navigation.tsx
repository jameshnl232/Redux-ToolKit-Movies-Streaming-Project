import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Bars3Icon } from "@heroicons/react/24/outline"
import MoviesWebLogo from "../../assets/images/MoviesWebLogo.png"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectTheme, toggleState } from "../theme/themeSlice"
import DialogMenu from "../dialog/DialogMenu"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Favorite ", href: "/favorite" },
  { name: "Movies", href: "/movies/1" },
  { name: "TV Shows", href: "/tv-shows/1" },
  { name: "Search", href: "/search" },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  const toggleTheme = () => {
    dispatch(toggleState())
  }

  return (
    <>
      <div className=" relative ">
        <div className="absolute z-10 left-0 right-0 top-0 text-yellow-500 dark:text-white">
          <nav
            aria-label="Global"
            className="flex items-center justify-between lg:px-20 font-mv"
          >
            {/* Logo and name */}
            <div className="z-10 flex items-center justify-start ">
              <NavLink
                to="/"
                className="flex flex-col items-center lg:flex-row gap-x-2"
              >
                {" "}
                <div className="hidden lg:flex">
                  <img
                    src={MoviesWebLogo}
                    alt="Movies Web Logo"
                    className="h-12 w-auto"
                  />
                </div>
                <div className="flex justify-start items-center pl-5">
                  <span className="text-2xl lg:text-4xl font-bold">
                    Watchies
                  </span>
                </div>
              </NavLink>
            </div>

            <div className="flex items-center justify-center p-6 z-10 ">
              {/* Navigation */}
              <div className="hidden lg:flex lg:justify-center lg:items-center lg:gap-x-16 ">
                {navigation.map(item => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `text-2xl font-semibold leading-6 hover:text-yellow-800 hover:underline ${
                        isActive ? "text-yellow-800 " : ""
                      }`
                    }
                    end
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="flex ">
              {/* Mobile menu button */}
              <div className="flex lg:hidden px-5">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="h-6 w-6 text-yellow-400 dark:text-gray-400"
                  />
                </button>
              </div>

              <div className="hidden lg:flex lg:justify-center lg:gap-x-3 lg:items-center lg:md:order-2">
                {/* dark light theme */}
                <div className="w-auto hidden lg:flex">
                  <button onClick={toggleTheme}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={
                        theme === "dark"
                          ? "size-6 cursor-pointer text-gray-400"
                          : "size-6 cursor-pointer text-yellow-500"
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        <DialogMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          navigation={navigation}
          dispatch={dispatch}
          theme={theme}
        />
      </div>
    </>
  )
}
