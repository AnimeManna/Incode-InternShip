import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AvatarUser from '../../components/AvatarUser';

describe(' <AvatarUser /> ', () => {
  const props = {
    login: 'STALIN',
  };
  describe('render() ', () => {
    test(' render the component ', () => {
      const wrapper = shallow(<AvatarUser login={props.login} />);
      const container = wrapper.dive();
      expect(toJson(container)).toMatchSnapshot();
    });
  });
});
