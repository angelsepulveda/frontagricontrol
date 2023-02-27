import menu from '../../config/menu.js';
import MenuItem from './MenuItem.jsx';

export default function Menu() {
	return menu.map((item, key) => <MenuItem key={key} item={item} />);
}
