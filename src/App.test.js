import { fireEvent, render, waitFor, screen, toBeTruthy, getByTestId} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {shallow} from 'enzyme';
import App from './App';
import React from 'react';
import waitUntil from 'async-wait-until';



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

  test('Search bar input should change state', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<App/>);
    const {getAllByTestId} = render(<App/>)
    const input = getAllByTestId('search-bar-input')
    fireEvent.change(input[0], {target:{ value: 'arizona'}});
    // expect(handleChange).toHaveBeenCalled();
    // now fire your event
    // fireEvent.change(input, { target: { value: 'arizona' } });

    // fireEvent.change(getAllByTestId('search-bar-input').querySelector('input'), { target: { value: 'arizona' } })
    expect(wrapper.state('search')).toBe('arizona')
  })


  
  // test('pass valid email to test email input field', () => {
  //   render(<App />);
 
  //   const input = screen.getByTestId("search-bar-input");
  //   userEvent.type(input, "arizona");
    
  //   expect(screen.getByTestId("search-bar-input")).toHaveValue("arizona");
  //   expect(this.state.search).toBe("arizona");
  // });

});

describe ('examing jest', () => {
  it ('render correctly', () =>{
    const appWrapper = shallow(<App/>).dive();
    expect (appWrapper).toMatchSnapshot();
  }
  )
})
