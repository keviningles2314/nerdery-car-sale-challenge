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
import { useEffect, useState } from 'react';
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

  const [isSuccessCreation, setIsSuccesCreation] = useState<boolean>(false);

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

  const [
    insertCar,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation_CarsMutation();

  useEffect(() => {
    if (mutationData) {
      if (mutationData!.insert_cars!.returning.length > 0) {
        reset(defaultValuesObject);
        setIsSuccesCreation(true);
      }
    }
  }, [mutationData, mutationLoading]);

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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSuccesCreation(false);
    await insertCar({
      variables: {
        objects: [
          {
            batch: uuidv4(),
            odometer: data.odometer,
            brand_id: data.brand,
            color_id: data.color,
            condition: data.condition,
            damage_type: data.damage,
            description: data.description,
            price: data.price,
            model_id: data.model,
            state_id: data.state,
            city_id: data.city,
            sale_date: data.saleDate,
            title: data.title,
            vin: data.vin,
            year: Number(data.year.getFullYear()),
          },
        ],
      },
      optimisticResponse: {
        __typename: 'mutation_root',
        insert_cars: {
          __typename: 'cars_mutation_response',
          returning: [
            {
              __typename: 'cars',
              year: Number(data.year.getFullYear()),
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
              cars: [response.data?.insert_cars, ...previousData.cars],
            },
          });
        } else {
          proxy.writeQuery({
            query: GET_CARS,
            data: {
              cars: [response.data?.insert_cars],
            },
          });
        }
      },
      refetchQueries: [GET_CARS],
      awaitRefetchQueries: true,
    });
  };
  return (
    <Container>
      {!error ? (
        <Form data-testid='form'>
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
              {errors.brand && <ErrorMessage message={errors.brand.message!} />}
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
                {!lazyCitiesLoading && (
                  <>
                    {lazyCitiesData?.cities.map((city) => {
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

          <Button
            title={mutationLoading ? 'Creating...' : 'Create'}
            onClick={handleSubmit(onSubmit)}
            disabled={mutationLoading ? true : false}
          />
          {mutationError && <ErrorMessage message={mutationError.message} />}
          {isSuccessCreation && <SuccessCreationMessage />}
        </Form>
      ) : (
        <ErrorMessage message={error.message} />
      )}
    </Container>
  );
};
export default AddCarForm;
