import gql from 'graphql-tag';

export const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      id
      clientId
      name
      image {
        name
        src
      }
      platforms
      template {
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
      state
      proposal {
        devtime {
          months
          days
          hours
        }
        summary
        purpose
        resources {
          resourceType
          developers
        }
      }
      paymentOption {
        optOne
        optTwo
        optThree
      }
      delivrable {
        specification {
          name
          src
        }
        fullBuild
        mvp {
          name
          src
        }
        design {
          name
          src
        }
      }
      totalPrice
    }
  }
`;

export const GET_ALL_PROJECTS_BY_CLIENT_ID = gql`
  query GetAllProjectsByClientId($id: String!) {
    getAllProjectsByClientId(id: $id) {
      id
      clientId
      name
      image {
        name
        src
      }
      platforms
      template {
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
      state
      proposal {
        devtime {
          months
          days
          hours
        }
        summary
        purpose
        resources {
          resourceType
          developers
        }
      }
      paymentOption {
        optOne
        optTwo
        optThree
      }
      delivrable {
        specification {
          name
          src
        }
        fullBuild
        mvp {
          name
          src
        }
        design {
          name
          src
        }
      }
      totalPrice
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: String!) {
    getProjectById(id: $id) {
      id
      clientId
      name
      image {
        name
        src
      }
      platforms
      template {
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
      state
      proposal {
        devtime {
          months
          days
          hours
        }
        summary
        purpose
        resources {
          resourceType
          developers
        }
      }
      paymentOption {
        optOne
        optTwo
        optThree
      }
      delivrable {
        specification {
          name
          src
        }
        fullBuild
        mvp {
          name
          src
        }
        design {
          name
          src
        }
      }
      totalPrice
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation AddProject($project: ProjectInput!) {
    addProject(project: $project) {
      id
      clientId
      name
      image {
        name
        src
      }
      platforms
      template {
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
      state
      proposal {
        devtime {
          months
          days
          hours
        }
        summary
        purpose
        resources {
          resourceType
          developers
        }
      }
      paymentOption {
        optOne
        optTwo
        optThree
      }
      delivrable {
        specification {
          name
          src
        }
        fullBuild
        mvp {
          name
          src
        }
        design {
          name
          src
        }
      }
      totalPrice
    }
  }
`;

export const CHANGE_PROJECT_STATE = gql`
  mutation ChangeProjectState($id: String!, $state: State!) {
    changeProjectState(id: $id, state: $state) {
      id
      clientId
      name
      image {
        name
        src
      }
      platforms
      template {
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
      state
      proposal {
        devtime {
          months
          days
          hours
        }
        summary
        purpose
        resources {
          resourceType
          developers
        }
      }
      paymentOption {
        optOne
        optTwo
        optThree
      }
      delivrable {
        specification {
          name
          src
        }
        fullBuild
        mvp {
          name
          src
        }
        design {
          name
          src
        }
      }
      totalPrice
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: String!, $name: String!, $image: InputFile!) {
    updateProject(id: $id, name: $name, image: $image) {
      id
      clientId
      name
      image {
        name
        src
      }
      platforms
      template {
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
      state
      proposal {
        devtime {
          months
          days
          hours
        }
        summary
        purpose
        resources {
          resourceType
          developers
        }
      }
      paymentOption {
        optOne
        optTwo
        optThree
      }
      delivrable {
        specification {
          name
          src
        }
        fullBuild
        mvp {
          name
          src
        }
        design {
          name
          src
        }
      }
      totalPrice
    }
  }
`;

export const ADD_PROJECT_PROPOSAL = gql`
  mutation AddProjectProposal($id: String!, $proposal: ProposalInput!) {
    addProjectProposal(id: $id, proposal: $proposal) {
      id
      clientId
      name
      image {
        name
        src
      }
      platforms
      template {
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
      state
      proposal {
        devtime {
          months
          days
          hours
        }
        summary
        purpose
        resources {
          resourceType
          developers
        }
      }
      paymentOption {
        optOne
        optTwo
        optThree
      }
      delivrable {
        specification {
          name
          src
        }
        fullBuild
        mvp {
          name
          src
        }
        design {
          name
          src
        }
      }
      totalPrice
    }
  }
`;

export const ADD_PROJECT_DESIGN = gql`
  mutation AddProjectDesign($design: ProjectFileInput!) {
    addProjectDesign(design: $design) {
      id
      clientId
      name
      image {
        name
        src
      }
      platforms
      template {
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
      state
      proposal {
        devtime {
          months
          days
          hours
        }
        summary
        purpose
        resources {
          resourceType
          developers
        }
      }
      paymentOption {
        optOne
        optTwo
        optThree
      }
      delivrable {
        specification {
          name
          src
        }
        fullBuild
        mvp {
          name
          src
        }
        design {
          name
          src
        }
      }
      totalPrice
    }
  }
`;

export const ADD_PROJECT_MVP = gql`
  mutation AddProjectMvp($mvp: ProjectFileInput!) {
    addProjectMvp(mvp: $mvp) {
      id
      clientId
      name
      image {
        name
        src
      }
      platforms
      template {
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
      state
      proposal {
        devtime {
          months
          days
          hours
        }
        summary
        purpose
        resources {
          resourceType
          developers
        }
      }
      paymentOption {
        optOne
        optTwo
        optThree
      }
      delivrable {
        specification {
          name
          src
        }
        fullBuild
        mvp {
          name
          src
        }
        design {
          name
          src
        }
      }
      totalPrice
    }
  }
`;

export const ADD_PROJECT_FULL_BUILD = gql`
  mutation AddProjectFullBuild($fullBuild: ProjectFullBuildInput!) {
    addProjectFullBuild(fullBuild: $fullBuild) {
      id
      clientId
      name
      image {
        name
        src
      }
      platforms
      template {
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
      state
      proposal {
        devtime {
          months
          days
          hours
        }
        summary
        purpose
        resources {
          resourceType
          developers
        }
      }
      paymentOption {
        optOne
        optTwo
        optThree
      }
      delivrable {
        specification {
          name
          src
        }
        fullBuild
        mvp {
          name
          src
        }
        design {
          name
          src
        }
      }
      totalPrice
    }
  }
`;
