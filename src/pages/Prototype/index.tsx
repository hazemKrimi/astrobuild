import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router';
import { roleVar } from '../../graphql/state';
import { Empty, ArrowLeft, Edit, Check } from '../../assets';
import {
  Box,
  Text,
  Button,
  Spinner,
  FrontendFeatureCard,
  BackendFeatureCard,
} from '../../components';
import { Wrapper } from './styles';
import {
  GetTemplateByIdQuery,
  GetTemplateByIdQueryVariables,
  TemplateOutput,
} from '../../graphql/types';
import { GET_TEMPLATE_BY_ID } from '../../graphql/template.api';
import { theme } from '../../themes';

const Prototype = () => {
  const role = useReactiveVar(roleVar);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<TemplateOutput>();
  const [editing, setEditing] = useState<boolean>(false);

  const [getTemplate, { loading: templateLoading }] = useLazyQuery<
    GetTemplateByIdQuery,
    GetTemplateByIdQueryVariables
  >(GET_TEMPLATE_BY_ID, {
    onCompleted({ getTemplateById }) {
      setTemplate(getTemplateById);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (id) {
      getTemplate({ variables: { id } });
    }

    // eslint-disable-next-line
  }, [id]);

  return role === 'productOwner' || role === 'developer' ? (
    <>
      {!templateLoading ? (
        <>
          {template ? (
            <Wrapper color={role}>
              <Box padding='35px 45px 0px 120px'>
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                  marginBottom='20px'
                >
                  <Box>
                    <Button
                      text='Back'
                      color={role || 'client'}
                      size='small'
                      onClick={() => history.goBack()}
                      iconLeft={<ArrowLeft />}
                    />
                    <Text variant='headline' weight='bold'>
                      Prototype
                    </Text>
                  </Box>
                </Box>
                {template.features && (
                  <>
                    <Box
                      display='flex'
                      flexDirection='column'
                      marginBottom='30px'
                    >
                      <Box marginBottom='10px'>
                        <Text variant='headline' gutterBottom>
                          Frontend Features
                        </Text>
                      </Box>
                      <Box
                        display='grid'
                        gridTemplateColumns='repeat(2, auto)'
                        rowGap='100px'
                        alignItems='stretch'
                        background='#F9FAFA'
                        boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                        borderRadius='10px'
                        padding='30px 120px'
                        position='relative'
                      >
                        {template.features.map((feature, index) => {
                          if (
                            feature.featureType === 'frontend' ||
                            feature.featureType === 'fullstack'
                          ) {
                            return (
                              <FrontendFeatureCard
                                feature={feature}
                                key={feature.id}
                                className={
                                  index === 0 || index % 2 === 0
                                    ? 'frontend-feature-even'
                                    : 'frontend-feature-odd'
                                }
                              />
                            );
                          }
                          return null;
                        })}
                        <Box
                          position='absolute'
                          top='30px'
                          right='30px'
                          width='35px'
                          height='35px'
                          padding='10px'
                          borderRadius='10px'
                          background={
                            !editing
                              ? theme.colors.white.main
                              : theme.colors[role].main
                          }
                          boxShadow='1px 1px 5px rgba(50, 59, 105, 0.25)'
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          cursor='pointer'
                          onClick={() => setEditing(!editing)}
                        >
                          {!editing ? <Edit /> : <Check />}
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      display='flex'
                      flexDirection='column'
                      marginBottom='30px'
                    >
                      <Box marginBottom='10px'>
                        <Text variant='headline' gutterBottom>
                          Backend Features
                        </Text>
                      </Box>
                      <Box
                        display='grid'
                        gridTemplateColumns='repeat(3, 1fr)'
                        gap='20px'
                        alignItems='stretch'
                        justifyContent='center'
                      >
                        {template.features.map((feature) => {
                          if (
                            feature.featureType === 'backend' ||
                            feature.featureType === 'fullstack'
                          ) {
                            return (
                              <BackendFeatureCard
                                feature={feature}
                                key={feature.id}
                              />
                            );
                          }
                          return null;
                        })}
                      </Box>
                    </Box>
                  </>
                )}
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
      {role === 'client' && <Redirect to='/project' />}
    </>
  );
};

export default Prototype;
