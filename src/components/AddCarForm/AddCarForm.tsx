import 'react-datepicker/dist/react-datepicker.css';
import { addYears, subYears } from 'date-fns';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  useGet_Add_Car_Fields_QueryLazyQuery,
  useGet_Add_Car_Fields_QueryQuery,
} from '../../api/graphql/__generated__/graphql-types';
import { fieldNameValues } from '../../helpers/objectValues';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import {
  ConditionContainer,
  Container,
  Form,
  InputElementField,
  LabelCondition,
  NestedElements,
  OptionElement,
  SectionNestedElement,
  SelectOption,
} from './AddCarFormStyled';
import RegularText from '../Text/RegularText/RegularText';
import TextField from '../TextField/TextField';
import ReactDatePicker from 'react-datepicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type IFormInput = {
  price: number;
  odometer: number;
  vin: string;
  title: string;
  damage: string;
  year: Date;
  description: string;
  saleDate: Date;
  condition: string;
  brand: number;
  model: number;
  color: number;
  state: number;
  city: number;
};

const schema = yup.object().shape({
  title: yup.string().required(),
  odometer: yup
    .number()
    .required()
    .positive()
    .typeError('Please insert a valid ODOmeter'),
  vin: yup.string().required(),
  price: yup
    .number()
    .required()
    .positive()
    .typeError('Please insert a valid Price'),
  damage: yup.string().required(),
  description: yup.string().required(),
  saleDate: yup.date().required().typeError('Sale Date is required'),
  year: yup.date().required().typeError('Vehicle Year is required'),
  condition: yup.string().required().typeError('Please Select a condition'),
  brand: yup.number().required().typeError('Please Select a brand'),
  model: yup.number().required().typeError('Please Select a Model'),
  color: yup.number().required().typeError('Please Select a Color'),
  state: yup.number().required().typeError('Please Select a Color'),
  city: yup.number().required().typeError('Please Select a Color'),
});

const AddCarForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const { title, odometer, vin, price, damage, description } = fieldNameValues;
  const { data, error, loading } = useGet_Add_Car_Fields_QueryQuery();

  const [
    getQuery_Get_Add_Car_LazyQuery,
    { data: lazyData, loading: lazyLoading },
  ] = useGet_Add_Car_Fields_QueryLazyQuery();

  const handleOptionStateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    getQuery_Get_Add_Car_LazyQuery({
      variables: {
        where: {
          state_id: {
            _eq: Number(event.target.value),
          },
        },
      },
    });
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    getQuery_Get_Add_Car_LazyQuery({
      variables: {
        modelsWhere: {
          brand_id: {
            _eq: Number(event.target.value),
          },
        },
      },
    });
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <Container>
      {!error ? (
        <Form>
          <TextField
            register={register}
            fieldName={title}
            placeholder={title}
            fieldRequired
          />
          {errors.title && <ErrorMessage message={errors.title.message!} />}

          <NestedElements>
            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={odometer}
                placeholder={odometer}
                fieldRequired
              />
              {errors.odometer && (
                <ErrorMessage message={errors.odometer.message!} />
              )}
            </SectionNestedElement>

            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={vin}
                placeholder={vin}
                fieldRequired
              />
              {errors.vin && <ErrorMessage message={errors.vin.message!} />}
            </SectionNestedElement>
          </NestedElements>

          <NestedElements>
            <SectionNestedElement>
              <SelectOption
                {...register('brand')}
                onChange={handleOptionChange}
              >
                <OptionElement value=''>Select Brand</OptionElement>
                {!loading && (
                  <>
                    {data?.brands.map((brand) => {
                      return (
                        <OptionElement key={brand.id} value={brand.id}>
                          {brand.name}
                        </OptionElement>
                      );
                    })}
                  </>
                )}
              </SelectOption>
              {errors.brand && <ErrorMessage message={errors.brand.message!} />}
            </SectionNestedElement>
            <SectionNestedElement>
              <SelectOption {...register('model')}>
                <OptionElement value=''>Select Model</OptionElement>
                {!lazyLoading && (
                  <>
                    {lazyData?.models.map((model) => {
                      return (
                        <OptionElement key={model.id} value={model.id}>
                          {model.name}
                        </OptionElement>
                      );
                    })}
                  </>
                )}
              </SelectOption>
              {errors.model && <ErrorMessage message={errors.model.message!} />}
            </SectionNestedElement>
          </NestedElements>

          <NestedElements>
            <SectionNestedElement>
              <RegularText text='Sale Date' isBaseColor />
              <Controller
                control={control}
                name='saleDate'
                render={({ field: { onChange, value, ref } }) => (
                  <ReactDatePicker
                    minDate={new Date()}
                    onChange={onChange}
                    selected={value}
                    placeholderText='Select a Sale Date'
                  />
                )}
              />
              {errors.saleDate && (
                <ErrorMessage message={errors.saleDate.message!} />
              )}
            </SectionNestedElement>

            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={price}
                placeholder={price}
                fieldRequired
              />
              {errors.price && <ErrorMessage message={errors.price.message!} />}
            </SectionNestedElement>
          </NestedElements>

          <NestedElements>
            <SectionNestedElement>
              <RegularText text='Vehicle Condition :' isBaseColor />
              <ConditionContainer>
                <LabelCondition htmlFor='salvage'>
                  <RegularText text='A: Salvage Title' isBaseColor />
                  <InputElementField
                    {...register('condition')}
                    type='radio'
                    value='A'
                  />
                </LabelCondition>
                <LabelCondition htmlFor='new'>
                  <RegularText text='N: New' isBaseColor />
                  <InputElementField
                    type='radio'
                    {...register('condition')}
                    value='N'
                  />
                </LabelCondition>
              </ConditionContainer>
              {errors.condition && (
                <ErrorMessage message={errors.condition.message!} />
              )}
            </SectionNestedElement>

            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={damage}
                placeholder={damage}
                fieldRequired
              />
              {errors.damage && (
                <ErrorMessage message={errors.damage.message!} />
              )}
            </SectionNestedElement>
          </NestedElements>
          <NestedElements>
            <SectionNestedElement>
              <RegularText text='Vehicle Year' isBaseColor />
              <Controller
                control={control}
                name='year'
                render={({ field: { onChange, value, ref } }) => (
                  <ReactDatePicker
                    onChange={onChange}
                    selected={value}
                    showYearPicker
                    placeholderText='Select a Year'
                    dateFormat='yyyy'
                    minDate={subYears(new Date(), 50)}
                    maxDate={addYears(new Date(), 1)}
                  />
                )}
              />
              {errors.year && <ErrorMessage message={errors.year.message!} />}
            </SectionNestedElement>
            <SectionNestedElement>
              <SelectOption {...register('color')}>
                <OptionElement value=''>Select Color</OptionElement>
                {!loading && (
                  <>
                    {data?.colors.map((color) => {
                      return (
                        <OptionElement key={color.id} value={color.id}>
                          {color.name}
                        </OptionElement>
                      );
                    })}
                  </>
                )}
              </SelectOption>
              {errors.color && <ErrorMessage message={errors.color.message!} />}
            </SectionNestedElement>
          </NestedElements>
          <NestedElements>
            <SectionNestedElement>
              <SelectOption
                {...register('state')}
                onChange={handleOptionStateChange}
              >
                <OptionElement value=''>Select State</OptionElement>
                {!loading && (
                  <>
                    {data?.states.map((state) => {
                      return (
                        <OptionElement key={state.id} value={state.id}>
                          {state.name}
                        </OptionElement>
                      );
                    })}
                  </>
                )}
              </SelectOption>
              {errors.state && <ErrorMessage message={errors.state.message!} />}
            </SectionNestedElement>
            <SectionNestedElement>
              <SelectOption {...register('city')}>
                <OptionElement value=''>Select City</OptionElement>
                {!lazyLoading && (
                  <>
                    {lazyData?.cities.map((city) => {
                      return (
                        <OptionElement key={city.id} value={city.id}>
                          {city.name}
                        </OptionElement>
                      );
                    })}
                  </>
                )}
              </SelectOption>
              {errors.city && <ErrorMessage message={errors.city.message!} />}
            </SectionNestedElement>
          </NestedElements>
          <TextField
            register={register}
            fieldName={description}
            placeholder={description}
            fieldRequired
          />
          {errors.description && (
            <ErrorMessage message={errors.description.message!} />
          )}

          <Button title='Create' onClick={handleSubmit(onSubmit)} />
        </Form>
      ) : (
        <ErrorMessage message={error.message} />
      )}
    </Container>
  );
};
export default AddCarForm;
