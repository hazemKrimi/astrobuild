import { useEffect, useState } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';
import { roleVar } from '../../graphql/state';
import { Design, Empty, Settings, Specification } from '../../assets';
import {
  Box,
  Button,
  FeatureCard,
  Text,
  Spinner,
  Link,
} from '../../components';
import { Wrapper } from './styles';
import {
  GetAllTemplatesQuery,
  GetAllTemplatesQueryVariables,
  GetTemplateByIdQuery,
  GetTemplateByIdQueryVariables,
  TemplateOutput,
} from '../../graphql/types';
import {
  GET_ALL_TEMPLATES,
  GET_TEMPLATE_BY_ID,
} from '../../graphql/template.api';

const Template = () => {
  const role = useReactiveVar(roleVar);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<TemplateOutput>();

  const [getTemplates, { loading: templatesLoading }] = useLazyQuery<
    GetAllTemplatesQuery,
    GetAllTemplatesQueryVariables
  >(GET_ALL_TEMPLATES, {
    onCompleted({ getAllTemplates }) {
      setTemplate(getAllTemplates[0]);
    },
    fetchPolicy: 'network-only',
  });

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
    } else {
      getTemplates();
    }

    // eslint-disable-next-line
  }, [id]);

  return role === 'productOwner' || role === 'developer' ? (
    <>
      {!templatesLoading && !templateLoading ? (
        <>
          {template ? (
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
                      {template.name}
                    </Text>
                  </Box>
                  <Box
                    marginRight={role === 'productOwner' ? '20px' : undefined}
                  >
                    <Button
                      color={role || 'client'}
                      variant='primary-action'
                      text='Prototype'
                      iconLeft={<Design />}
                      disabled={role === 'productOwner'}
                      onClick={() => history.push(`/prototype/${id}`)}
                    />
                  </Box>
                  {role === 'productOwner' && (
                    <Box>
                      <Button
                        color={role || 'client'}
                        variant='primary-action'
                        text='Settings'
                        iconLeft={<Settings />}
                        onClick={() => history.push(`/template-settings/${id}`)}
                      />
                    </Box>
                  )}
                </Box>
                <Box marginBottom='30px'>
                  <Text variant='headline' gutterBottom>
                    Description
                  </Text>
                  <Text>{template.description}</Text>
                </Box>
                {template.features && (
                  <Box
                    display='flex'
                    flexDirection='column'
                    marginBottom='30px'
                  >
                    <Box marginBottom='10px'>
                      <Text variant='headline' gutterBottom>
                        Features
                      </Text>
                    </Box>
                    <Box
                      display='grid'
                      gridTemplateColumns='repeat(3, 1fr)'
                      columnGap='40px'
                      rowGap='45px'
                      alignItems='stretch'
                    >
                      {template.features.map((feature) => (
                        <FeatureCard feature={feature} key={feature.id} />
                      ))}
                    </Box>
                  </Box>
                )}
                {template.specification && (
                  <Box
                    display='flex'
                    flexDirection='column'
                    marginBottom='30px'
                  >
                    <Box marginBottom='10px'>
                      <Text variant='headline' gutterBottom>
                        Deliverables
                      </Text>
                    </Box>
                    <Box
                      display='flex'
                      flexDirection='row'
                      alignItems='center'
                      justifyContent='space-between'
                      padding='35px 20px'
                      boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                      borderRadius='10px'
                    >
                      <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                      >
                        <Box marginRight='10px'>
                          <Specification />
                        </Box>
                        <Text variant='title'>Specification</Text>
                      </Box>
                      <Link href='#' color={role} onClick={() => {}}>
                        Download
                      </Link>
                    </Box>
                  </Box>
                )}
                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                  marginBottom='30px'
                ></Box>
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

export default Template;
