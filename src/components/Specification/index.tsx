import { forwardRef } from 'react';
import { Box, Text } from '..';
import { FeatureOutput, SpecificationOutput } from '../../graphql/types';
import { Wrapper } from './styles';

type SpecificationProps = {
  specification: SpecificationOutput;
  features: Array<FeatureOutput>;
};

const Specification = forwardRef<HTMLDivElement, SpecificationProps>(
  ({ specification, features }, ref) => {
    return (
      <Wrapper ref={ref}>
        <Box marginBottom='30px'>
          <Text variant='title'>Customer Requirements Specifications</Text>
        </Box>
        <Box marginBottom='15px'>
          <Box marginBottom='10px'>
            <Text variant='headline' weight='bold'>
              1. Introduction
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              1.1. Purpose
            </Text>
            <Text variant='body'>{specification.introduction.purpose}</Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              1.2. Document Conventions
            </Text>
            <Text variant='body'>
              {specification.introduction.documentConventions}
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              1.3. Intended Audience and Reading Suggestions
            </Text>
            <Text variant='body'>
              {specification.introduction.intendedAudience}
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              1.4. Project Scope
            </Text>
            <Text variant='body'>
              {specification.introduction.projectScope}
            </Text>
          </Box>
        </Box>
        <Box marginBottom='15px'>
          <Box marginBottom='10px'>
            <Text variant='headline' weight='bold'>
              2. Overall Description
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              2.1. Project Perspective
            </Text>
            <Text variant='body'>
              {specification.overallDescription.perspective}
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              2.2. User Classes and Characteristics
            </Text>
            <Text variant='body'>
              {specification.overallDescription.userCharacteristics}
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              2.3. Operating Environment
            </Text>
            <Text variant='body'>
              {specification.overallDescription.operatingEnvironment}
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              2.4. Design and Implementation Constraints
            </Text>
            <Text variant='body'>
              {specification.overallDescription.designImplementationConstraints}
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              2.5. User Documentation
            </Text>
            <Text variant='body'>
              {specification.overallDescription.userDocumentation}
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              2.6. Assumptions and Dependencies
            </Text>
            <Text variant='body'>
              {specification.overallDescription.assemptionsDependencies}
            </Text>
          </Box>
        </Box>
        <Box marginBottom='15px'>
          <Box marginBottom='10px'>
            <Text variant='headline' weight='bold'>
              3. System Features
            </Text>
          </Box>
          {features.map((feature, index) => (
            <Box marginBottom='5px' key={feature.id}>
              <Text variant='subheader' weight='bold' gutterBottom>
                3.{index + 1}. {feature.name}
              </Text>
              <Text variant='body'>{feature.description}</Text>
            </Box>
          ))}
        </Box>
        <Box marginBottom='15px'>
          <Box marginBottom='10px'>
            <Text variant='headline' weight='bold'>
              4. Other Non-Functional Requirements
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              4.1. Performance Requirements
            </Text>
            <Text variant='body'>
              {specification.nonFunctionalRequirements.performanceRequirements}
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              4.2. Safety Requirements
            </Text>
            <Text variant='body'>
              {specification.nonFunctionalRequirements.safetyRequirements}
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              4.3. Security Requirements
            </Text>
            <Text variant='body'>
              {specification.nonFunctionalRequirements.securityRequirements}
            </Text>
          </Box>
          <Box marginBottom='5px'>
            <Text variant='subheader' weight='bold' gutterBottom>
              4.4. Software Quality Attributes
            </Text>
            <Text variant='body'>
              {
                specification.nonFunctionalRequirements
                  .softwareQualityAttributes
              }
            </Text>
          </Box>
        </Box>
        <Box marginBottom='15px'>
          <Box marginBottom='10px'>
            <Text variant='headline' weight='bold'>
              5. Other Requirements
            </Text>
          </Box>
          <Text variant='body'>{specification.otherRequirements}</Text>
        </Box>
        <Box marginBottom='15px'>
          <Box marginBottom='10px'>
            <Text variant='headline' weight='bold'>
              6. Glossary
            </Text>
          </Box>
          <Text variant='body'>{specification.glossary}</Text>
        </Box>
        <Box marginBottom='15px'>
          <Box marginBottom='10px'>
            <Text variant='headline' weight='bold'>
              6. Analysis Models
            </Text>
          </Box>
          <Text variant='body'>{specification.analysisModels}</Text>
        </Box>
        <Box marginBottom='15px'>
          <Box marginBottom='10px'>
            <Text variant='headline' weight='bold'>
              7. Issues List
            </Text>
          </Box>
          <Text variant='body'>{specification.issuesList}</Text>
        </Box>
      </Wrapper>
    );
  }
);

export default Specification;
