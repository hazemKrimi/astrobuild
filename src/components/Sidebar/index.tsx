import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { roleVar } from '../../graphql/state';
import { Box, ContextMenu, IconButton, SidebarItem } from '..';
import { Add } from '../../assets';
import { Wrapper } from './styles';
import {
  CategoryOutput,
  FeatureOutput,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllFeaturesQuery,
  GetAllFeaturesQueryVariables,
  GetAllProjectsQuery,
  GetAllProjectsQueryVariables,
  GetAllTemplatesQuery,
  GetAllTemplatesQueryVariables,
  ProjectOutput,
  TemplateOutput,
} from '../../graphql/types';
import { GET_ALL_CATEGORIES } from '../../graphql/category.api';
import { GET_ALL_PROJECTS } from '../../graphql/project.api';
import { GET_ALL_TEMPLATES } from '../../graphql/template.api';
import { GET_ALL_FEATURES } from '../../graphql/feature.api';

const Sidebar = () => {
  const role = useReactiveVar(roleVar);
  const location = useLocation();
  const history = useHistory();
  const [projects, setProjects] = useState<Array<ProjectOutput>>();
  const [templates, setTemplates] = useState<Array<TemplateOutput>>();
  const [features, setFeatures] = useState<Array<FeatureOutput>>();
  const [categories, setCategories] = useState<Array<CategoryOutput>>();

  const [getProjects] = useLazyQuery<
    GetAllProjectsQuery,
    GetAllProjectsQueryVariables
  >(GET_ALL_PROJECTS, {
    onCompleted({ getAllProjects }) {
      setProjects(getAllProjects);
    },
    fetchPolicy: 'network-only',
  });

  const [getTemplates] = useLazyQuery<
    GetAllTemplatesQuery,
    GetAllTemplatesQueryVariables
  >(GET_ALL_TEMPLATES, {
    onCompleted({ getAllTemplates }) {
      setTemplates(getAllTemplates);
    },
    fetchPolicy: 'network-only',
  });

  const [getFeatures] = useLazyQuery<
    GetAllFeaturesQuery,
    GetAllFeaturesQueryVariables
  >(GET_ALL_FEATURES, {
    onCompleted({ getAllFeatures }) {
      setFeatures(getAllFeatures);
    },
    fetchPolicy: 'network-only',
  });

  const [getCategories] = useLazyQuery<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GET_ALL_CATEGORIES, {
    onCompleted({ getAllCategories }) {
      setCategories(getAllCategories);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (/project/i.test(location.pathname)) {
      getProjects();
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

    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <Wrapper color={role}>
      {role !== 'admin' && (
        <>
          <Box display='flex' flexDirection='column'>
            {projects &&
              projects.map((project) => (
                <Box marginBottom='20px' key={project.id}>
                  <div id={`project-${project.id}`}>
                    <SidebarItem
                      color={role}
                      selected={new RegExp(project.id, 'i').test(
                        location.pathname
                      )}
                      text={project.name[0]}
                      onClick={() => history.push(`/project/${project.id}`)}
                    />
                  </div>
                  <ContextMenu
                    component={`project-${project.id}`}
                    items={[{ action: () => {}, label: project.name }]}
                  />
                </Box>
              ))}
            {templates &&
              templates.map((template) => (
                <Box marginBottom='20px' key={template.id}>
                  <div id={`template-${template.id}`}>
                    <SidebarItem
                      color={role}
                      selected={new RegExp(template.id, 'i').test(
                        location.pathname
                      )}
                      text={template.name[0]}
                      onClick={() => history.push(`/template/${template.id}`)}
                    />
                  </div>
                  <ContextMenu
                    component={`template-${template.id}`}
                    items={[{ action: () => {}, label: template.name }]}
                  />
                </Box>
              ))}
            {features &&
              features.map((feature) => (
                <Box marginBottom='20px' key={feature.id}>
                  <div id={`feature-${feature.id}`}>
                    <SidebarItem
                      color={role}
                      selected={new RegExp(feature.id, 'i').test(
                        location.pathname
                      )}
                      text={feature.name[0]}
                      onClick={() => history.push(`/feature/${feature.id}`)}
                    />
                  </div>
                  <ContextMenu
                    component={`feature-${feature.id}`}
                    items={[{ action: () => {}, label: feature.name }]}
                  />
                </Box>
              ))}
            {categories &&
              categories.map((category) => (
                <Box marginBottom='20px' key={category.id}>
                  <div id={`category-${category.id}`}>
                    <SidebarItem
                      color={role}
                      selected={new RegExp(category.id, 'i').test(
                        location.pathname
                      )}
                      text={category.name[0]}
                      onClick={() => history.push(`/category/${category.id}`)}
                    />
                  </div>
                  <ContextMenu
                    component={`category-${category.id}`}
                    items={[{ action: () => {}, label: category.name }]}
                  />
                </Box>
              ))}
          </Box>
          <Box>
            <IconButton
              icon={<Add />}
              color={role}
              onClick={() => {
                if (/project/i.test(location.pathname)) {
                  history.push('/add-project');
                }
                if (/template/i.test(location.pathname)) {
                  history.push('/add-template');
                }
                if (/feature/i.test(location.pathname)) {
                  history.push('/add-feature');
                }
                if (/category/i.test(location.pathname)) {
                  history.push('/add-category');
                }
              }}
            />
          </Box>
        </>
      )}
    </Wrapper>
  );
};

export default Sidebar;
