import type { Meta, StoryObj } from '@storybook/react';

import CheckBox from '.';

const meta = {
  title: 'CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { options: ['client', 'productOwner', 'developer', 'admin'] },
    label: { control: 'text' },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		color: 'admin',
		label: 'Hello, World!',
		checked: false,
		onClick: () => window.alert('Clicked!'),
  },
};
