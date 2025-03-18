import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { options: ['client', 'productOwner', 'developer', 'admin', 'error'] },
    text: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		color: 'admin',
		text: 'Hello, World!',
		variant: 'primary-action'
  },
};
