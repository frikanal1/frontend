import { InputLabel, TextField } from "@mui/material"
import React, { useState } from "react"

export const UserProfileForm = () => {
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()

  return (
    <div className={"grow"}>
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
    </div>
  )
}
