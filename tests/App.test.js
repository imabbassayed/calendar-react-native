import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

describe('Application (App.js) loads succesfully with no error', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});