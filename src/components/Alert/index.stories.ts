import type { Meta, StoryObj } from '@storybook/react';

import Alert from '.';

const meta = {
  title: 'Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    color: { options: ['client', 'productOwner', 'developer', 'admin'] },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    text: 'Alert',
		color: 'client'
  },
};
