import { Container } from "./filter-styled"
import React, { useEffect, useState } from "react"
import RegularText from "../text/regular-text/regular-text"
import SelectOptionFilter from "../select-option-filter/select-option-filter"
import debounce from "lodash/debounce"
import TextField from "../text-field/text-field"
import { URLSearchParamsInit } from "react-router-dom"

interface FilterProps {
  setSearchParam: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | { replace?: boolean | undefined; state?: string }
      | undefined
  ) => void
}

const FilterComponent = ({ setSearchParam }: FilterProps) => {
  const [textSearch, setTextSearch] = useState<string>()
  const [orderOption, setOrderOption] = useState<string>()

  const onChangeTextHandler = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextSearch(event.target.value)
    },
    800
  )

  const onChangeOptionHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderOption(event.target.value)
  }

  useEffect(() => {
    setSearchParam({
      search: textSearch ?? "",
      order: orderOption ?? "desc",
    })
  }, [orderOption, textSearch, setSearchParam])

  return (
    <Container>
      <TextField
        onChangeText={onChangeTextHandler}
        placeholder="Search by VIN, Title or Batch No"
      />
      <RegularText text="Order By Sale Date: " isBaseColor />
      <SelectOptionFilter
        optionArray={[
          { value: "desc", text: "Descending" },
          { value: "asc", text: "Ascending" },
        ]}
        onChangeOption={onChangeOptionHandler}
      />
    </Container>
  )
}

export default FilterComponent
