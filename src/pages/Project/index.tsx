import { useReactToPrint } from 'react-to-print';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router';
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
  GetAllProjectsQuery,
  GetAllProjectsQueryVariables,
  GetProjectByIdQuery,
  GetProjectByIdQueryVariables,
  GetPrototypeByIdQuery,
  GetPrototypeByIdQueryVariables,
  ProjectOutput,
  ProtoTypeOutput,
} from '../../graphql/types';
import { GET_ALL_PROJECTS, GET_PROJECT_BY_ID } from '../../graphql/project.api';
import { GET_PROTOTYPE_BY_ID } from '../../graphql/prototype.api';

const Project = () => {
  const role = useReactiveVar(roleVar);
  const history = useHistory();
  const printRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectOutput>();
  const [prototype, setPrototype] = useState<Array<ProtoTypeOutput>>();

  const [getProjects, { loading: projectsLoading }] = useLazyQuery<
    GetAllProjectsQuery,
    GetAllProjectsQueryVariables
  >(GET_ALL_PROJECTS, {
    onCompleted({ getAllProjects }) {
      setProject(getAllProjects[0]);
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

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    if (id) {
      getProject({ variables: { id } });
    } else {
      getProjects();
    }

    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (project) getPrototype({ variables: { id: project?.template?.id } });

    // eslint-disable-next-line
  }, [project]);

  return role !== 'admin' ? (
    <>
      {!projectLoading && !projectLoading && !prototypeLoading ? (
        <>
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
                  {project.state === 'Approved' ? (
                    <>
                      <Box marginRight='20px'>
                        <Button
                          color={role || 'client'}
                          variant='primary-action'
                          text='Prototype'
                          iconLeft={<Design />}
                          disabled={!prototype && role === 'productOwner'}
                          onClick={() =>
                            history.push(
                              `/prototype/${id || project.template.id}`
                            )
                          }
                        />
                      </Box>
                      <Box>
                        <Button
                          color={role || 'client'}
                          variant='primary-action'
                          text='Settings'
                          iconLeft={<Settings />}
                          onClick={() =>
                            history.push(
                              `/project-settings/${id || project.template.id}`
                            )
                          }
                        />
                      </Box>
                    </>
                  ) : (
                    <Chip
                      text={project.state}
                      color={role || 'client'}
                      variant='filled'
                    />
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
                      {project.delivrable.specification && (
                        <>
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
                        </>
                      )}
                    </Box>
                  </Box>
                )}
                {project.template.specification && project.template.features && (
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
    <Redirect to='/clients' />
  );
};

export default Project;
