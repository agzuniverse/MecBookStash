import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { connect } from "react-redux";
import {
  setGlobalUid,
  setGlobalEmail,
  setGlobalName,
  setGlobalProPic
} from "../redux/ActionCreators";
import { readFromStorage, searchUser } from "../firebase/firebase";
import SideMenu from "./SideMenu";
import ProductDiv from "./ProductDiv";
import CircularProgress from "material-ui/CircularProgress";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Searchbar from "./Searchbar";

class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: {},
      loaded: false
    };
  }

  componentWillMount() {
    if (!this.props.uid) {
      this.fetchLocalUidAsync();
      this.props.updateName(localStorage.getItem("LOCAL_NAME"));
      this.props.updateEmail(localStorage.getItem("LOCAL_EMAIL"));
      this.props.updatePropic(localStorage.getItem("LOCAL_PROPIC"));
    } else this.fetchUserBooks(this.props.uid);
  }

  fetchLocalUidAsync = async () => {
    await this.props.updateUid(localStorage.getItem("LOCAL_UID"));
    this.fetchUserBooks(this.props.uid);
  };

  fetchUserBooks = async uid => {
    const result = await readFromStorage(uid);
    let bookData = {};
    result.forEach(data => {
      bookData[data.id] = data.data();
      Object.assign(bookData[data.id], { bookId: data.id });
    });
    if (bookData == null) bookData = {};
    this.setState({
      bookData,
      loaded: true
    });
  };

  updateBookListOnDelete = id => {
    const tempData = this.state.bookData;
    delete tempData[id];
    this.setState({
      bookData: tempData
    });
  };

  performSearch = async query => {
    this.setState({
      loaded: false
    });
    try {
      const result = await searchUser(query, this.props.uid);
      const searchResults = {};
      result.forEach(data => {
        searchResults[data.id] = data.data();
      });
      this.setState({
        searchResults,
        loaded: true
      });
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  };

  search = e => {
    e.preventDefault();
    const query = document.getElementById("input2").value;
    this.performSearch(query);
  };

  navigateOnAuthChange = path => {
    switch (path) {
      case "userpage":
        this.props.history.push("/user");
        break;
      case "homepage":
        this.props.history.push("/");
        break;
      default:
        break;
    }
  };

  render() {
    const { searchResults, bookData, loaded } = this.state;

    let books = [];
    if (searchResults) {
      books = Object.keys(searchResults).map(key => (
        <ProductDiv details={searchResults[key]} />
      ));
    } else {
      books = Object.keys(bookData).map(key => (
        <ProductDiv
          details={bookData[key]}
          onDelete={this.updateBookListOnDelete}
        />
      ));
    }

    if (this.props.uid !== "" && this.props.uid !== null)
      return (
        <div className="App">
          <SideMenu
            isFilter={false}
            userDetails={this.props}
            navigateOnAuthChange={this.navigateOnAuthChange}
          />
          <div className="mainDiv">
            <Searchbar search={this.search} />
            <div id="productList">
              {loaded ? (
                books
              ) : (
                <div id="loading">
                  <MuiThemeProvider>
                    <CircularProgress size={50} thickness={5} />
                  </MuiThemeProvider>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    return <h1>403 Forbidden</h1>;
  }
}

Userpage.propTypes = {
  uid: PropTypes.string.isRequired,
  updateUid: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  updatePropic: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  uid: state.auth.uid
});

const mapDispatchToProps = dispatch => ({
  updateUid: uid => {
    dispatch(setGlobalUid(uid));
  },
  updateEmail: email => {
    dispatch(setGlobalEmail(email));
  },
  updateName: name => {
    dispatch(setGlobalName(name));
  },
  updatePropic: propic => {
    dispatch(setGlobalProPic(propic));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Userpage);
