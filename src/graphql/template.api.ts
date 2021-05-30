import gql from 'graphql-tag';

export const GET_ALL_TEMPLATES = gql`
  query GetAllTemplates {
    getAllTemplates {
      id
      name
      description
      category
      features {
        id
        name
        description
        featureType
        image {
          name
          src
        }
        wireframes {
          id
          name
          src
        }
        price
        repo
      }
      image {
        name
        src
      }
      specification {
        introduction {
          purpose
          documentConventions
          intendedAudience
          projectScope
        }
        overallDescription {
          perspective
          userCharacteristics
          operatingEnvironment
          designImplementationConstraints
          userDocumentation
          assemptionsDependencies
        }
        nonFunctionalRequirements {
          performanceRequirements
          safetyRequirements
          securityRequirements
          softwareQualityAttributes
        }
        otherRequirements
        glossary
        analysisModels
        issuesList
      }
    }
  }
`;

export const GET_TEMPLATE_BY_ID = gql`
  query GetTemplateById($id: String!) {
    getTemplateById(id: $id) {
      id
      name
      description
      category
      features {
        id
        name
        description
        featureType
        image {
          name
          src
        }
        wireframes {
          id
          name
          src
        }
        price
        repo
      }
      image {
        name
        src
      }
      specification {
        introduction {
          purpose
          documentConventions
          intendedAudience
          projectScope
        }
        overallDescription {
          perspective
          userCharacteristics
          operatingEnvironment
          designImplementationConstraints
          userDocumentation
          assemptionsDependencies
        }
        nonFunctionalRequirements {
          performanceRequirements
          safetyRequirements
          securityRequirements
          softwareQualityAttributes
        }
        otherRequirements
        glossary
        analysisModels
        issuesList
      }
    }
  }
`;

export const GET_ALL_TEMPLATES_BY_CATEGORIES_ID = gql`
  query GetAllTemplatesByCategoriesId($categories: [String!]!) {
    getAllTemplatesByCategoriesId(categories: $categories) {
      id
      name
      description
      category
      features {
        id
        name
        description
        featureType
        image {
          name
          src
        }
        wireframes {
          id
          name
          src
        }
        price
        repo
      }
      image {
        name
        src
      }
      specification {
        introduction {
          purpose
          documentConventions
          intendedAudience
          projectScope
        }
        overallDescription {
          perspective
          userCharacteristics
          operatingEnvironment
          designImplementationConstraints
          userDocumentation
          assemptionsDependencies
        }
        nonFunctionalRequirements {
          performanceRequirements
          safetyRequirements
          securityRequirements
          softwareQualityAttributes
        }
        otherRequirements
        glossary
        analysisModels
        issuesList
      }
    }
  }
`;

export const ADD_TEMPLATE = gql`
  mutation AddTemplate($template: TemplateInput!) {
    addTemplate(template: $template) {
      id
      name
      description
      category
      features {
        id
        name
        description
        featureType
        image {
          name
          src
        }
        wireframes {
          id
          name
          src
        }
        price
        repo
      }
      image {
        name
        src
      }
      specification {
        introduction {
          purpose
          documentConventions
          intendedAudience
          projectScope
        }
        overallDescription {
          perspective
          userCharacteristics
          operatingEnvironment
          designImplementationConstraints
          userDocumentation
          assemptionsDependencies
        }
        nonFunctionalRequirements {
          performanceRequirements
          safetyRequirements
          securityRequirements
          softwareQualityAttributes
        }
        otherRequirements
        glossary
        analysisModels
        issuesList
      }
    }
  }
`;

export const UPDATE_TEMPLATE = gql`
  mutation UpdateTemplate(
    $id: String!
    $template: TemplateUpdateInput!
    $specification: SpecificationInput
  ) {
    updateTemplate(
      id: $id
      template: $template
      specification: $specification
    ) {
      id
      name
      description
      category
      features {
        id
        name
        description
        featureType
        image {
          name
          src
        }
        wireframes {
          id
          name
          src
        }
        price
        repo
      }
      image {
        name
        src
      }
      specification {
        introduction {
          purpose
          documentConventions
          intendedAudience
          projectScope
        }
        overallDescription {
          perspective
          userCharacteristics
          operatingEnvironment
          designImplementationConstraints
          userDocumentation
          assemptionsDependencies
        }
        nonFunctionalRequirements {
          performanceRequirements
          safetyRequirements
          securityRequirements
          softwareQualityAttributes
        }
        otherRequirements
        glossary
        analysisModels
        issuesList
      }
    }
  }
`;

export const UPDATE_TEMPLATE_FEATURES = gql`
  mutation UpdateTemplateFeatures($id: String!, $featuresId: [String!]!) {
    updateTemplateFeatures(id: $id, featuresId: $featuresId) {
      id
      name
      description
      category
      features {
        id
        name
        description
        featureType
        image {
          name
          src
        }
        wireframes {
          id
          name
          src
        }
        price
        repo
      }
      image {
        name
        src
      }
      specification {
        introduction {
          purpose
          documentConventions
          intendedAudience
          projectScope
        }
        overallDescription {
          perspective
          userCharacteristics
          operatingEnvironment
          designImplementationConstraints
          userDocumentation
          assemptionsDependencies
        }
        nonFunctionalRequirements {
          performanceRequirements
          safetyRequirements
          securityRequirements
          softwareQualityAttributes
        }
        otherRequirements
        glossary
        analysisModels
        issuesList
      }
    }
  }
`;

export const ADD_TEMPLATE_SPECIFICATION = gql`
  mutation AddTemplateSpecification(
    $id: String!
    $specification: SpecificationInput!
  ) {
    addTemplateSpecification(id: $id, specification: $specification) {
      id
      name
      description
      category
      features {
        id
        name
        description
        featureType
        image {
          name
          src
        }
        wireframes {
          id
          name
          src
        }
        price
        repo
      }
      image {
        name
        src
      }
      specification {
        introduction {
          purpose
          documentConventions
          intendedAudience
          projectScope
        }
        overallDescription {
          perspective
          userCharacteristics
          operatingEnvironment
          designImplementationConstraints
          userDocumentation
          assemptionsDependencies
        }
        nonFunctionalRequirements {
          performanceRequirements
          safetyRequirements
          securityRequirements
          softwareQualityAttributes
        }
        otherRequirements
        glossary
        analysisModels
        issuesList
      }
    }
  }
`;

export const DELETE_TEMPLATE = gql`
  mutation DeleteTemplate($id: String!) {
    deleteTemplate(id: $id) {
      id
      name
      description
      category
      features
      image {
        name
        src
      }
      specification {
        introduction {
          purpose
          documentConventions
          intendedAudience
          projectScope
        }
        overallDescription {
          perspective
          userCharacteristics
          operatingEnvironment
          designImplementationConstraints
          userDocumentation
          assemptionsDependencies
        }
        nonFunctionalRequirements {
          performanceRequirements
          safetyRequirements
          securityRequirements
          softwareQualityAttributes
        }
        otherRequirements
        glossary
        analysisModels
        issuesList
      }
    }
  }
`;
