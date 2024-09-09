import { Dialog, DialogPanel } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { NavLink } from "react-router-dom"
import type { useAppDispatch } from "../../app/hooks"
import { toggleState } from "../theme/themeSlice"

type NavigationProps = {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (value: boolean) => void
  navigation: { name: string; href: string }[]
  theme: string
  dispatch: ReturnType<typeof useAppDispatch>
}

export default function DialogMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  navigation,
  theme,
  dispatch,
}: NavigationProps) {
  const toggleTheme = () => {
    dispatch(toggleState())
  }

  return (
    <>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-30" />
        <DialogPanel className="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto  bg-gray-700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <div className="">
              <button onClick={toggleTheme}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={
                    theme === "dark"
                      ? "size-6 cursor-pointer text-gray-200"
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
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* Navigation */}
              <div className="space-y-2 py-6">
                {navigation.map(item => (
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left"
                    key={item.name}
                  >
                    <NavLink
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </NavLink>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}
