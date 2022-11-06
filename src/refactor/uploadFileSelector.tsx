import AttachFileIcon from "@mui/icons-material/AttachFile"
import prettyBytes from "pretty-bytes"
import { useState } from "react"
import { Maybe } from "../generated/graphql"

export const UploadFileSelector = ({ handleStart }: { handleStart: (file: File) => void }) => {
  const [file, setFile] = useState<Maybe<File>>()

  // FIXME: I used font-serif here because I haven't got
  const FileSelector = () => (
    <label className="italic block lg:text-2xl font-serif w-full text-center min-h-[130px] flex cursor-pointer">
      <div className={"h-fit m-auto"}>
        <AttachFileIcon sx={{ fontSize: "30px", marginRight: ".25em" }} />
        Trekk filer til dette feltet, eller <span className="cursor-pointer text-blue-600 underline">velg fil</span>
        <input
          type="file"
          name="file_upload"
          className="hidden"
          onChange={(event) => setFile(event.target.files?.item(0))}
        />
      </div>
    </label>
  )

  const FileConfirmation = () => (
    <div className="w-full min-h-[130px] lg:text-2xl flex flex-col content-center">
      <div className={"text-center"}>
        <div className={"pb-2 pt-10"}>
          {file!.name} <div>({prettyBytes(file!.size)})</div>
        </div>
      </div>
      <div className={"flex flex-col items-end"}>
        <button className="border-2 border-teal-700 rounded-lg p-2 m-2 w-40" onClick={() => file && handleStart(file)}>
          Last opp
        </button>
      </div>
    </div>
  )

  return !file ? <FileSelector /> : <FileConfirmation />
}
