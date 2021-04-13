import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import ErrorHandler from '../../../components/ErrorHandler';


//configure is used for install and adapter from the enzyme library
// you need to import this adapter from 
configure({ adapter: new Adapter() });

// shallow traverse and creates a copy of the given component
it('should render my component', () => {
    const component = shallow(<ErrorHandler errorMessage="error" />);
    
})