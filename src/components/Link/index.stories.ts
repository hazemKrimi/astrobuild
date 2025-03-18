import type { Meta, StoryObj } from '@storybook/react';

import Link from '.';

const meta = {
  title: 'Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { options: ['success', 'error', 'warning', 'black'] },
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		color: 'success',
		children: 'Link',
		url: true,
		href: 'https://hazemkrimi.tech',
		target: '_blank'
  },
};
