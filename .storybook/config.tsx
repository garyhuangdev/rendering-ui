import { addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import React from 'react';
import '../src/styles/index.scss';

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
  width: '500px'
};

const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>Components</h3>
    {storyFn()}
  </div>
);

addDecorator(storyWrapper);
addDecorator(withInfo);
addParameters({
  info: {
    inline: true,
    header: false,
    source: true,
  },
});
