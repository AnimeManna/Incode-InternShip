import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import CreateNewPost from '../../components/CreateNewPost';

const mockStore = configureStore();
const initialState = {
  authReducer: {
    user: {
      id: '5bd9555fb9cecc00043a7d66',
      login: 'AnimeManna',
    },
  },
  newPostReducer: {
    isValid: true,
    isChanged: true,
    newPostIsLoaded: true,
  },
  categoryReducer: {
    categories: [
      {
        id: 1,
        title: 'test',
      },
      {
        id: 2,
        title: 'test1',
      },
    ],
  },
};
const store = mockStore(initialState);

describe('<CreateNewPost />', () => {
  describe('render()', () => {
    test('Render the component', () => {
      const wrapper = shallow(<CreateNewPost store={store} />);
      const component = wrapper.dive();
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
