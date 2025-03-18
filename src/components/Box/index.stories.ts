import type { Meta, StoryObj } from '@storybook/react';

import Box from '.';

const meta = {
  title: 'Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		color: '#000000',
		children: 'Hello, World!',
  },
};
