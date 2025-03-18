import type { Meta, StoryObj } from '@storybook/react';

import Spinner from '.';

const meta = {
  title: 'Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { options: ['client', 'productOwner', 'developer', 'admin', 'error'] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		color: 'client',
  },
};
