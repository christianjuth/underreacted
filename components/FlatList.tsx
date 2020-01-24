/**
 * Made this cause I miss React Native, and
 * the lack of FlatList in React makes me sad.
 * This implementation does not use virtualization,
 * but I thought the API alone was worth it
 *
 * @summary like React Native FlatList, but worse
 * @author Christian Juth
 *
 * Created at     : 2020-01-21 23:36:34 
 * Last modified  : 2020-01-22 00:03:40
 */

import React, { Fragment } from 'react';

interface FlatListProps {
  data: any[],
  renderItem: Function,
  keyExtractor?: Function,
  inverted: boolean,
  ItemSeparatorComponent?: React.ReactNode,
  ListEmptyComponent?: React.ReactNode,
  ListHeaderComponent?: React.ReactNode,
  ListFooterComponent?: React.ReactNode
}

function FlatList({
  data, 
  renderItem, 
  keyExtractor,
  inverted = false,
  ItemSeparatorComponent = null,
  ListEmptyComponent = null,
  ListHeaderComponent = null,
  ListFooterComponent = null
}: FlatListProps) {

  if(data.length === 0) return ListEmptyComponent;

  function renderItemWithExtras(item: any, i: number) {
    return <>
      {i !== 0 ? ItemSeparatorComponent : null}
      {renderItem(item, i)}
    </>;
  }

  return (inverted ? data.reverse() : data)
  .map((item: any, i: number) => (
    <>
      {ListHeaderComponent}
      {keyExtractor ? (
        <Fragment key={keyExtractor(item)}>
          {renderItemWithExtras(item, i)}
        </Fragment>
      ) : renderItemWithExtras(item, i)}
      {ListFooterComponent}
    </>
  ));
}

export default FlatList;