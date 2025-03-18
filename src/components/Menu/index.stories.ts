import type { Meta, StoryObj } from '@storybook/react';

import Menu from '.';

const meta = {
  title: 'Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		items: [
			{
				label: 'Hello, World!',
			}
		],
		component: 'component',
  },
};
