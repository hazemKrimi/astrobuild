import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { roleVar, userVar } from '../../graphql/state';
import {
  Box,
  ContextMenu,
  IconButton,
  MessagingSidebar,
  SidebarItem,
} from '..';
import { Add, Messaging } from '../../assets';
import { Wrapper } from './styles';
import {
  CategoryOutput,
  FeatureOutput,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllFeaturesQuery,
  GetAllFeaturesQueryVariables,
  GetAllProjectsByClientIdQuery,
  GetAllProjectsByClientIdQueryVariables,
  GetAllProjectsQuery,
  GetAllProjectsQueryVariables,
  GetAllTemplatesQuery,
  GetAllTemplatesQueryVariables,
  ProjectOutput,
  TemplateOutput,
} from '../../graphql/types';
import { GET_ALL_CATEGORIES } from '../../graphql/category.api';
import {
  GET_ALL_PROJECTS,
  GET_ALL_PROJECTS_BY_CLIENT_ID,
} from '../../graphql/project.api';
import { GET_ALL_TEMPLATES } from '../../graphql/template.api';
import { GET_ALL_FEATURES } from '../../graphql/feature.api';

const Sidebar = () => {
  const role = useReactiveVar(roleVar);
  const currentUser = useReactiveVar(userVar);
  const location = useLocation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Array<ProjectOutput>>();
  const [templates, setTemplates] = useState<Array<TemplateOutput>>();
  const [features, setFeatures] = useState<Array<FeatureOutput>>();
  const [categories, setCategories] = useState<Array<CategoryOutput>>();
  const [messagingSidebarOpen, setMessagingSidebarOpen] =
    useState<boolean>(false);

  const [getProjectsByClientId] = useLazyQuery<
    GetAllProjectsByClientIdQuery,
    GetAllProjectsByClientIdQueryVariables
  >(GET_ALL_PROJECTS_BY_CLIENT_ID, {
    variables: {
      id: currentUser?.id!,
    },
    onCompleted({ getAllProjectsByClientId }) {
      setProjects(getAllProjectsByClientId);
    }
  });

  const [getProjects] = useLazyQuery<
    GetAllProjectsQuery,
    GetAllProjectsQueryVariables
  >(GET_ALL_PROJECTS, {
    onCompleted({ getAllProjects }) {
      setProjects(getAllProjects);
    }
  });

  const [getTemplates] = useLazyQuery<
    GetAllTemplatesQuery,
    GetAllTemplatesQueryVariables
  >(GET_ALL_TEMPLATES, {
    onCompleted({ getAllTemplates }) {
      setTemplates(getAllTemplates);
    },
  });

  const [getFeatures] = useLazyQuery<
    GetAllFeaturesQuery,
    GetAllFeaturesQueryVariables
  >(GET_ALL_FEATURES, {
    onCompleted({ getAllFeatures }) {
      setFeatures(getAllFeatures);
    },
  });

  const [getCategories] = useLazyQuery<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GET_ALL_CATEGORIES, {
    onCompleted({ getAllCategories }) {
      setCategories(getAllCategories);
    },
  });

  useEffect(() => {
    if (/project/i.test(location.pathname)) {
      if (role !== 'client') getProjects();
      else getProjectsByClientId({ variables: { id: currentUser?.id! } });
    }

    if (/template/i.test(location.pathname)) {
      getTemplates();
    }

    if (/feature/i.test(location.pathname)) {
      getFeatures();
    }
    if (/category/i.test(location.pathname)) {
      getCategories();
    }

    return () => {
      setProjects([]);
      setTemplates([]);
      setFeatures([]);
      setCategories([]);
    };
  }, [location.pathname]);

  return (
    <Wrapper color={role}>
      {role !== 'admin' && (
        <>
          <Box display='flex' flexDirection='column'>
            {projects &&
            new RegExp(/project/, 'i').test(location.pathname) &&
              projects.map((project, index) => (
                <Box marginBottom='20px' key={project.id}>
                  <div id={`project-${project.id}`}>
                    <SidebarItem
                      color={role}
                      selected={
                        new RegExp(project.id, 'i').test(location.pathname) ||
                        (index === 0 && location.pathname === '/project')}
                      text={project.name[0]}
                      onClick={() => navigate(`/project/${project.id}`)}
                    />
                  </div>
                  <ContextMenu
                    component={`project-${project.id}`}
                    items={[{ label: project.name }]}
                  />
                </Box>
              ))}
            {templates &&
            new RegExp(/template/, 'i').test(location.pathname) &&
              templates.map((template, index) => (
                <Box marginBottom='20px' key={template.id}>
                  <div id={`template-${template.id}`}>
                    <SidebarItem
                      color={role}
                      selected={
                        new RegExp(template.id, 'i').test(location.pathname) ||
                        (index === 0 && location.pathname === '/template')
                      }
                      text={template.name[0]}
                      onClick={() => navigate(`/template/${template.id}`)}
                    />
                  </div>
                  <ContextMenu
                    component={`template-${template.id}`}
                    items={[{ label: template.name }]}
                  />
                </Box>
              ))}
            {features &&
            new RegExp(/feature/, 'i').test(location.pathname) &&
              features.map((feature, index) => (
                <Box marginBottom='20px' key={feature.id}>
                  <div id={`feature-${feature.id}`}>
                    <SidebarItem
                      color={role}
                      selected={
                        new RegExp(feature.id, 'i').test(location.pathname) ||
                        (index === 0 && location.pathname === '/feature')
                      }
                      text={feature.name[0]}
                      onClick={() => navigate(`/feature/${feature.id}`)}
                    />
                  </div>
                  <ContextMenu
                    component={`feature-${feature.id}`}
                    items={[{ label: feature.name }]}
                  />
                </Box>
              ))}
            {categories &&
            new RegExp(/category/, 'i').test(location.pathname) &&
              categories.map((category, index) => (
                <Box marginBottom='20px' key={category.id}>
                  <div id={`category-${category.id}`}>
                    <SidebarItem
                      color={role}
                      selected={
                        new RegExp(category.id, 'i').test(location.pathname) ||
                        (index === 0 && location.pathname === '/category')
                      }
                      text={category.name[0]}
                      onClick={() => navigate(`/category/${category.id}`)}
                    />
                  </div>
                  <ContextMenu
                    component={`category-${category.id}`}
                    items={[{ label: category.name }]}
                  />
                </Box>
              ))}
          </Box>
          <Box display='flex' flexDirection='column'>
            <Box marginBottom='20px'>
              <IconButton
                icon={<Add />}
                color={role}
                onClick={() => {
                  if (/project/i.test(location.pathname)) {
                    navigate('/add-project');
                  }
                  if (/template/i.test(location.pathname)) {
                    navigate('/add-template');
                  }
                  if (/feature/i.test(location.pathname)) {
                    navigate('/add-feature');
                  }
                  if (/category/i.test(location.pathname)) {
                    navigate('/add-category');
                  }
                }}
              />
            </Box>
            {/\/project/i.test(location.pathname) && (
              <Box>
                <IconButton
                  icon={<Messaging />}
                  color={role}
                  onClick={() => setMessagingSidebarOpen(!messagingSidebarOpen)}
                />
              </Box>
            )}
          </Box>
        </>
      )}
      {messagingSidebarOpen && (
        <MessagingSidebar onClose={() => setMessagingSidebarOpen(false)} />
      )}
    </Wrapper>
  );
};

export default Sidebar;
