import React, { ChangeEventHandler } from "react"
import { Ref, RegisterOptions } from "react-hook-form"
import { TextBox } from "./text-box"

interface TextFieldProps {
  placeholder?: string
  onChangeText?: React.ChangeEventHandler<HTMLInputElement>
  register?: (
    name: string,
    RegisterOptions?: RegisterOptions
  ) => {
    onChange: ChangeEventHandler
    onBlur: ChangeEventHandler
    name: string
    ref: React.Ref<Ref>
  }
  fieldName?: string
  fieldRequired?: boolean
}

const TextField = ({
  placeholder = "Insert a text",
  onChangeText,
  register,
  fieldName,
  fieldRequired,
}: TextFieldProps) => {
  return (
    <TextBox
      type="text"
      {...(register && {
        ...register(fieldName, {
          required: fieldRequired ?? false,
        }),
      })}
      onChange={onChangeText}
      placeholder={placeholder}
    />
  )
}

export default TextField
