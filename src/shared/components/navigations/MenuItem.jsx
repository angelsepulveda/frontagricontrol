import React from 'react';

import { hasChildren } from '../../helpers/utilsMenu.js';
import MenuSidebarMultiLevel from './MenuSidebarMultiLevel.jsx';
import MenuSidebarSingleLevel from './MenuSidebarSingleLevel.jsx';

export default function MenuItem({ item }) {
	const Component = hasChildren(item)
		? MenuSidebarMultiLevel
		: MenuSidebarSingleLevel;

	return (
		<React.Fragment key={item.id}>
			<Component item={item} />
		</React.Fragment>
	);
}
