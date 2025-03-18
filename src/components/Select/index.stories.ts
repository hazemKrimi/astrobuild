import type { Meta, StoryObj } from '@storybook/react';

import Select from '.';

const meta = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { options: ['client', 'productOwner', 'developer', 'admin', 'error'] },
    value: { control: 'text' },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    color: 'productOwner',
    value: '',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ],
    name: 'select',
    onChange: () => { },
  },
};
