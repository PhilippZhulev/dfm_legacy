import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

require('babel-plugin-require-context-hook/register')();

configure({ adapter: new Adapter() });
