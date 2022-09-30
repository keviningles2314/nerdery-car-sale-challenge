import 'react-datepicker/dist/react-datepicker.css';
import { addYears, subYears } from 'date-fns';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  Cars,
  useGet_Add_Car_Fields_QueryLazyQuery,
  useGet_Add_Car_Fields_QueryQuery,
  useMutation_CarsMutation,
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
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import SuccessCreationMessage from '../SuccessCreationMessage/SuccessCreationMessage';
import { GET_CARS } from '../../api/graphql/query/cars';

export type IFormInput = {
  price: number | null;
  odometer: number | null;
  vin: string;
  title: string;
  damage: string;
  year: Date;
  description: string;
  saleDate: Date;
  condition: string;
  brand: number | null;
  model: number | null;
  color: number | null;
  state: number | null;
  city: number | null;
};

const defaultValuesObject = {
  title: '',
  odometer: null,
  vin: '',
  brand: null,
  model: null,
  saleDate: new Date(),
  price: null,
  condition: '',
  damage: '',
  year: new Date(),
  color: null,
  state: null,
  city: null,
  description: '',
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
  model: yup.number().required().typeError('Please Select a model'),
  color: yup.number().required().typeError('Please Select a color'),
  state: yup.number().required().typeError('Please Select a state'),
  city: yup.number().required().typeError('Please Select a city'),
});

const AddCarForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: defaultValuesObject,
  });
  const randomNumber = Math.random();
  const { title, odometer, vin, price, damage, description } = fieldNameValues;

  const { data, error, loading } = useGet_Add_Car_Fields_QueryQuery();

  const [
    getModelsLazyQuery,
    { data: lazyModelData, loading: lazyModelLoading },
  ] = useGet_Add_Car_Fields_QueryLazyQuery();

  const [
    getCitiesLazyQuery,
    { data: lazyCitiesData, loading: lazyCitiesLoading },
  ] = useGet_Add_Car_Fields_QueryLazyQuery();

  const [insertCar, { loading: mutationLoading, error: mutationError }] =
    useMutation_CarsMutation();

  const [isSuccessCreation, setIsSuccessCreation] = useState(false);

  const handleOptionStateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    getCitiesLazyQuery({
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
    getModelsLazyQuery({
      variables: {
        modelsWhere: {
          brand_id: {
            _eq: Number(event.target.value),
          },
        },
      },
    });
  };

  const onSubmit: SubmitHandler<IFormInput> = async (dataForm) => {
    setIsSuccessCreation(false);
    await insertCar({
      variables: {
        objects: [
          {
            batch: uuidv4(),
            odometer: dataForm.odometer,
            brand_id: dataForm.brand,
            color_id: dataForm.color,
            condition: dataForm.condition,
            damage_type: dataForm.damage,
            description: dataForm.description,
            price: dataForm.price,
            model_id: dataForm.model,
            state_id: dataForm.state,
            city_id: dataForm.city,
            sale_date: dataForm.saleDate,
            title: dataForm.title,
            vin: dataForm.vin,
            year: Number(dataForm.year.getFullYear()),
          },
        ],
      },
      onCompleted: (dataCompleted) => {
        if (dataCompleted.insert_cars) {
          if (dataCompleted.insert_cars.returning.length > 0) {
            reset(defaultValuesObject);
            setIsSuccessCreation(true);
          }
        }
      },

      optimisticResponse: {
        __typename: 'mutation_root',
        insert_cars: {
          __typename: 'cars_mutation_response',
          returning: [
            {
              __typename: 'cars',
              batch: uuidv4(),
              odometer: dataForm.odometer,
              brand_id: dataForm.brand ? dataForm.brand : randomNumber,
              color_id: dataForm.color ? dataForm.color : randomNumber,
              condition: dataForm.condition,
              damage_type: dataForm.damage,
              description: dataForm.description,
              price: dataForm.price,
              model_id: dataForm.model ? dataForm.model : randomNumber,
              state_id: dataForm.state ? dataForm.state : randomNumber,
              city_id: dataForm.city ? dataForm.city : randomNumber,
              sale_date: dataForm.saleDate,
              title: dataForm.title,
              vin: dataForm.vin,
              year: Number(dataForm.year.getFullYear()),
            },
          ],
        },
      },
      update: (proxy, response) => {
        const previousData = proxy.readQuery<{ cars: Cars[] }>({
          query: GET_CARS,
        });

        if (previousData !== null) {
          proxy.writeQuery({
            query: GET_CARS,

            data: {
              ...previousData,
              cars: response.data
                ? [response.data.insert_cars, ...previousData.cars]
                : null,
            },
          });
        } else {
          proxy.writeQuery({
            query: GET_CARS,
            data: {
              cars: response.data ? [response.data.insert_cars] : null,
            },
          });
        }
      },
    });
  };
  return (
    <Container>
      {error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <Form data-testid='form'>
          <TextField
            register={register}
            fieldName={title}
            placeholder={title}
            fieldRequired
          />
          {errors.title && errors.title.message ? (
            <ErrorMessage message={errors.title.message} />
          ) : null}

          <NestedElements>
            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={odometer}
                placeholder={odometer}
                fieldRequired
              />
              {errors.odometer && errors.odometer.message ? (
                <ErrorMessage message={errors.odometer.message} />
              ) : null}
            </SectionNestedElement>

            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={vin}
                placeholder={vin}
                fieldRequired
              />
              {errors.vin && errors.vin.message ? (
                <ErrorMessage message={errors.vin.message} />
              ) : null}
            </SectionNestedElement>
          </NestedElements>

          <NestedElements>
            <SectionNestedElement>
              <SelectOption
                {...register('brand')}
                onChange={handleOptionChange}
                data-testid='brand'
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
              {errors.brand && errors.brand.message ? (
                <ErrorMessage message={errors.brand.message} />
              ) : null}
            </SectionNestedElement>
            <SectionNestedElement>
              <SelectOption {...register('model')} data-testid='model'>
                <OptionElement value=''>Select Model</OptionElement>
                {!lazyModelLoading && (
                  <>
                    {lazyModelData?.models.map((model) => {
                      return (
                        <OptionElement key={model.id} value={model.id}>
                          {model.name}
                        </OptionElement>
                      );
                    })}
                  </>
                )}
              </SelectOption>
              {errors.model && errors.model.message ? (
                <ErrorMessage message={errors.model.message} />
              ) : null}
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
            </SectionNestedElement>
            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={price}
                placeholder={price}
                fieldRequired
              />
              {errors.price && errors.price.message ? (
                <ErrorMessage message={errors.price.message} />
              ) : null}
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
              {errors.condition && errors.condition.message ? (
                <ErrorMessage message={errors.condition.message} />
              ) : null}
            </SectionNestedElement>

            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={damage}
                placeholder={damage}
                fieldRequired
              />
              {errors.damage && errors.damage.message ? (
                <ErrorMessage message={errors.damage.message} />
              ) : null}
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
              {errors.color && errors.color.message ? (
                <ErrorMessage message={errors.color.message} />
              ) : null}
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
              {errors.state && errors.state.message ? (
                <ErrorMessage message={errors.state.message} />
              ) : null}
            </SectionNestedElement>
            <SectionNestedElement>
              <SelectOption {...register('city')}>
                <OptionElement value=''>Select City</OptionElement>
                {!lazyCitiesLoading && lazyCitiesData ? (
                  <>
                    {lazyCitiesData.cities.map((city) => {
                      return (
                        <OptionElement key={city.id} value={city.id}>
                          {city.name}
                        </OptionElement>
                      );
                    })}
                  </>
                ) : null}
              </SelectOption>
              {errors.city && errors.city.message ? (
                <ErrorMessage message={errors.city.message} />
              ) : null}
            </SectionNestedElement>
          </NestedElements>

          <TextField
            register={register}
            fieldName={description}
            placeholder={description}
            fieldRequired
          />
          {errors.description && errors.description.message ? (
            <ErrorMessage message={errors.description.message} />
          ) : null}

          <Button
            title={mutationLoading ? 'Creating...' : 'Create'}
            onClick={handleSubmit(onSubmit)}
            disabled={mutationLoading ? true : false}
          />
          {mutationError && <ErrorMessage message={mutationError.message} />}
          {isSuccessCreation && <SuccessCreationMessage />}
        </Form>
      )}
    </Container>
  );
};
export default AddCarForm;
