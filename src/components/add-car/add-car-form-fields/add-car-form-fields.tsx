import DatePicker from "react-datepicker"
import { subYears, addYears } from "date-fns"
import { Controller, useFormContext } from "react-hook-form"
import ErrorMessage from "src/components/error-message/error-message"
import TextField from "src/components/text-field/text-field"
import RegularText from "src/components/text/regular-text/regular-text"
import { fieldNameValues } from "src/helpers/object-values"
import styled from "styled-components"
import {
  useGetAddCarFieldsQueryLazyQuery,
  useGetAddCarFieldsQueryQuery,
} from "src/api/graphql/__generated__/graphql-types"
import FormSelectOptionField from "./form-select-option-field/form-select-option-field"
import { useEffect } from "react"

export const LabelCondition = styled.label`
  display: flex;
  gap: 10px;
`
export const ConditionContainer = styled.div`
  display: flex;
  gap: 40px;
  width: 50%;
`

const AddCarFormFields = () => {
  const { title, odometer, vin, price, damage, description } = fieldNameValues
  const {
    register,
    formState: { errors },
    control,
    watch,
  } = useFormContext()
  const brandId = watch("brand")
  const stateId = watch("state")

  const { data, loading } = useGetAddCarFieldsQueryQuery()

  const [getDataModels, { data: dataModel, loading: loadingModel }] =
    useGetAddCarFieldsQueryLazyQuery()

  const [getDataCities, { data: dataCities, loading: loadingCities }] =
    useGetAddCarFieldsQueryLazyQuery()
  useEffect(() => {
    if (brandId) {
      getDataModels({
        variables: {
          modelsWhere: {
            brand: {
              id: { _eq: Number(brandId) },
            },
          },
        },
      })
    } else if (stateId) {
      getDataCities({
        variables: {
          where: {
            state: {
              id: {
                _eq: Number(stateId),
              },
            },
          },
        },
      })
    }
  }, [brandId, getDataCities, getDataModels, stateId])

  return (
    <>
      <TextField fieldName={title} placeholder={title} fieldRequired />
      {errors.title && errors.title.message ? (
        <ErrorMessage message={`${errors.title.message}`} />
      ) : null}

      <TextField
        register={register}
        fieldName={odometer}
        placeholder={odometer}
        fieldRequired
      />

      <TextField
        register={register}
        fieldName={vin}
        placeholder={vin}
        fieldRequired
      />

      <FormSelectOptionField
        primarySelectName="brand"
        primarySelectData={!loading && data ? data.brands : []}
        complementarySelectName="model"
        complementarySelectData={
          !loadingModel && dataModel && brandId ? dataModel.models : []
        }
      />

      <RegularText text="Sale Date" isBaseColor />
      <Controller
        control={control}
        name="saleDate"
        render={({ field: { onChange, value } }) => (
          <DatePicker
            minDate={new Date()}
            onChange={onChange}
            selected={value}
            placeholderText="Select a Sale Date"
          />
        )}
      />
      <TextField
        register={register}
        fieldName={price}
        placeholder={price}
        fieldRequired
      />

      <RegularText text="Vehicle Condition :" isBaseColor />
      <ConditionContainer>
        <LabelCondition htmlFor="salvage">
          <RegularText text="A: Salvage Title" isBaseColor />
          <input
            {...register("condition")}
            type="radio"
            value="A"
            id="salvage"
          />
        </LabelCondition>
        <LabelCondition htmlFor="new">
          <RegularText text="N: New" isBaseColor />
          <input type="radio" {...register("condition")} value="N" />
        </LabelCondition>
      </ConditionContainer>
      {errors.condition && errors.condition.message ? (
        <ErrorMessage message={`${errors.condition.message}`} />
      ) : null}

      <TextField
        register={register}
        fieldName={damage}
        placeholder={damage}
        fieldRequired
      />

      <RegularText text="Vehicle Year" isBaseColor />
      <Controller
        control={control}
        name="year"
        render={({ field: { onChange, value } }) => (
          <DatePicker
            onChange={onChange}
            selected={value}
            showYearPicker
            placeholderText="Select a Year"
            dateFormat="yyyy"
            minDate={subYears(new Date(), 50)}
            maxDate={addYears(new Date(), 1)}
          />
        )}
      />

      <FormSelectOptionField
        primarySelectName="color"
        primarySelectData={!loading && data ? data.colors : []}
      />
      <FormSelectOptionField
        primarySelectName="state"
        primarySelectData={!loading && data ? data.states : []}
        complementarySelectName="city"
        complementarySelectData={
          !loadingCities && dataCities && stateId ? dataCities.cities : []
        }
      />
      <TextField
        register={register}
        fieldName={description}
        placeholder={description}
        fieldRequired
      />
    </>
  )
}

export default AddCarFormFields
