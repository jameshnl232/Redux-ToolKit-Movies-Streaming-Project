import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"


export default function Modal({
  title,
  showModal,
  onClose,
  children,
}: {
  showModal: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}) {
  return (

    
    <>
      <Dialog open={showModal} onClose={onClose} className="relative z-30 ">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-800 bg-opacity-40 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-20 mx-5 overflow-y-auto">
          <div className="flex min-h-full  items-center justify-center px-5 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-2xl text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              {/* modal content */}
              <div className="bg-gray-950 ">
                <div className="flex items-center justify-center max-w-full max-h-full ">
                  <div className="pt-2 text-center sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base  uppercase  ml-4 font-semibold leading-6 text-white"
                    >
                      {title}
                    </DialogTitle>
                    <div className="mt-2 w-full h-full">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
