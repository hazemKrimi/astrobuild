import type { Meta, StoryObj } from '@storybook/react';

import ImagePreview from '.';

const meta = {
  title: 'ImagePreview',
  component: ImagePreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { options: ['client', 'productOwner', 'developer', 'admin'] },
  },
} satisfies Meta<typeof ImagePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
		color: 'developer',
  },
};
