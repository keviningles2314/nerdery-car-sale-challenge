import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useGet_Add_Car_Fields_QueryLazyQuery,
  useGet_Add_Car_Fields_QueryQuery,
} from '../../api/graphql/__generated__/graphql-types';
import { fieldNameValues } from '../../helpers/objectValues';
import Button from '../Button/Button';
import EmailField from '../EmailField/EmailField';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SelectOption from '../SelectOption/SelectOption';
import {
  Container,
  Form,
  NestedElements,
  SectionNestedElement,
} from './AddCarFormStyled';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

export interface IFormInput {
  firstName: string;
  odometer: string;
  vin: string;
  title: string;
  lastName: string;
  age: number;
  gender: GenderEnum;
}

const AddCarForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  const { data, error, loading } = useGet_Add_Car_Fields_QueryQuery();
  const [
    getQuery_Get_Add_Car_LazyQuery,
    { data: lazyData, loading: lazyLoading },
  ] = useGet_Add_Car_Fields_QueryLazyQuery();
  // console.log(data);

  const { title, odometer, vin } = fieldNameValues;

  return (
    <Container>
      {!error ? (
        <Form>
          <EmailField
            register={register}
            fieldName={title}
            placeholder={title}
            fieldRequired
          />
          {errors.title?.type === 'required' && `${title} is Required`}
          <NestedElements>
            <SectionNestedElement>
              <EmailField
                register={register}
                fieldName={odometer}
                placeholder={odometer}
                fieldRequired
              />
              {errors.title?.type === 'required' && `${odometer} is Required`}
            </SectionNestedElement>
            <SectionNestedElement>
              <EmailField
                register={register}
                fieldName={vin}
                placeholder={vin}
                fieldRequired
              />
              {errors.vin?.type === 'required' && `${vin} is Required`}
            </SectionNestedElement>
          </NestedElements>
          <SelectOption
            optionArray={[
              { value: 'female', text: 'Female' },
              { value: 'male', text: 'Male' },
              { value: 'other', text: 'Other' },
            ]}
          />
          {/* <select {...register('gender')}>
        <option value='female'>female</option>
        <option value='male'>male</option>
        <option value='other'>other</option>
      </select> */}
          {/* 
      <NestedElements>
        <TextField
          placeholder='Brand'
          {...register('vin', { required: true, maxLength: 20 })}
        />
        {errors.vin?.type === 'required' && 'Vin is required'}

        <TextField
          placeholder='Model'
          {...register('vin', { required: true, maxLength: 20 })}
        />
        {errors.vin?.type === 'required' && 'Vin is required'}
      </NestedElements>
      <NestedElements>
        <TextField
          placeholder='Sale Date'
          {...register('vin', { required: true, maxLength: 20 })}
        />
        {errors.vin?.type === 'required' && 'Vin is required'}

        <TextField
          placeholder='Price'
          {...register('vin', { required: true, maxLength: 20 })}
        />
        {errors.vin?.type === 'required' && 'Vin is required'}
      </NestedElements>
      <NestedElements>
        <TextField
          placeholder='Condition'
          {...register('vin', { required: true, maxLength: 20 })}
        />
        {errors.vin?.type === 'required' && 'Vin is required'}

        <TextField
          placeholder='Damage Type'
          {...register('vin', { required: true, maxLength: 20 })}
        />
        {errors.vin?.type === 'required' && 'Vin is required'}
      </NestedElements>
      <NestedElements>
        <TextField
          placeholder='Year'
          {...register('vin', { required: true, maxLength: 20 })}
        />
        {errors.vin?.type === 'required' && 'Vin is required'}
        <TextField
          placeholder='Color'
          {...register('vin', { required: true, maxLength: 20 })}
        />
      </NestedElements>
      <NestedElements>
        <TextField
          placeholder='State'
          {...register('vin', { required: true, maxLength: 20 })}
        />
        {errors.vin?.type === 'required' && 'Vin is required'}

        <TextField
          placeholder='City'
          {...register('vin', { required: true, maxLength: 20 })}
        />
        {errors.vin?.type === 'required' && 'Vin is required'}
      </NestedElements>

      <TextField
        placeholder='Description'
        {...register('vin', { required: true, maxLength: 20 })}
      />
      {errors.vin?.type === 'required' && 'Vin is required'} */}
          <Button title='Create' onClick={handleSubmit(onSubmit)} />
        </Form>
      ) : (
        <ErrorMessage message={error.message} />
      )}
    </Container>
  );
};
export default AddCarForm;
