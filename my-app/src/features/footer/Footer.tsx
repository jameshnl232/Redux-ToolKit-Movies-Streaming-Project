import header_footer_image from "../../assets/images/header-footer-image.jpeg"
import MoviesWebLogo from "../../assets/images/MoviesWebLogo.png"
import { NavLink } from "react-router-dom"

export default function Footer() {


  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer
      className="bg-center bg-cover bg-blend-overlay bg-black/60  text-white "
      style={{ backgroundImage: `url(${header_footer_image})` }}
    >
      <div className="px-20 min-w-screen p-4 py-6 lg:py-8">
        <div className="lg:flex lg:justify-between">
          {/* Logo and name */}
          <div className="mb-6 md:mb-0">
            <div className=" flex items-center justify-center">
              <NavLink
                to="/"
                className="flex items-center flex-row gap-x-2"
              >
                {" "}
                  <img
                    src={MoviesWebLogo}
                    alt="Movies Web Logo"
                    className="h-12 max-w-full"
                  />
                <div className="flex justify-center lg:justify-start items-center ">
                  <span className="text-2xl lg:text-4xl font-bold">
                    Watchies
                  </span>
                </div>
              </NavLink>
            </div>
          </div>

          {/* Navigation */}
        <div className="flex w-full justify-center lg:justify-end items-center">
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase ">
                Resources
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <NavLink
                    to={
                      "https://developer.themoviedb.org/3/getting-started/introduction"
                    }
                    className="hover:underline"
                  >
                    TMDB
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/"} className="hover:underline">
                    React
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                Follow us
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <NavLink
                    to={"https://github.com/jameshnl232"}
                    className="hover:underline"
                  >
                    Github
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"www.linkedin.com/in/luong-hoang-ba2aa127b"}
                    className="hover:underline"
                  >
                    Linkedin
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase ">Legal</h2>
              <ul className="text-gray-400  font-medium">
                <li className="mb-4">
                  <NavLink to={"/"} className="hover:underline">
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/"} className="hover:underline">
                    Terms &amp; Conditions
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

          {/* Social media */}
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="lg:flex sm:items-center lg:justify-between px-20">
          <div className="flex justify-center items-center">
            <p className="text-sm whitespace-nowrap">
              © 2021 Watchies. All rights reserved.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={handleScrollToTop}>
              <div className="hover:underline whitespace-nowrap">
                Back to top
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
