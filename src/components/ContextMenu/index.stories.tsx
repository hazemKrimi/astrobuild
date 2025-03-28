import type { Meta, StoryObj } from '@storybook/react';

import ContextMenu from '.';
import Box from '../Box';

const meta = {
	title: 'ContextMenu',
  component: ContextMenu,
	tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Example: Story = {
  render: () => {
    return (
      <>
        <ContextMenu
          component='box'
          items={[
            { label: 'Item' }
          ]}
        />
        <Box id='box'>Wrapped by ContextMenu!</Box>
      </>
    )
  },
}
