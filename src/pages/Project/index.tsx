import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useReactToPrint } from 'react-to-print';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import { Navigate } from 'react-router';
import { roleVar, userVar } from '../../graphql/state';
import {
  Design,
  Empty,
  FullBuild,
  MVP,
  Payment,
  Settings,
  Specification,
} from '../../assets';
import {
  Box,
  Button,
  FeatureCard,
  Text,
  Spinner,
  Link,
  Specification as SpecificationPrint,
  Chip,
  Alert,
  Modal,
  Input,
} from '../../components';
import { Wrapper } from './styles';
import {
  AddProjectDesignMutation,
  AddProjectDesignMutationVariables,
  AddProjectFullBuildMutation,
  AddProjectFullBuildMutationVariables,
  AddProjectMvpMutation,
  AddProjectMvpMutationVariables,
  ChangeProjectStateMutation,
  ChangeProjectStateMutationVariables,
  GetAllProjectsByClientIdQuery,
  GetAllProjectsByClientIdQueryVariables,
  GetAllProjectsQuery,
  GetAllUsersQueryVariables,
  GetProjectByIdQuery,
  GetProjectByIdQueryVariables,
  GetPrototypeByIdQuery,
  GetPrototypeByIdQueryVariables,
  ProjectOutput,
  ProtoTypeOutput,
} from '../../graphql/types';
import {
  ADD_PROJECT_DESIGN,
  ADD_PROJECT_FULL_BUILD,
  ADD_PROJECT_MVP,
  CHANGE_PROJECT_STATE,
  GET_ALL_PROJECTS,
  GET_ALL_PROJECTS_BY_CLIENT_ID,
  GET_PROJECT_BY_ID,
} from '../../graphql/project.api';
import { GET_PROTOTYPE_BY_ID } from '../../graphql/prototype.api';

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

