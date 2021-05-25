import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  test('Search bar input should change state', () => {
    const {getByTestId} = render(<App/>)
    const searchInput = getByTestId('search-bar-input');
    fireEvent.change(searchInput, { target: { value: 'arizona' } })
    expect(this.state.search).toBe('arizona')
  })
  test('Render search input', () => {
    render(<App />);
 
    const input = screen.getByTestId("search-bar-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  
  test('pass valid email to test email input field', () => {
    render(<App />);
 
    const input = screen.getByTestId("search-bar-input");
    userEvent.type(input, "arizona");
    
    expect(screen.getByTestId("search-bar-input")).toHaveValue("arizona");
    expect(this.state.search).toBe("arizona");
  });

});

describe ('examing jest', () => {
  it ('render correctly', () =>{
    const appWrapper = shallow(<App/>).dive();
    expect (appWrapper).toMatchSnapshot();
  }
  )
})
