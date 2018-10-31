import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Sidebar from '../../components/Sidebar';

describe('<Sidebar />', () => {
  const props = {
    categories: [
      {
        title: 'Test',
        id: 1,
        description: 'Test',
      },
      {
        title: 'Test2',
        id: 2,
        description: 'Test2',
      },
      {
        title: 'Test3',
        id: 3,
        description: 'Test3',
      },
    ],
    isAuth: true,
    snackBarMessage: 'Успешный тест',
    snackBarStatus: true,
    getIsLoaded: true,
  };
  describe(' render() ', () => {
    test('Render the component', () => {
      const {
        categories, isAuth, snackBarMessage, snackBarStatus, getIsLoaded,
      } = props;
      const wrapper = shallow(
        <Sidebar
          isAuth={isAuth}
          categories={categories}
          snackBarStatus={snackBarStatus}
          snackBarMessage={snackBarMessage}
          getIsLoaded={getIsLoaded}
        />,
      );
      const component = wrapper.dive();
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