const Project = () => {
  const role = useReactiveVar(roleVar);
  const currentUser = useReactiveVar(userVar);
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectOutput>();
  const [prototype, setPrototype] = useState<Array<ProtoTypeOutput>>();
  const [error, setError] = useState<string>('');
  const [designModal, setDesignModal] = useState<boolean>(false);
  const [mvpModal, setMvpModal] = useState<boolean>(false);
  const [fullBuildModal, setFullBuildModal] = useState<boolean>(false);
  const [transactionsData, setTransactionsData] = useState<TransactionData>();

  const [getProjectsByClientId, { loading: clientProjectsLoading }] =
    useLazyQuery<
      GetAllProjectsByClientIdQuery,
      GetAllProjectsByClientIdQueryVariables
    >(GET_ALL_PROJECTS_BY_CLIENT_ID, {
      variables: {
        id: currentUser?.id!,
      },
      onCompleted({ getAllProjectsByClientId }) {
        if (getAllProjectsByClientId.length > 0)
          navigate(`/project/${getAllProjectsByClientId[0].id}`);
      },
      fetchPolicy: 'network-only',
    });

  const [getProjects, { loading: projectsLoading }] = useLazyQuery<
    GetAllProjectsQuery,
    GetAllUsersQueryVariables
  >(GET_ALL_PROJECTS, {
    onCompleted({ getAllProjects }) {
      if (getAllProjects.length > 0)
        navigate(`/project/${getAllProjects[0].id}`);
    },
    fetchPolicy: 'network-only',
  });

  const [getProject, { loading: projectLoading }] = useLazyQuery<
    GetProjectByIdQuery,
    GetProjectByIdQueryVariables
  >(GET_PROJECT_BY_ID, {
    onCompleted({ getProjectById }) {
      setProject(getProjectById);
    },
    fetchPolicy: 'network-only',
  });

  const [getPrototype, { loading: prototypeLoading }] = useLazyQuery<
    GetPrototypeByIdQuery,
    GetPrototypeByIdQueryVariables
  >(GET_PROTOTYPE_BY_ID, {
    onCompleted({ getPrototypeById }) {
      setPrototype(getPrototypeById.prototype);
    },
  });

  const [changeProjectState] = useMutation<
    ChangeProjectStateMutation,
    ChangeProjectStateMutationVariables
  >(CHANGE_PROJECT_STATE, {
    onCompleted({ changeProjectState: changedStateProject }) {
      setProject(changedStateProject);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0].extensions?.info as string);
      setTimeout(() => setError(''), 3000);
    },
  });

  const [addProjectDesign] = useMutation<
    AddProjectDesignMutation,
    AddProjectDesignMutationVariables
  >(ADD_PROJECT_DESIGN, {
    onCompleted({ addProjectDesign: projectWithDesign }) {
      setDesignModal(false);
      setProject(projectWithDesign);
    },
    onError({ graphQLErrors }) {
      setDesignModal(false);
      setError(graphQLErrors[0].extensions?.info as string);
      setTimeout(() => setError(''), 3000);
    },
  });

  const [addProjectMvp] = useMutation<
    AddProjectMvpMutation,
    AddProjectMvpMutationVariables
  >(ADD_PROJECT_MVP, {
    onCompleted({ addProjectMvp: projectWithMvp }) {
      setMvpModal(false);
      setProject(projectWithMvp);
    },
    onError({ graphQLErrors }) {
      setMvpModal(false);
      setError(graphQLErrors[0].extensions?.info as string);
      setTimeout(() => setError(''), 3000);
    },
  });

  const [addProjectFullBuild] = useMutation<
    AddProjectFullBuildMutation,
    AddProjectFullBuildMutationVariables
  >(ADD_PROJECT_FULL_BUILD, {
    onCompleted({ addProjectFullBuild: projectWithFullBuild }) {
      setFullBuildModal(false);
      setProject(projectWithFullBuild);
    },
    onError({ graphQLErrors }) {
      setFullBuildModal(false);
      setError(graphQLErrors[0].extensions?.info as string);
      setTimeout(() => setError(''), 3000);
    },
  });

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    if (id) {
      getProject({ variables: { id } });
    } else if (role === 'client') {
      getProjectsByClientId({
        variables: {
          id: currentUser?.id!,
        },
      });
    } else getProjects();

    return () => {
      setProject(undefined);
    };

    // eslint-disable-next-line
  }, [id, role]);

  useEffect(() => {
    (async () => {
      if (project) {
        getPrototype({ variables: { id: project?.template?.id } });

        try {
          const transactionsResult = await (
            await fetch(`${import.meta.env.VITE_PAYMENT_API}/transactions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ project_id: project.id }),
            })
          ).json();
          if (transactionsResult) setTransactionsData(transactionsResult);
        } catch (err) {
          console.error(err);
        }
      }
    })();

    return () => {
      setPrototype(undefined);
      setTransactionsData(undefined);
    };

    // eslint-disable-next-line
  }, [project]);

  const addDesignForm = useFormik({
    initialValues: {
      fileName: '',
      fileSource: '',
    },
    onSubmit: ({ fileName, fileSource }) => {
      addProjectDesign({
        variables: {
          design: {
            id: project?.id!,
            name: fileName,
            src: fileSource,
          },
        },
      });
    },
  });

  const addMvpForm = useFormik({
    initialValues: {
      fileName: '',
      fileSource: '',
    },
    onSubmit: ({ fileName, fileSource }) => {
      addProjectMvp({
        variables: {
          mvp: {
            id: project?.id!,
            name: fileName,
            src: fileSource,
          },
        },
      });
    },
  });

  const addFullBuildForm = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: Yup.object().shape({
      url: Yup.string().required('URL is required'),
    }),
    onSubmit: ({ url }) => {
      addProjectFullBuild({
        variables: {
          fullBuild: {
            id: project?.id!,
            url,
          },
        },
      });
    },
  });

  return role !== 'admin' ? (
    <>
      {!projectsLoading &&
      !clientProjectsLoading &&
      !projectLoading &&
      !prototypeLoading ? (
        <>
          {designModal && (
            <Modal
              color={role || 'client'}
              title='Upload Design'
              description='Upload design file'
              onClose={() => setDesignModal(false)}
              onConfirm={addDesignForm.handleSubmit}
            >
              <Input
                type='file'
                label='File'
                file
                color={role || 'client'}
                onChange={async (
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const formData = new FormData();

                  if (event.target.files && event.target.files[0]) {
                    formData.append('file', event.target.files[0]);
                    formData.append('upload_preset', 'xofll5kc');

                    addDesignForm.setFieldValue('fileName', '');
                    addDesignForm.setFieldValue('fileSource', '');

                    const data = await (
                      await fetch(`${import.meta.env.VITE_CLOUDINARY_URL}`, {
                        method: 'POST',
                        body: formData,
                      })
                    ).json();

                    const filename = data.original_filename;
                    const filesource = data.secure_url;

                    addDesignForm.setFieldValue('fileName', filename);
                    addDesignForm.setFieldValue('fileSource', filesource);
                  }
                }}
                error={
                  addDesignForm.touched.fileName &&
                  (!!addDesignForm.errors.fileName ||
                    !!addDesignForm.errors.fileSource)
                }
                errorMessage={addDesignForm.errors.fileName}
              />
            </Modal>
          )}
          {mvpModal && (
            <Modal
              color={role || 'client'}
              title='Upload MVP'
              description='Upload mvp file'
              onClose={() => setMvpModal(false)}
              onConfirm={addMvpForm.handleSubmit}
            >
              <Input
                type='file'
                label='File'
                file
                color={role || 'client'}
                onChange={async (
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const formData = new FormData();

                  if (event.target.files && event.target.files[0]) {
                    formData.append('file', event.target.files[0]);
                    formData.append('upload_preset', 'xofll5kc');

                    addMvpForm.setFieldValue('fileName', '');
                    addMvpForm.setFieldValue('fileSource', '');

                    const data = await (
                      await fetch(`${import.meta.env.VITE_CLOUDINARY_URL}`, {
                        method: 'POST',
                        body: formData,
                      })
                    ).json();

                    const filename = data.original_filename;
                    const filesource = data.secure_url;

                    addMvpForm.setFieldValue('fileName', filename);
                    addMvpForm.setFieldValue('fileSource', filesource);
                  }
                }}
                error={
                  addMvpForm.touched.fileName &&
                  (!!addMvpForm.errors.fileName ||
                    !!addMvpForm.errors.fileSource)
                }
                errorMessage={addMvpForm.errors.fileName}
              />
            </Modal>
          )}
          {fullBuildModal && (
            <Modal
              color={role || 'client'}
              title='Add full build'
              description='Add full build url'
              onClose={() => setMvpModal(false)}
              onConfirm={addFullBuildForm.handleSubmit}
            >
              <Input
                name='url'
                label='URL'
                color={role || 'client'}
                value={addFullBuildForm.values.url}
                onChange={addFullBuildForm.handleChange}
                onBlur={addFullBuildForm.handleBlur}
                error={
                  addFullBuildForm.touched.url && !!addFullBuildForm.errors.url
                }
                errorMessage={addFullBuildForm.errors.url}
              />
            </Modal>
          )}
          {project ? (
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
                      {project.name}
                    </Text>
                  </Box>
                  {error && (
                    <Box margin='0px 20px'>
                      <Alert color='error' text={error} />
                    </Box>
                  )}
                  {project.state === 'Approved' ? (
                    <>
                      <Box marginRight={role === 'client' ? '20px' : undefined}>
                        <Button
                          color={role || 'client'}
                          variant='primary-action'
                          text='Prototype'
                          iconLeft={<Design />}
                          disabled={!prototype}
                          onClick={() =>
                            navigate(`/prototype/${project.template.id}`)
                          }
                        />
                      </Box>
                      {role === 'client' && (
                        <Box marginRight='20px'>
                          <Button
                            color={role || 'client'}
                            variant='primary-action'
                            text='Payments'
                            iconLeft={<Payment />}
                            disabled={transactionsData?.status}
                            onClick={() => navigate(`/payments/${project.id}`)}
                          />
                        </Box>
                      )}
                      {role === 'client' && (
                        <Box>
                          <Button
                            color={role || 'client'}
                            variant='primary-action'
                            text='Settings'
                            iconLeft={<Settings />}
                            onClick={() => navigate(`/project-settings/${id}`)}
                          />
                        </Box>
                      )}
                    </>
                  ) : (
                    <>
                      {project.state === 'OnReview' &&
                      role === 'productOwner' ? (
                        <>
                          <Box marginRight='20px'>
                            <Button
                              color={role || 'client'}
                              variant='primary-action'
                              text='Approve'
                              onClick={() =>
                                changeProjectState({
                                  variables: {
                                    id: project.id,
                                    state: 'Approved',
                                  },
                                })
                              }
                            />
                          </Box>
                          <Box>
                            <Button
                              color={role || 'client'}
                              variant='outlined'
                              text='Decline'
                              onClick={() =>
                                changeProjectState({
                                  variables: {
                                    id: project.id,
                                    state: 'Declined',
                                  },
                                })
                              }
                            />
                          </Box>
                        </>
                      ) : (
                        <>
                          {project.state === 'OnReview' && (
                            <Chip
                              text={project.state}
                              color='warning'
                              variant='filled'
                            />
                          )}
                          {project.state === 'Declined' && (
                            <Chip
                              text={project.state}
                              color='error'
                              variant='filled'
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </Box>
                {project.template.features && (
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
                      {project.template.features.map((feature) => (
                        <FeatureCard feature={feature} key={feature.id} />
                      ))}
                    </Box>
                  </Box>
                )}
                {project.delivrable && (
                  <Box
                    display='flex'
                    flexDirection='column'
                    marginBottom='30px'
                    className='deliverables'
                  >
                    <Box marginBottom='10px'>
                      <Text variant='headline' gutterBottom>
                        Deliverables
                      </Text>
                    </Box>
                    <Box
                      display='flex'
                      flexDirection='column'
                      justifyContent='space-between'
                      padding='35px 20px'
                      boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                      borderRadius='10px'
                    >
                      <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='space-between'
                        marginBottom='10px'
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

                        {project.state === 'Approved' ? (
                          <Link href='#' color={role} onClick={handlePrint}>
                            Print
                          </Link>
                        ) : (
                          <>
                            {project.state === 'OnReview' && (
                              <Text variant='body' color='warning'>
                                {project.state}
                              </Text>
                            )}
                            {project.state === 'Declined' && (
                              <Text variant='body' color='error'>
                                {project.state}
                              </Text>
                            )}
                          </>
                        )}
                      </Box>
                      <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='space-between'
                        marginBottom='10px'
                      >
                        <Box
                          display='flex'
                          flexDirection='row'
                          alignItems='center'
                        >
                          <Box marginRight='10px'>
                            <Design />
                          </Box>
                          <Text variant='title'>Design</Text>
                        </Box>
                        {project.delivrable.design.src ? (
                          <Link
                            url
                            href={
                              /http/.test(project.delivrable.design.src)
                                ? project.delivrable.design.src
                                : `http://${project.delivrable.design.src}`
                            }
                            target='_blank'
                            color={role}
                          >
                            Download
                          </Link>
                        ) : role !== 'productOwner' ? (
                          <>
                            {project.state === 'OnReview' && (
                              <Text variant='body' color='warning'>
                                {project.state}
                              </Text>
                            )}
                            {project.state === 'Declined' && (
                              <Text variant='body' color='error'>
                                {project.state}
                              </Text>
                            )}
                            {project.state === 'Approved' && (
                              <Text variant='body' color={role || 'client'}>
                                In Progress
                              </Text>
                            )}
                          </>
                        ) : (
                          <>
                            {project.state === 'Approved' ? (
                              <Box
                                cursor='pointer'
                                onClick={() => setDesignModal(true)}
                              >
                                <Text variant='body' color={role || 'client'}>
                                  Upload
                                </Text>
                              </Box>
                            ) : (
                              <>
                                {project.state === 'OnReview' && (
                                  <Text variant='body' color='warning'>
                                    {project.state}
                                  </Text>
                                )}
                                {project.state === 'Declined' && (
                                  <Text variant='body' color='error'>
                                    {project.state}
                                  </Text>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </Box>
                      <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='space-between'
                        marginBottom='10px'
                      >
                        <Box
                          display='flex'
                          flexDirection='row'
                          alignItems='center'
                        >
                          <Box marginRight='10px'>
                            <MVP />
                          </Box>
                          <Text variant='title'>MVP</Text>
                        </Box>
                        {project.delivrable.mvp.src ? (
                          <Link
                            url
                            href={
                              /http/.test(project.delivrable.mvp.src)
                                ? project.delivrable.mvp.src
                                : `http://${project.delivrable.mvp.src}`
                            }
                            target='_blank'
                            color={role}
                          >
                            Download
                          </Link>
                        ) : role !== 'productOwner' ? (
                          <>
                            {project.state === 'OnReview' && (
                              <Text variant='body' color='warning'>
                                {project.state}
                              </Text>
                            )}
                            {project.state === 'Declined' && (
                              <Text variant='body' color='error'>
                                {project.state}
                              </Text>
                            )}
                            {project.state === 'Approved' && (
                              <Text variant='body' color={role || 'client'}>
                                In Progress
                              </Text>
                            )}
                          </>
                        ) : (
                          <>
                            {project.state === 'Approved' ? (
                              <Box
                                cursor='pointer'
                                onClick={() => setDesignModal(true)}
                              >
                                <Text variant='body' color={role || 'client'}>
                                  Upload
                                </Text>
                              </Box>
                            ) : (
                              <>
                                {project.state === 'OnReview' && (
                                  <Text variant='body' color='warning'>
                                    {project.state}
                                  </Text>
                                )}
                                {project.state === 'Declined' && (
                                  <Text variant='body' color='error'>
                                    {project.state}
                                  </Text>
                                )}
                                {project.state === 'Approved' && (
                                  <Text variant='body' color={role || 'client'}>
                                    In Progress
                                  </Text>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </Box>
                      <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='space-between'
                        marginBottom='10px'
                      >
                        <Box
                          display='flex'
                          flexDirection='row'
                          alignItems='center'
                        >
                          <Box marginRight='10px'>
                            <FullBuild />
                          </Box>
                          <Text variant='title'>Full Build</Text>
                        </Box>
                        {project.delivrable.fullBuild !== '' ? (
                          <Link
                            url
                            href={
                              /http/.test(project?.delivrable?.fullBuild)
                                ? project?.delivrable?.fullBuild
                                : `http://${project?.delivrable?.fullBuild}`
                            }
                            target='_blank'
                            color={role}
                          >
                            Get
                          </Link>
                        ) : role !== 'productOwner' ? (
                          <>
                            {project.state === 'OnReview' && (
                              <Text variant='body' color='warning'>
                                {project.state}
                              </Text>
                            )}
                            {project.state === 'Declined' && (
                              <Text variant='body' color='error'>
                                {project.state}
                              </Text>
                            )}
                            {project.state === 'Approved' && (
                              <Text variant='body' color={role || 'client'}>
                                In Progress
                              </Text>
                            )}
                          </>
                        ) : (
                          <>
                            {project.state === 'Approved' ? (
                              <Box
                                cursor='pointer'
                                onClick={() => setDesignModal(true)}
                              >
                                <Text variant='body' color={role || 'client'}>
                                  Add
                                </Text>
                              </Box>
                            ) : (
                              <>
                                {project.state === 'OnReview' && (
                                  <Text variant='body' color='warning'>
                                    {project.state}
                                  </Text>
                                )}
                                {project.state === 'Declined' && (
                                  <Text variant='body' color='error'>
                                    {project.state}
                                  </Text>
                                )}
                                {project.state === 'Approved' && (
                                  <Text variant='body' color={role || 'client'}>
                                    In Progress
                                  </Text>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}
                {project.template.specification &&
                  project.template.features && (
                    <Box display='none'>
                      <SpecificationPrint
                        ref={printRef}
                        specification={project.template.specification}
                        features={project.template.features}
                      />
                    </Box>
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
    <Navigate to='/clients' />
  );
};

export default Project;
