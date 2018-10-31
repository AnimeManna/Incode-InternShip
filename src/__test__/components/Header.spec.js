import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Header from '../../components/Header';

describe('<Header />', () => {
  describe(' render() ', () => {
    test('Render the component isAuth = true', () => {
      const props = {
        isAuth:true,
        UserID:1
      }
      const wrapper = shallow(
        <Header
          isAuth={props.isAuth}
          UserID={props.UserID}
        />,
      );
      const component = wrapper.dive();
    });
  });
});
