import { useState } from "react"
import { Maybe } from "../generated/graphql"
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-gray-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)
export const UploadFileSelector = ({ handleStart }: { handleStart: (file: File) => void }) => {
  const [file, setFile] = useState<Maybe<File>>()

  const FileSelector = () => (
    <label className="">
      <span className="flex items-center space-x-2 text-orange-900">
        <UploadIcon />
        <span className="text-xl">
          Trekk filer til dette feltet, eller <span className="text-blue-600 underline">velg fil</span>
        </span>
      </span>
      <input
        type="file"
        name="file_upload"
        className="hidden"
        onChange={(event) => setFile(event.target.files?.item(0))}
      />
    </label>
  )

  const FileConfirmation = () => (
    <div className=" w-full transition bg-white text-orange-900">
      <div>Filnavn:</div>
      <div>{file!.name}</div>
      <div>Filstørrelse:</div>
      <div>{file!.size}</div>
      <div>
        <button
          className="border-2 border-black rounded-lg shadow-lg px-4 py-2 w-40"
          onClick={() => file && handleStart(file)}
        >
          Last opp
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-xl p-2 flex justify-center outline outline-white outline-4 w-full h-32 px-4 transition bg-white appearance-none cursor-pointer hover:border-orange-500 focus:outline-none border-4 border-orange-700 border-dashed rounded-2xl ">
      {!file ? <FileSelector /> : <FileConfirmation />}
    </div>
  )
}
