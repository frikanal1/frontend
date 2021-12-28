import { NextApiResponse } from "next"

export function getEnv() {
  const { FK_API } = process.env
  return { FK_API }
}

export default function handler(_: any, res: NextApiResponse) {
  res.json(getEnv())
}
