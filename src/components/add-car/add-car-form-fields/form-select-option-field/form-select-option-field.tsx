import { useFormContext } from "react-hook-form"
import {
  Brands,
  Cities,
  Colors,
  Models,
  States,
} from "src/api/graphql/__generated__/graphql-types"

interface FormSelectOptionFieldProps {
  primarySelectName: string
  complementarySelectName?: string
  primarySelectData: Brands[] | States[] | Colors[]
  complementarySelectData?: Cities[] | Models[]
}

const FormSelectOptionField = ({
  primarySelectName,
  complementarySelectName,
  primarySelectData,
  complementarySelectData,
}: FormSelectOptionFieldProps) => {
  const { register } = useFormContext()

  return (
    <>
      <select
        {...register(`${primarySelectName}`)}
        data-testid={primarySelectName}
      >
        <option value="">Select {primarySelectName}</option>

        {primarySelectData.map((primaryDataItem) => {
          return (
            <option key={primaryDataItem.id} value={primaryDataItem.id}>
              {primaryDataItem.name}
            </option>
          )
        })}
      </select>
      {/* Errors */}
      {complementarySelectData ? (
        <select
          {...register(`${complementarySelectName}`)}
          data-testid={complementarySelectName}
        >
          <option value="">Select {complementarySelectName}</option>

          {complementarySelectData.map((complementaryDataItem) => {
            return (
              <option
                key={complementaryDataItem.id}
                value={complementaryDataItem.id}
              >
                {complementaryDataItem.name}
              </option>
            )
          })}
        </select>
      ) : null}
      {/* Errors */}
    </>
  )
}
export default FormSelectOptionField
