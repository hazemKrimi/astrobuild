import type { Meta, StoryObj } from '@storybook/react';

import ContextMenu from '.';

const meta = {
  title: 'ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		items: [
			{
				label: 'Hello, World!',
				action: () => window.alert('Hello, World!')
			}
		],
		component: 'component',
  },
};
