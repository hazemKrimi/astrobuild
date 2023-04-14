import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  ControlButton,
  Connection,
  Edge,
  Node,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import { Navigate } from 'react-router';
import { roleVar } from '../../graphql/state';
import { Empty, ArrowLeft, Edit, CheckCircle } from '../../assets';
import {
  Box,
  Text,
  Button,
  Spinner,
  FrontendFeatureCard,
  BackendFeatureCard,
  Alert,
} from '../../components';
import { Wrapper } from './styles';
import {
  AddPrototypeMutation,
  AddPrototypeMutationVariables,
  FeatureOutput,
  GetPrototypeByIdQuery,
  GetPrototypeByIdQueryVariables,
  GetTemplateByIdQuery,
  GetTemplateByIdQueryVariables,
  ProtoTypeOutput,
  TemplateOutput,
  UpdatePrototypeMutation,
  UpdatePrototypeMutationVariables,
} from '../../graphql/types';
import { GET_TEMPLATE_BY_ID } from '../../graphql/template.api';
import {
  ADD_PROTOTYPE,
  GET_PROTOTYPE_BY_ID,
  UPDATE_PROTOTYPE,
} from '../../graphql/prototype.api';

const Prototype = () => {
  const role = useReactiveVar(roleVar);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const nodeTypes = useMemo(() => ({ featureCard: FrontendFeatureCard }), []);
  const [template, setTemplate] = useState<TemplateOutput>();
  const [prototype, setPrototype] = useState<Array<ProtoTypeOutput>>();
  const [nodes, setNodes, onNodesChange] = useNodesState<FeatureOutput>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const diagramParentRef = useRef<HTMLDivElement>(null);

  const [getTemplate, { loading: templateLoading }] = useLazyQuery<
    GetTemplateByIdQuery,
    GetTemplateByIdQueryVariables
  >(GET_TEMPLATE_BY_ID, {
    onCompleted({ getTemplateById }) {
      setTemplate(getTemplateById);
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

  const [addPrototype] = useMutation<
    AddPrototypeMutation,
    AddPrototypeMutationVariables
  >(ADD_PROTOTYPE, {
    onCompleted({ addPrototype: addPrototypeResult }) {
      setPrototype(addPrototypeResult.prototype);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info as string);
      setTimeout(() => setError(''), 3000);
    },
  });

  const [updatePrototype] = useMutation<
    UpdatePrototypeMutation,
    UpdatePrototypeMutationVariables
  >(UPDATE_PROTOTYPE, {
    onCompleted({ updatePrototype: updatePrototypeResult }) {
      setPrototype(updatePrototypeResult.prototype);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
  });

  useEffect(() => {
    if (id) {
      getTemplate({ variables: { id } });
      getPrototype({ variables: { id } });
    }
  }, [id]);

  useEffect(() => {
    if (template && template.features) {
      const initialNodes = template?.features?.map((feature, index) => ({
        id: feature.id,
        type: 'featureCard',
        data: feature,
        position: { x: index * 100, y: index * 200 },
        style: {
          width: 'auto',
        },
        connectable: role === 'developer' && editing
      }));

      if (initialNodes) setNodes(initialNodes);
    }

    if (prototype) {
      const initialEdges: Array<Edge> = [];

      prototype.forEach((link) => {
        link.connections.forEach((connection) => {
          initialEdges.push({
            id: `edge-${link.feature.id}`,
            source: link.feature.id,
            target: connection.to,
            markerEnd: MarkerType.Arrow,
            className: 'normal-edge'
          });
        });
      });

      if (initialEdges) setEdges(initialEdges);
    }
  }, [template, prototype, editing]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const handleEditPrototype = () => {
    if (editing) {
      const prototypeInput = edges
        .map((edge) => ({
          featureId: edge.source,
          connections: [
            {
              to: edge.target,
              releations: { back: false, forword: true },
            },
          ],
        }));
      if (prototypeInput && prototypeInput.length > 0) {
        if (prototype) {
          updatePrototype({
            variables: {
              prototype: {
                templateId: id as string,
                prototype: prototypeInput,
              },
            },
          });
        } else {
          addPrototype({
            variables: {
              prototype: {
                templateId: id as string,
                prototype: prototypeInput,
              },
            },
          });
        }
      }

      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  return role === 'productOwner' ||
    role === 'developer' ||
    role === 'client' ? (
    <>
      {!templateLoading && !prototypeLoading ? (
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
                  <Box marginRight='50px'>
                    <Button
                      text='Back'
                      color={role || 'client'}
                      size='small'
                      onClick={() => navigate(-1)}
                      iconLeft={<ArrowLeft />}
                    />
                    <Text variant='headline' weight='bold'>
                      Prototype
                    </Text>
                  </Box>
                  {success && (
                    <Alert
                      color='success'
                      text='Prototype updated successfully'
                    />
                  )}
                  {error && <Alert color='error' text={error} />}
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
                        background='#F9FAFA'
                        boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                        borderRadius='10px'
                        width='100%'
                        height='400px'
                        ref={diagramParentRef}
                      >
                        <Box
                          width={
                            diagramParentRef.current
                              ? `${
                                  getComputedStyle(diagramParentRef.current)
                                    ?.width
                                }}px`
                              : '100%'
                          }
                          height='auto'
                        >
                          <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            nodeTypes={nodeTypes}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                          >
                            {role === 'developer' && (
                              <>
                                <MiniMap />
                                <Controls
                                  showInteractive={false}
                                  showFitView
                                >
                                  <ControlButton onClick={handleEditPrototype}>
                                    {!editing ? <Edit /> : <CheckCircle />}
                                  </ControlButton>
                                </Controls>
                              </>
                            )}
                          </ReactFlow>
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
    <>{role === 'admin' && <Navigate to='/clients' />}</>
  );
};

export default Prototype;
