import type { Meta, StoryObj } from '@storybook/react';

import Chip from '.';

const meta = {
  title: 'Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { options: ['client', 'productOwner', 'developer', 'admin'] },
    text: { control: 'text' },
    variant: { options: ['outlined', 'filled'] },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		color: 'admin',
		text: 'Hello, World!',
		variant: 'filled'
  },
};
