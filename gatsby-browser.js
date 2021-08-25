import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"
import React from "react"
import { AuthProvider } from "./src/utils/authContext"

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
)