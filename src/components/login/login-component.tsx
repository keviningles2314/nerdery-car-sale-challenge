import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryUserLazyQuery } from "../../api/graphql/__generated__/graphql-types"
import { useLoginContext } from "../../context/login-context/login-context"
import { Types } from "../../context/login-context/login-reducer"
import { emailValidation } from "../../helpers/validators"
import Button from "../button/button"
import ErrorMessage from "../error-message/error-message"
import HeadingTitle from "../text/heading-title/heading-title"
import { Container } from "./login-styled"
import TextField from "../text-field/text-field"

interface LoginComponentProps {
  title: string
}

const LoginComponent = ({ title }: LoginComponentProps) => {
  const [email, setEmail] = useState("")
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()
  const { dispatch } = useLoginContext()

  const [getUserLazyResults, { data, error, loading }] = useQueryUserLazyQuery()

  const isUser = data ? data.users.length > 0 : false

  useEffect(() => {
    const isValidEmail = emailValidation(email)
    if (data) {
      if (isUser && isValidEmail) {
        dispatch({
          type: Types.LOGIN_USER,
          payload: { userData: data.users[0] },
        })
        navigate("/")
        setIsError(false)
      } else {
        setIsError(true)
      }
    }
  }, [data, loading, dispatch, email, isUser, navigate])

  const handleClick = () => {
    getUserLazyResults({
      variables: {
        where: {
          email: {
            _eq: email,
          },
        },
      },
    })
  }

  const handleEmailValidation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsError(false)
    setEmail(event.target.value)
  }

  return (
    <Container>
      <HeadingTitle text={title} isBaseColor={false} />
      <TextField
        placeholder="Insert your email"
        onChangeText={handleEmailValidation}
      />
      <Button
        title={loading ? "Loading..." : "Login"}
        onClick={handleClick}
        disabled={loading}
      />
      {isError ? (
        <ErrorMessage message="Invalid email or User Not Found" />
      ) : null}
      {error ? <ErrorMessage message={error.message} /> : null}
    </Container>
  )
}

export default LoginComponent
