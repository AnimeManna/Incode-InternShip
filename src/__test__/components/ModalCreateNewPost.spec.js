import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ModalCreateNewPost from '../../components/ModalCreateNewPost';

describe('<ModalCreateNewPost />', () => {
  const props = {
    statusModal: true,
  };
  describe(' render() ', () => {
    test('Render the component', () => {
      const mockOnClick = jest.fn();
      const wrapper = shallow(
        <ModalCreateNewPost
          statusModal={props.statusModal}
          onCloseModalNewPost={mockOnClick}
        />
      );
      const component = wrapper.dive();
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
