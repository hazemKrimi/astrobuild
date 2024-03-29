import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import { useState, useEffect } from 'react';
import { roleVar } from '../../graphql/state';
import { Wrapper } from './styles';
import { Alert, Box, Button, Input, Spinner, Text } from '../../components';
import {
  GetProjectByIdQuery,
  GetProjectByIdQueryVariables,
  ProjectOutput,
  UpdateProjectMutation,
  UpdateProjectMutationVariables,
} from '../../graphql/types';
import { GET_PROJECT_BY_ID, UPDATE_PROJECT } from '../../graphql/project.api';
import { ArrowLeft, Empty } from '../../assets';
import { theme } from '../../themes';

const UpdateProject = () => {
  const navigate = useNavigate();
  const role = useReactiveVar(roleVar);
  const [error, setError] = useState<string>('');
  const [project, setProject] = useState<ProjectOutput>();
  const { id } = useParams<{ id: string }>();

  const [getProject, { loading: projectLoading, error: projectError }] = useLazyQuery<
    GetProjectByIdQuery,
    GetProjectByIdQueryVariables
  >(GET_PROJECT_BY_ID, {
    onCompleted({ getProjectById }) {
      setProject(getProjectById);
    }
  });

  const [updateProject, { loading: updateProjectLoading }] = useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >(UPDATE_PROJECT, {
    onCompleted() {
      navigate(`/project/${id}`);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0].extensions?.info as string);
      setTimeout(() => setError(''), 3000);
    },
  });

  useEffect(() => {
    if (id) {
      getProject({ variables: { id } });
    }
  }, [id]);

  const basicInfoForm = useFormik({
    initialValues: {
      name: project?.name || '',
      imageName: project?.image.name || '',
      imageSource: project?.image.src || '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      imageName: Yup.string().required('Image is required'),
      imageSource: Yup.string().required('Image is required'),
    }),
    onSubmit: ({ name, imageName, imageSource }) => {
      updateProject({
        variables: {
          id: id as string,
          name,
          image: { name: imageName, src: imageSource },
        },
      });
    },
    enableReinitialize: true,
  });

  if (projectLoading) return (
    <Spinner fullScreen color={role || 'client'} />
  );

  if (projectError || !project) return (
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
      <Box padding='35px 45px 30px 120px'>
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
              onClick={() => navigate(-1)}
              iconLeft={<ArrowLeft />}
            />
            <Text variant='headline' weight='bold'>
              Update Project
            </Text>
          </Box>
          {error && <Alert color='error' text={error} />}
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            marginLeft='20px'
          >
            <Button
              text='Update'
              loading={updateProjectLoading}
              color={role || 'client'}
              variant='primary-action'
              onClick={basicInfoForm.handleSubmit}
            />
          </Box>
        </Box>
        <Box
          display='grid'
          gridTemplateColumns='0.7fr 0.5fr'
          columnGap='45px'
          alignItems='stretch'
        >
          <form onSubmit={basicInfoForm.handleSubmit}>
            <Box
              display='grid'
              gridTemplateColumns='auto'
              rowGap='0.5rem'
              position='relative'
            >
              <Input
                name='name'
                label='Name'
                color={role || 'client'}
                value={basicInfoForm.values.name}
                onChange={basicInfoForm.handleChange}
                onBlur={basicInfoForm.handleBlur}
                error={
                  basicInfoForm.touched.name && !!basicInfoForm.errors.name
                }
                errorMessage={basicInfoForm.errors.name}
              />
              <Input
                type='file'
                label='Image'
                color={role || 'client'}
                onChange={async (
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const formData = new FormData();

                  if (event.target.files && event.target.files[0]) {
                    formData.append('file', event.target.files[0]);
                    formData.append('upload_preset', 'xofll5kc');

                    basicInfoForm.setFieldValue('imageName', '');
                    basicInfoForm.setFieldValue('imageSource', '');

                    const data = await (
                      await fetch(`${import.meta.env.VITE_CLOUDINARY_URL}`, {
                        method: 'POST',
                        body: formData,
                      })
                    ).json();

                    const filename = data.original_filename;
                    const filesource = data.secure_url;

                    basicInfoForm.setFieldValue('imageName', filename);
                    basicInfoForm.setFieldValue('imageSource', filesource);
                  }
                }}
                error={
                  basicInfoForm.touched.imageName &&
                  (!!basicInfoForm.errors.imageName ||
                    !!basicInfoForm.errors.imageSource)
                }
                errorMessage={basicInfoForm.errors.imageName}
              />
            </Box>
          </form>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            padding='100px'
            background='#ffffff'
            boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
            borderRadius='10px'
          >
            <Box
              className='project-image'
              background={
                (basicInfoForm.values.imageSource &&
                  `url(${basicInfoForm.values.imageSource})`) ||
                theme.colors.client.light
              }
              width='150px'
              height='150px'
              borderRadius='50%'
              marginBottom='20px'
            ></Box>
            <Box>
              <Text variant='headline' weight='bold'>
                {basicInfoForm.values.name || 'Project Name'}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default UpdateProject;
