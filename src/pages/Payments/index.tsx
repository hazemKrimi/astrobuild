import * as Yup from 'yup';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useFormik } from 'formik';
import { useReactToPrint } from 'react-to-print';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router';
import { roleVar } from '../../graphql/state';
import { Wrapper } from './styles';
import { Box, Button, Text } from '../../components';
import { ArrowLeft } from '../../assets';

const Payments = () => {
  const role = useReactiveVar(roleVar);
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {
      error: paymentError,
      paymentMethod,
    } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (paymentError) {
      console.log('[error]', paymentError);
    } else {
      console.log('[PaymentMethod]', paymentMethod);

      const paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1000,
        },
        requestPayerName: true,
        requestPayerEmail: false,
      });

      console.log(paymentRequest);

      const result = await paymentRequest.canMakePayment();

      console.log(result);

      paymentRequest.show();
    }
  };

  useEffect(() => {}, []);

  return role === 'client' ? (
    <Wrapper>
      <Box padding='35px 45px 0px 120px'>
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
      </Box>
      <Box width='300px' margin='100px auto'>
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type='submit' disabled={!stripe}>
            Pay
          </button>
        </form>
      </Box>
    </Wrapper>
  ) : (
    <>
      {role === 'admin' && <Redirect to='/clients' />}
      {role === 'developer' ||
        (role === 'productOwner' && <Redirect to='/project' />)}
    </>
  );
};

export default Payments;
