import * as React from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot
} from 'react-beautiful-dnd';
import { Flex } from 'grid-styled';
import './List.css';
import { connect } from 'react-redux';
import actions from '../actions/item';
import { animateScroll } from "react-scroll";

interface Item {
  id: string;
  title: string;
  tempId: string;
}

interface AppProps {
  items: Item[];
  deleteItem: any;
  reOrderItem: any;
  loadingDeleteItem: boolean;
  listId: string;
}

const getItemStyle = (draggableStyle: any, isDragging: boolean): {} => ({
  userSelect: 'none',
  padding: 16,
  margin: `0 0 16px 0`,
  background: isDragging ? '#e8abb9' : '#fff',
  border: '#ABABAB solid 1px',
  borderRadius: 5,
  textAlign: 'left',
  position: 'relative',
  wordBreak: 'break-word',
  paddingRight: 45,
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): {} => ({
  background: '#F0EFEF',
  padding: '10px 20px',
  minHeight: 400,
  maxHeight: 400,
  border: '#ABABAB solid 1px',
  overflow: 'scroll'
});

const removeButtonStyle: any = {
  backgroundColor: '#EE224F',
  border: 'none',
  borderRadius: 5,
  color: '#fff',
  fontSize: 14,
  right: 15,
  top: 10,
  position: 'absolute'
};

class List extends React.Component<AppProps> {
  onDragEnd = (result: DropResult): void => {
    const { reOrderItem, listId } = this.props;
    const { draggableId, destination } = result;
    if (destination) {
      const itemId = draggableId.split(',')[0];
      reOrderItem({ listId, itemId, index: destination.index });
    }
  };

  onRemove = (id: string): void => {
    const { deleteItem, listId } = this.props;
    deleteItem({ id, listId });
  };

  componentDidMount() {
      this.scrollToBottom();
  }
  componentDidUpdate() {
      this.scrollToBottom();
  }
  scrollToBottom() {
      animateScroll.scrollToBottom({
        containerId: "droppableContainer"
      });
  }
  public render() {
    const { loadingDeleteItem } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Flex justifyContent={'space-between'} style={{ marginTop: '20px' }}>
          <Flex flexDirection="column" style={{ width: '100%' }}>
            <Droppable droppableId="droppable">
              {(
                provided: DroppableProvided,
                snapshot: DroppableStateSnapshot
              ) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  id="droppableContainer"
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.props.items.map((item, index) => (
                    <Draggable
                      key={`${item.id},${index}`}
                      draggableId={`${item.id},${index}`}
                      index={index}
                    >
                      {(
                        providedDraggable: DraggableProvided,
                        snapshotDraggable: DraggableStateSnapshot
                      ) => (
                        <div>
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                            style={getItemStyle(
                              providedDraggable.draggableProps.style,
                              snapshotDraggable.isDragging
                            )}
                          >
                            {item.tempId ? '⏳' : '✅'}
                            <span style={{ padding: 10 }}>{item.title}</span>
                            {item.tempId ? null : (
                              <button
                                style={removeButtonStyle}
                                onClick={() => this.onRemove(item.id)}
                                disabled={loadingDeleteItem}
                              >
                                X
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </Flex>
        </Flex>
      </DragDropContext>
    );
  }
}

const dispatchProps = {
  deleteItem: actions.deleteItem,
  reOrderItem: actions.reOrderItem
};

const mapStateToProps = (state: any) => {
  const { listStore } = state;
  return { listStore };
};

export default connect(mapStateToProps, dispatchProps)(List);
