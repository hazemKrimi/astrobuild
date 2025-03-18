import type { Meta, StoryObj } from '@storybook/react';

import Card from '.';

const meta = {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { options: ['client', 'productOwner', 'developer', 'admin', 'error'] },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		color: 'developer',
		title: 'Card title',
		description: 'Card description',
		selected: true
  },
};
