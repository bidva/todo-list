// Home page and container for the app
import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../components/List';
import New from '../components/New';
import Add from '../components/Add';
import actions from '../actions/list';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../components/Loader';

const listContainerStyle: any = {
  width: '60%',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '40px 20px',
  textAlign: 'center',
  maxWidth: '400px'
};

const resetButtonStyle: any = {
  backgroundColor: '#EE224F',
  border: 'none',
  borderRadius: 5,
  height: 36,
  color: '#fff',
  fontSize: 14,
  width: 50,
  float: 'right',
  marginTop: 20
};

interface RecipeProps {
  history?: any;
  listStore?: any;
  match?: any;
  loadList: any;
  resetList: any;
}

class Home extends Component<RecipeProps> {
  componentDidMount() {
    const {
      props: {
        listStore: { list, listId },
        history,
        match: {
          params: { id: paramsId }
        },
        loadList
      }
    } = this;
    if (listId && !paramsId) {
      history.push(`/${listId}`);
    }
    if (!list && !listId && paramsId) {
      loadList({ listId: paramsId });
    }
    if (!list && listId) {
      loadList({ listId });
    }
  }

  render() {
    const {
      props: {
        listStore: { listId },
        match: {
          params: { id: paramsId }
        }
      }
    } = this;
    return (
      <>
        {listId || paramsId ? this.renderList() : this.renderNew()}
        <ToastContainer autoClose={3000} />
      </>
    );
  }

  handleReset = () => {
    const {
      props: {
        listStore: { listId },
        resetList
      }
    } = this;
    resetList({ listId });
  };

  renderList = () => {
    const {
      props: {
        listStore: {
          list,
          loadingListFetch,
          loadingDeleteItem,
          loadingResetList
        }
      }
    } = this;
    if (loadingListFetch) {
      return <Loader />;
    }
    if (!list) {
      return <Loader />;
    }
    return (
      <div style={listContainerStyle}>
        <Add listId={list.id} />
        <List
          items={list.items}
          listId={list.id}
          loadingDeleteItem={loadingDeleteItem}
        />
        <button
          disabled={loadingResetList}
          style={resetButtonStyle}
          onClick={this.handleReset}
        >
          Reset
        </button>
      </div>
    );
  };

  renderNew = () => {
    const {
      props: {
        listStore: { loadingCreateList }
      }
    } = this;
    return <New loadingCreateList={loadingCreateList} />;
  };
}

const dispatchProps = {
  loadList: actions.loadList,
  resetList: actions.resetList
};

const mapStateToProps = (state: any) => {
  const { listStore } = state;
  return { listStore };
};

export default connect(mapStateToProps, dispatchProps)(Home);
