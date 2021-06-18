import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router';
import { roleVar } from '../../graphql/state';
import { Wrapper } from './styles';
import { Alert, Box, Button, Input, Spinner, Text } from '../../components';
import { ArrowLeft } from '../../assets';
import {
  GetProjectByIdQuery,
  GetProjectByIdQueryVariables,
  ProjectOutput,
} from '../../graphql/types';
import { GET_PROJECT_BY_ID } from '../../graphql/project.api';

type Transaction = {
  amount: number;
  created: boolean;
  selectedOption: number;
  _id: string;
};

type TransactionData = {
  transactions: Array<Transaction>;
  remaining_amount: number;
  amount: number;
  project_id: string;
  status: boolean;
  total_amount: number;
  _id: string;
};

const Payments = () => {
  const role = useReactiveVar(roleVar);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectOutput>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [transactionsData, setTransactionsData] = useState<TransactionData>();
  const [selectedChunk, setSelectedChunk] = useState<number | undefined>();
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  const [getProject, { loading: projectLoading }] = useLazyQuery<
    GetProjectByIdQuery,
    GetProjectByIdQueryVariables
  >(GET_PROJECT_BY_ID, {
    onCompleted({ getProjectById }) {
      setProject(getProjectById);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    (async () => {
      if (id) {
        getProject({ variables: { id } });

        try {
          const transactionsResult = await (
            await fetch(`${process.env.REACT_APP_PAYMENT_API}/transactions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ project_id: id }),
            })
          ).json();
          if (transactionsResult) setTransactionsData(transactionsResult);
        } catch (err) {
          console.error(err);
        }
      }
    })();

    // eslint-disable-next-line
  }, [id]);

  const paymentForm = useFormik({
    initialValues: {
      number: '',
      expMonth: '',
      expYear: '',
      cvc: '',
    },
    validationSchema: Yup.object().shape({
      number: Yup.number()
        .typeError('Card Number must be a number')
        .required('Card Number is required'),

      expMonth: Yup.number()
        .typeError('Expiary Month must be a number')
        .required('Expiary Month is required'),

      expYear: Yup.number()
        .typeError('Expiary Year must be a number')
        .required('Expiary Year is required'),

      cvc: Yup.number()
        .typeError('CVC must be a number')
        .required('CVC is required'),
    }),
    onSubmit: async ({ number, expMonth, expYear, cvc }) => {
      try {
        setPaymentLoading(true);
        let amount = 0;

        switch (selectedChunk) {
          case 0: {
            amount =
              (project?.paymentOption.optOne! * project?.totalPrice!) / 100;
            break;
          }
          case 1: {
            amount =
              (project?.paymentOption.optTwo! * project?.totalPrice!) / 100;
            break;
          }
          case 2: {
            amount =
              (project?.paymentOption.optThree! * project?.totalPrice!) / 100;
            break;
          }
          default:
            break;
        }

        const transactionsResult = await (
          await fetch(`${process.env.REACT_APP_PAYMENT_API}/charge`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              project_id: project?.id,
              total_amount: project?.totalPrice,
              selectedOption: selectedChunk,
              amount,
              card: {
                number,
                exp_month: expMonth,
                exp_year: expYear,
                cvc,
              },
            }),
          })
        ).json();

        if (transactionsResult) {
          setPaymentLoading(false);
          setTransactionsData(transactionsResult);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        }
      } catch (err) {
        setPaymentLoading(false);
        setError(err);
        setTimeout(() => setError(''), 3000);
      }
    },
  });

  return role === 'client' ? (
    <>
      {!projectLoading ? (
        <Wrapper>
          <Box padding='35px 45px 35px 120px'>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              marginBottom='20px'
            >
              <Box flexGrow='1' marginRight='20px'>
                <Button
                  text='Back'
                  color={role || 'client'}
                  size='small'
                  onClick={() => history.goBack()}
                  iconLeft={<ArrowLeft />}
                />
                <Text variant='headline' weight='bold'>
                  Payments
                </Text>
              </Box>
              {error && <Alert color='error' text={error} />}
              {success && <Alert color='success' text='Payment successfull' />}
            </Box>
            <Box
              display='grid'
              gridTemplateColumns='auto 1fr'
              alignItems='stretch'
              columnGap='40px'
            >
              <Box>
                <Box
                  padding='15px 20px'
                  borderRadius='10px'
                  boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
                  display='grid'
                  gridTemplateColumns='repeat(3, 1fr)'
                  alignItems='center'
                  justifyContent='flex-start'
                  className='table-head'
                  marginBottom='20px'
                  columnGap='3rem'
                >
                  <Text variant='title'>Part</Text>
                  <Text variant='title'>Percentage</Text>
                  <Text variant='title'>Action</Text>
                </Box>
                <Box>
                  {project?.paymentOption.optOne && (
                    <Box
                      padding='15px 20px'
                      borderRadius='10px'
                      boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
                      display='grid'
                      gridTemplateColumns='repeat(3, 1fr)'
                      alignItems='center'
                      justifyContent='flex-start'
                      marginBottom='20px'
                      columnGap='3rem'
                      onClick={() => {
                        setSelectedChunk(0);
                      }}
                    >
                      <Text variant='headline' weight='bold'>
                        #1
                      </Text>
                      <Text variant='headline' weight='bold'>
                        {project?.paymentOption.optOne}%
                      </Text>
                      <Box>
                        <Button
                          text='Select'
                          color={role || 'client'}
                          disabled={
                            selectedChunk === 0 ||
                            (transactionsData &&
                              transactionsData.transactions &&
                              !!Array.from(transactionsData.transactions).find(
                                (transaction: any) =>
                                  transaction.selectedOption === 0
                              ))
                          }
                        />
                      </Box>
                    </Box>
                  )}
                  {project?.paymentOption.optTwo && (
                    <Box
                      padding='15px 20px'
                      borderRadius='10px'
                      boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
                      display='grid'
                      gridTemplateColumns='repeat(3, 1fr)'
                      alignItems='center'
                      justifyContent='flex-start'
                      marginBottom='20px'
                      columnGap='3rem'
                      onClick={() => {
                        setSelectedChunk(1);
                      }}
                    >
                      <Text variant='headline' weight='bold'>
                        #1
                      </Text>
                      <Text variant='headline' weight='bold'>
                        {project?.paymentOption.optTwo}%
                      </Text>
                      <Box>
                        <Button
                          text='Select'
                          color={role || 'client'}
                          disabled={
                            selectedChunk === 1 ||
                            (transactionsData &&
                              transactionsData.transactions &&
                              !!Array.from(transactionsData.transactions).find(
                                (transaction: any) =>
                                  transaction.selectedOption === 1
                              ))
                          }
                        />
                      </Box>
                    </Box>
                  )}
                  {project?.paymentOption.optThree && (
                    <Box
                      padding='15px 20px'
                      borderRadius='10px'
                      boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
                      display='grid'
                      gridTemplateColumns='repeat(3, 1fr)'
                      alignItems='center'
                      justifyContent='flex-start'
                      marginBottom='20px'
                      columnGap='3rem'
                      onClick={() => {
                        setSelectedChunk(2);
                      }}
                    >
                      <Text variant='headline' weight='bold'>
                        #1
                      </Text>
                      <Text variant='headline' weight='bold'>
                        {project?.paymentOption.optThree}%
                      </Text>
                      <Box>
                        <Button
                          text='Select'
                          color={role || 'client'}
                          disabled={
                            selectedChunk === 2 ||
                            (transactionsData &&
                              transactionsData.transactions &&
                              !!Array.from(transactionsData.transactions).find(
                                (transaction: any) =>
                                  transaction.selectedOption === 2
                              ))
                          }
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box>
                <Box
                  padding='15px 20px'
                  borderRadius='10px'
                  boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
                  background='#F9FAFA'
                  marginBottom='20px'
                >
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='space-between'
                    marginBottom='30px'
                  >
                    <Text variant='subheader'>Paid Costs</Text>
                    <Text variant='subheader' weight='bold'>
                      {project && transactionsData
                        ? project.totalPrice - transactionsData.remaining_amount
                        : 0}
                      $
                    </Text>
                  </Box>
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Text variant='subheader'>Remaining Costs</Text>
                    <Text variant='subheader' weight='bold'>
                      {transactionsData?.transactions
                        ? transactionsData?.remaining_amount
                        : project?.totalPrice}
                      $
                    </Text>
                  </Box>
                </Box>
                <Box
                  background='#FFFFFF'
                  padding='15px 20px'
                  borderRadius='10px'
                  boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
                >
                  <Box marginBottom='10px'>
                    <Text variant='headline' weight='bold'>
                      Pay with Credit Card
                    </Text>
                  </Box>
                  <form onSubmit={paymentForm.handleSubmit}>
                    <Box marginBottom='25px'>
                      <Input
                        name='number'
                        label='Card Number'
                        value={paymentForm.values.number}
                        onChange={paymentForm.handleChange}
                        onBlur={paymentForm.handleBlur}
                        error={
                          paymentForm.touched.number &&
                          !!paymentForm.errors.number
                        }
                        errorMessage={paymentForm.errors.number}
                      />
                    </Box>
                    <Box
                      display='grid'
                      gridTemplateColumns='repeat(2, 1fr)'
                      columnGap='20px'
                      alignItems='center'
                      marginBottom='25px'
                    >
                      <Input
                        name='expMonth'
                        label='Expiary Month'
                        value={paymentForm.values.expMonth}
                        onChange={paymentForm.handleChange}
                        onBlur={paymentForm.handleBlur}
                        error={
                          paymentForm.touched.expMonth &&
                          !!paymentForm.errors.expMonth
                        }
                        errorMessage={paymentForm.errors.expMonth}
                      />
                      <Input
                        name='expYear'
                        label='Expiary Year'
                        value={paymentForm.values.expYear}
                        onChange={paymentForm.handleChange}
                        onBlur={paymentForm.handleBlur}
                        error={
                          paymentForm.touched.expYear &&
                          !!paymentForm.errors.expYear
                        }
                        errorMessage={paymentForm.errors.expYear}
                      />
                    </Box>
                    <Box marginBottom='25px'>
                      <Input
                        name='cvc'
                        label='CVC'
                        value={paymentForm.values.cvc}
                        onChange={paymentForm.handleChange}
                        onBlur={paymentForm.handleBlur}
                        error={
                          paymentForm.touched.cvc && !!paymentForm.errors.cvc
                        }
                        errorMessage={paymentForm.errors.cvc}
                      />
                    </Box>
                    <Button
                      fullWidth
                      color={role || 'client'}
                      text='Pay'
                      variant='primary-action'
                      type='submit'
                      loading={paymentLoading}
                    />
                  </form>
                </Box>
              </Box>
            </Box>
          </Box>
        </Wrapper>
      ) : (
        <Spinner fullScreen color={role} />
      )}
    </>
  ) : (
    <>
      {role === 'admin' && <Redirect to='/clients' />}
      {role === 'developer' ||
        (role === 'productOwner' && <Redirect to='/project' />)}
    </>
  );
};

export default Payments;
