import { useReactToPrint } from 'react-to-print';
import { useEffect, useState, useRef } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { Navigate } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
import { roleVar } from '../../graphql/state';
import { Design, Empty, Settings, Specification } from '../../assets';
import {
  Box,
  Button,
  FeatureCard,
  Text,
  Spinner,
  Link,
  Specification as SpecificationPrint,
  Chip,
} from '../../components';
import { Wrapper } from './styles';
import {
  CategoryOutput,
  GetAllTemplatesQuery,
  GetAllTemplatesQueryVariables,
  GetCategoryByIdQuery,
  GetCategoryByIdQueryVariables,
  GetTemplateByIdQuery,
  GetTemplateByIdQueryVariables,
  TemplateOutput,
} from '../../graphql/types';
import {
  GET_ALL_TEMPLATES,
  GET_TEMPLATE_BY_ID,
} from '../../graphql/template.api';
import { GET_CATEGORY_BY_ID } from '../../graphql/category.api';

const Template = () => {
  const role = useReactiveVar(roleVar);
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<TemplateOutput>();
  const [category, setCategory] = useState<CategoryOutput>();

  const [getCategory, { loading: categoryLoading, error: categoryError }] = useLazyQuery<
    GetCategoryByIdQuery,
    GetCategoryByIdQueryVariables
  >(GET_CATEGORY_BY_ID, {
    onCompleted({ getCategoryById }) {
      setCategory(getCategoryById);
    }
  });

  const [getTemplates, { loading: templatesLoading, error: templatesError }] = useLazyQuery<
    GetAllTemplatesQuery,
    GetAllTemplatesQueryVariables
  >(GET_ALL_TEMPLATES, {
    onCompleted({ getAllTemplates }) {
      if (getAllTemplates.length > 0) {
        setTemplate(getAllTemplates[0]);
        getCategory({ variables: { id: getAllTemplates[0]?.category! } });
      }
    }
  });

  const [getTemplate, { loading: templateLoading, error: templateError }] = useLazyQuery<
    GetTemplateByIdQuery,
    GetTemplateByIdQueryVariables
  >(GET_TEMPLATE_BY_ID, {
    onCompleted({ getTemplateById }) {
      setTemplate(getTemplateById);
      getCategory({ variables: { id: getTemplateById?.category! } });
    }
  });

  useEffect(() => {
    if (id) {
      getTemplate({ variables: { id } });
    } else {
      getTemplates();
    }

    return () => {
      setTemplate(undefined);
      setCategory(undefined);
    };
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  if (role !== 'productOwner' && role !== 'developer') return (
    <>
      {role === 'admin' && <Navigate to='/clients' />}
      {role === 'client' && <Navigate to='/project' />}
    </>
  );

  if (templatesLoading || templateLoading || categoryLoading) return (
    <Spinner fullScreen color={role || 'client'} />
  );

  if (templatesError || templateError || categoryError || !template) return (
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
  );

  return (
    <Wrapper>
      <Box padding='35px 45px 0px 120px'>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          marginBottom='20px'
        >
          <Box
            flexGrow='1'
            display='flex'
            flexDirection='row'
            alignItems='center'
          >
            <Text variant='headline' weight='bold'>
              {template.name}
            </Text>
            {category && (
              <Box marginLeft='20px'>
                <Chip text={category.name} color={role} />
              </Box>
            )}
          </Box>
          <Box
            marginRight={role === 'productOwner' ? '20px' : undefined}
          >
            <Button
              color={role || 'client'}
              variant='primary-action'
              text='Prototype'
              iconLeft={<Design />}
              disabled={
                role === 'productOwner'
              }
              onClick={() =>
                navigate(`/prototype/${id || template.id}`)
              }
            />
          </Box>
          {role === 'productOwner' && (
            <Box>
              <Button
                color={role || 'client'}
                variant='primary-action'
                text='Settings'
                iconLeft={<Settings />}
                onClick={() =>
                  navigate(`/template-settings/${id || template.id}`)
                }
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
              <Link href='#' color={role} onClick={handlePrint}>
                Download
              </Link>
            </Box>
          </Box>
        )}
        {template.specification && template.features && (
          <Box display='none'>
            <SpecificationPrint
              ref={printRef}
              specification={template.specification}
              features={template.features}
            />
          </Box>
        )}
      </Box>
    </Wrapper>
  );
};

export default Template;
