import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router';
import { roleVar } from '../../graphql/state';
import { Empty, Settings } from '../../assets';
import {
  Box,
  Text,
  Button,
  Spinner,
  ImagePreview,
  Link,
} from '../../components';
import { Wrapper } from './styles';
import {
  FeatureOutput,
  GetAllFeaturesQuery,
  GetAllFeaturesQueryVariables,
  GetFeatureByIdQuery,
  GetFeatureByIdQueryVariables,
} from '../../graphql/types';
import { GET_ALL_FEATURES, GET_FEATURE_BY_ID } from '../../graphql/feature.api';

const Feature = () => {
  const role = useReactiveVar(roleVar);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [feature, setFeature] = useState<FeatureOutput>();

  const [getFeatures, { loading: featuresLoading }] = useLazyQuery<
    GetAllFeaturesQuery,
    GetAllFeaturesQueryVariables
  >(GET_ALL_FEATURES, {
    onCompleted({ getAllFeatures }) {
      setFeature(getAllFeatures[0]);
    },
    fetchPolicy: 'network-only',
  });

  const [getFeature, { loading: featureLoading }] = useLazyQuery<
    GetFeatureByIdQuery,
    GetFeatureByIdQueryVariables
  >(GET_FEATURE_BY_ID, {
    onCompleted({ getFeatureById }) {
      setFeature(getFeatureById);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (id) {
      getFeature({ variables: { id } });
    } else {
      getFeatures();
    }

    // eslint-disable-next-line
  }, [id]);

  return role === 'developer' ? (
    <>
      {!featuresLoading && !featureLoading ? (
        <>
          {feature ? (
            <Wrapper>
              <Box padding='35px 45px 0px 120px'>
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                  marginBottom='20px'
                >
                  <Box flexGrow='1'>
                    <Text variant='headline' weight='bold'>
                      {feature.name}
                    </Text>
                  </Box>
                  <Button
                    color={role || 'client'}
                    variant='primary-action'
                    text='Settings'
                    iconLeft={<Settings />}
                    onClick={() => history.push(`/feature-settings/${id}`)}
                  />
                </Box>
                <Box marginBottom='30px'>
                  <Text variant='headline' gutterBottom>
                    Description
                  </Text>
                  <Text>{feature.description}</Text>
                </Box>
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                  marginBottom='30px'
                >
                  <Box marginRight='35px'>
                    <Text variant='headline' gutterBottom>
                      Price
                    </Text>
                  </Box>
                  <Text variant='title' weight='bold'>
                    ${feature.price}
                  </Text>
                </Box>
                {feature.wireframes && (
                  <Box
                    display='flex'
                    flexDirection='column'
                    marginBottom='30px'
                  >
                    <Text variant='headline' gutterBottom>
                      Wireframes
                    </Text>
                    <Box
                      background='white'
                      boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
                      borderRadius='10px'
                      width='100%'
                      padding='30px'
                      display='grid'
                      gridTemplate='auto / repeat(auto-fit, 175px)'
                      gap='30px'
                      alignItems='stretch'
                    >
                      {feature.wireframes.map((image) => (
                        <ImagePreview
                          key={image.name}
                          color={role}
                          image={image}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                  marginBottom='30px'
                >
                  <Box marginRight='35px'>
                    <Text variant='headline' gutterBottom>
                      Repo
                    </Text>
                  </Box>
                  <Link href={feature.repo}>{feature.repo}</Link>
                </Box>
              </Box>
            </Wrapper>
          ) : (
            <Wrapper color={role}>
              <Box
                width='100%'
                height='100vh'
                display='grid'
                alignItems='center'
                justifyContent='center'
              >
                <Box>
                  <Empty />
                </Box>
              </Box>
            </Wrapper>
          )}
        </>
      ) : (
        <Spinner fullScreen color={role || 'client'} />
      )}
    </>
  ) : (
    <>
      {role === 'admin' && <Redirect to='/clients' />}
      {role === 'client' ||
        (role === 'productOwner' && <Redirect to='/project' />)}
    </>
  );
};

export default Feature;
