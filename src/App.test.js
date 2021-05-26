import { fireEvent, render, waitFor, screen, toBeTruthy, getByTestId, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {shallow} from 'enzyme';
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
  test('Search bar input should render', () => {
    const {getByTestId} = render(<App/>)
    const searchInput = getByTestId('search-bar-input');
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute("type", "search");
    // fireEvent.change(searchInput, { target: { value: 'arizona' } })
    // expect(this.state.search).toBe('arizona')
  })

  test('Derbyhire is in the document (flickr has returned the right json)', async () => {
    render(<App />);
    await waitFor(() => expect(screen.findByText(/derbyshire/i)).toBeInTheDocument);
    // const post = screen.getByTestId("image-post");
    // expect(post).toBeInTheDocument();
    })

    
  test('Pictures are loading', async () => {
    render(<App />);
    await waitFor(() => expect(screen.findByTestId('image-post')).toBeInTheDocument);
    })

  test('Search bar input should change state and load new pages', async () => {
    const {getAllByTestId} = render(<App/>)
    const input = getAllByTestId('search-bar-input')
    fireEvent.change(input[0], {target:{ value: 'arizona'}});

    render(<App />);
    await waitFor(() => expect(screen.findByText(/arizona/i)).toBeInTheDocument);
  })

});

afterEach(cleanup)
 
it('should take a snapshot', () => {
   const { asFragment } = render(<App />)
   
   expect(asFragment(<App />)).toMatchSnapshot()
  })