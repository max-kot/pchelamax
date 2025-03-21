/**
 * ItemComponent ==> принимает готовые компоненты, например ItemComponent={Card}}
 * renderItem ==> функция для построения компонента внутри элемента, например ItemComponent={(item) => <a href={item.href}>{item.text}</a>}}, ребёнок ItemWrapper
 */
export const List = ({ className, itemClassName, list = [], ListWrapper = 'ul', ItemWrapper = 'li', renderItem, ItemComponent }) => {
	return (
		<ListWrapper className={className}>
			{list.map((data, index) => {
				if (renderItem) {
					return (
						<ItemWrapper key={index} className={itemClassName}>
							{renderItem ? renderItem(data, index) : data}
						</ItemWrapper>
					)
				} else if (ItemComponent) {
					return (<ItemComponent key={index} item={item} />)
				}
			})
			}
		</ListWrapper>
	);
};