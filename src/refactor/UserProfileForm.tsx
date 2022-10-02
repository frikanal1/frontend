import { InputLabel, TextField } from "@mui/material"
import React, { useState } from "react"
import { styled } from "@mui/system"

const WideningForm = styled("div")`
  flex-grow: 1;
`

export const UserProfileForm = () => {
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()

  return (
    <WideningForm>
      <InputLabel htmlFor={"profileFirstName"}>Fornavn</InputLabel>

      <TextField
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        id={"profileFirstName"}
        name="firstName"
      />
      <InputLabel htmlFor={"profileLastName"}>Etternavn</InputLabel>

      <TextField
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        id={"profileLastName"}
        name="lastName"
      />
    </WideningForm>
  )
}
