import React from 'react';
import { Meta, Story } from '@storybook/react';
import { VideoProgress } from '../src';

const meta: Meta = {
  title: 'VideoProgress',
  component: VideoProgress,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = args => {
    const testRef = React.useRef(null);

    return <VideoProgress  
        controls
        src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        height="200px"
        ref={testRef}
        {...args}
    />
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
