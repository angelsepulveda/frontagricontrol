import { DataGrid } from 'devextreme-react';
import {
	ColumnChooser,
	Editing,
	Export,
	FilterRow,
	Grouping,
	GroupPanel,
	HeaderFilter,
	LoadPanel,
	Pager,
	Paging,
	Scrolling,
	SearchPanel,
	Selection,
	Sorting,
	Summary,
	TotalItem,
} from 'devextreme-react/data-grid';
import { useTranslation } from 'react-i18next';

export const DataGridCustom = (props) => {
	const [t] = useTranslation('global');
	const {
		children,
		dataStore,
		updating,
		deleting,
		addButton,
		fileNameReport,
		pageSize,
		columnCount,
		adding,
	} = props;

	return (
		<DataGrid
			id="grid"
			dataSource={dataStore}
			repaintChangesOnly={true}
			showRowLines={true}
			showBorders={true}
			rowAlternationEnabled={true}
			columnHidingEnabled={true}
			columnAutoWidth={true}
			allowColumnReordering={true}
			onToolbarPreparing={(e) => {
				e.toolbarOptions.items.unshift(
					{
						location: 'before',
						widget: 'dxButton',
						options: {
							type: 'default',
							stylingMode: 'contained',
							icon: 'refresh',
							onClick: () => {
								e.component.refresh();
							},
						},
					},
					!adding && addButton ? addButton : {},
				);
			}}
		>
			<Export
				enabled={true}
				allowExportSelectedData={false}
				fileName={fileNameReport}
			/>
			<Grouping contextMenuEnabled={true} expandMode="rowClick" />
			<GroupPanel visible={true} emptyPanelText="" />
			<ColumnChooser enabled={true} mode="select" />
			<LoadPanel enabled={true} />
			<Selection mode="single" />
			<Sorting mode="multiple" />
			<FilterRow visible={true} applyFilter={'auto'} />
			<HeaderFilter visible={true} />
			<SearchPanel
				visible={true}
				width={240}
				placeholder={t('common.search')}
			/>
			<Editing
				refreshMode="full"
				mode="form"
				allowAdding={adding}
				allowUpdating={updating}
				allowDeleting={deleting}
			/>
			{children}
			<Summary>
				<TotalItem column={columnCount} summaryType="count" />
			</Summary>
			<Scrolling rowRenderingMode="virtual"></Scrolling>
			<Paging defaultPageSize={pageSize} />
			<Pager
				visible={true}
				displayMode={'full'}
				showInfo={true}
				showNavigationButtons={true}
			/>
		</DataGrid>
	);
};
