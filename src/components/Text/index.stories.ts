import type { Meta, StoryObj } from '@storybook/react';

import Text from '.';

const meta = {
  title: 'Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { options: ['client', 'productOwner', 'developer', 'admin', 'error'] },
    variant: { options: ['display', 'headline', 'title', 'subheader', 'body', 'caption'] },
    weight: { options: ['initial', 'normal', 'bold'] },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		color: 'developer',
		children: 'Text',
  },
};
