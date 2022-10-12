import { useState } from "react"
import RegularText from "../text/regular-text/regular-text"
import { Container } from "./success-creation-message-styled"

const SuccessCreationMessage = () => {
  const [isShow, setIsShow] = useState<boolean>(true)

  setTimeout(() => {
    setIsShow(false)
  }, 3000)

  return (
    <Container>
      {isShow ? (
        <RegularText text="Creation Complete" isBaseColor={false} />
      ) : null}
    </Container>
  )
}
export default SuccessCreationMessage
