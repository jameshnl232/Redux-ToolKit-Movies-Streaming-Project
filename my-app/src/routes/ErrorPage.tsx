import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
  const error = useRouteError() as unknown
  console.log("error", error)

  //check error type
  if (typeof error === "object" && error !== null && "statusText" in error) {
    return (
      <div className="text-center flex items-center justify-center text-2xl min-h-screen">
        <div className="font-semibold flex-col">
          <h1 className="py-10 text-4xl">Opps!</h1>
          <p className="py-10">Sorry, an unexpected error has occured.</p>
          <p className="italic">
            Error: {(error as { statusText: String }).statusText}
          </p>
        </div>
      </div>
    )
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    return (
      <div className="text-center flex items-center justify-center text-2xl min-h-screen">
        <div className="font-semibold flex-col">
          <h1 className="py-10 text-4xl">Opps!</h1>
          <p className="py-10">Sorry, an unexpected error has occured.</p>
          <p className="italic">
            Error: {(error as { message: String }).message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="text-center flex items-center justify-center text-2xl min-h-screen">
        <div className="font-semibold flex-col">
          <h1 className="py-10 text-4xl">Opps!</h1>
          <p className="py-10">Sorry, an unexpected error has occured.</p>
        </div>
      </div>
    </>
  )
}

export default ErrorPage
