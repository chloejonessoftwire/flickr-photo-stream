import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';


test('renders Flick Photo Screen Title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Flickr Photo Stream/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Unit Tests for App', () => {
  test('Test Rendering', () => {
    const {getByTestId} = render(<App/>)
    expect(getByTestId('content')).toBeInTheDocument()
  })
});

