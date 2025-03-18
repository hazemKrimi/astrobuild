import type { Meta, StoryObj } from '@storybook/react';

import IconButton from '.';

const meta = {
  title: 'IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { options: ['client', 'productOwner', 'developer', 'admin'] },
    size: { options: ['small', 'medium', 'big'] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		color: 'admin',
		size: 'medium',
		onClick: () => window.alert('Hello, World!')
  },
};
