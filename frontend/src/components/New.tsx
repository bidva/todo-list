import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/list';

const listButtonStyle: any = {
  backgroundColor: '#EE224F',
  border: 'none',
  borderRadius: 5,
  height: 36,
  color: '#fff',
  fontSize: 14,
  width: 50
};

interface RecipeProps {
  onCreateList: () => void;
  loadingCreateList: boolean;
}
class New extends Component<RecipeProps> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { loadingCreateList } = this.props;
    return (
      <>
        <h1>TODO LIST</h1>
        <p>Would you like to make a new List?</p>
        <button
          onClick={this.handleClick}
          disabled={loadingCreateList}
          style={listButtonStyle}
        >
          create
        </button>
      </>
    );
  }

  handleClick = () => {
    const { onCreateList } = this.props;
    onCreateList();
  };
}

const dispatchProps = {
  onCreateList: actions.createList
};

const mapStateToProps = (state: any) => {
  const { listStore } = state;
  return { listStore };
};

export default connect(mapStateToProps, dispatchProps)(New);
