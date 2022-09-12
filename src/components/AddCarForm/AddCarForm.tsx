import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useGet_Add_Car_Fields_QueryLazyQuery,
  useGet_Add_Car_Fields_QueryQuery,
} from '../../api/graphql/__generated__/graphql-types';
import { fieldNameValues } from '../../helpers/objectValues';
import Button from '../Button/Button';
import EmailField from '../TextField/TextField';
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

export interface IFormInput {
  price: number;
  odometer: number;
  vin: string;
  title: string;
  damage: string;
  year: number;
  description: string;
}

const AddCarForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const { title, odometer, vin, price, damage, year, description } =
    fieldNameValues;
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
          {errors.title?.type === 'required' && (
            <ErrorMessage message={`${title} is Required`} />
          )}
          <NestedElements>
            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={odometer}
                placeholder={odometer}
                fieldRequired
              />
              {errors.title?.type === 'required' && (
                <ErrorMessage message={`${odometer} is Required`} />
              )}
            </SectionNestedElement>
            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={vin}
                placeholder={vin}
                fieldRequired
              />
              {errors.vin?.type === 'required' && (
                <ErrorMessage message={`${vin} is Required`} />
              )}
            </SectionNestedElement>
          </NestedElements>
          <NestedElements>
            <SelectOption onChange={handleOptionChange}>
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
            <SelectOption>
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
          </NestedElements>
          <NestedElements>
            <SectionNestedElement>
              <RegularText text='Sale Date' isBaseColor />
              <InputElementField type='date' />
            </SectionNestedElement>
            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={price}
                placeholder={price}
                fieldRequired
              />
              {errors.price?.type === 'required' && (
                <ErrorMessage message={`${price} is Required`} />
              )}
            </SectionNestedElement>
          </NestedElements>
          <NestedElements>
            <SectionNestedElement>
              <RegularText text='Condition :' isBaseColor />
              <ConditionContainer>
                <LabelCondition>
                  <RegularText text='A: Salvage Title' isBaseColor />
                  <InputElementField type='radio' value='A' />
                </LabelCondition>
                <LabelCondition>
                  <RegularText text='N: New' isBaseColor />
                  <InputElementField type='radio' value='N' />
                </LabelCondition>
              </ConditionContainer>
            </SectionNestedElement>
            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={damage}
                placeholder={damage}
                fieldRequired
              />
              {errors.damage?.type === 'required' && (
                <ErrorMessage message={`${damage} is Required`} />
              )}
            </SectionNestedElement>
          </NestedElements>
          <NestedElements>
            <SectionNestedElement>
              <TextField
                register={register}
                fieldName={year}
                placeholder={year}
                fieldRequired
              />
              {errors.year?.type === 'required' && (
                <ErrorMessage message={`${year} is Required`} />
              )}
            </SectionNestedElement>
            <SectionNestedElement>
              <SelectOption>
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
            </SectionNestedElement>
          </NestedElements>
          <NestedElements>
            <SelectOption onChange={handleOptionStateChange}>
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
            <SelectOption>
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
          </NestedElements>
          <TextField
            register={register}
            fieldName={description}
            placeholder={description}
            fieldRequired
          />
          {errors.description?.type === 'required' && (
            <ErrorMessage message={`${description} is Required`} />
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
