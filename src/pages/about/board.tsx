import { AboutLinkBar } from "./index"
import { ExternalLink } from "../../modules/ui/components/ExternalLink"

export const Board = () => (
  <div>
    <AboutLinkBar />
    <div className={"flex gap-4"}>
      <div className={"lg:basis-1/4"}>
        <div className={"bg-gradient-to-b from-green-300 to-green-400 italic-semi text-green-900 p-5 "}>
          placeholder
        </div>
      </div>
      <div className={""}>
        <p>
          Leder Ola Tellesbø kan nås på <ExternalLink href="mailto:post@frikanalen.no">post@frikanalen.no</ExternalLink>
        </p>
        <p>
          Teknisk leder Tore Sinding Bekkedal kan nås på{" "}
          <ExternalLink href="mailto:toresbe@protonmail.com">toresbe@protonmail.com</ExternalLink>
        </p>
      </div>
    </div>
  </div>
)
export default Board
