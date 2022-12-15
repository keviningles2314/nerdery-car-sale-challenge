export const emailValidation = (email: string) => {
  return /^\w+(?:[.-]?\w+)*@\w+(?:[.-]?\w+)*(?:\.\w{2,4})+$/.test(email)
}

export const isValidUuid = (uuid: string) => {
  return /^[\dA-Fa-f]{8}(?:-[\dA-Fa-f]{4}){3}-[\dA-Fa-f]{12}$/.test(uuid)
}
