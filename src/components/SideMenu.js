import React, { Component } from 'react';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';



class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { semesterValue: "Semester 1", authorValue: "Indian" };
  }
  componentWillMount() {
    if (this.props.isFilter == false) {
      this.setState({ imgURL: this.props.userDetails.imgURL });
    }
  }
  render() {
    if (this.props.isFilter == true) {
      return (
        <div className="SideMenu mainBackground mainColor">
          <MuiThemeProvider>
            <a href="" className="logo">Books<span id="watchPart">Watch</span></a>
            <div className="filterDiv">
              <br /><br />
              Semester<br />
              <DropDownMenu value={this.state.semesterValue} autoWidth={false} className="dropDownMenu" labelStyle={{ "color": "rgba(255,255,255,0.87)" }}>
                <MenuItem value="Semester 1" primaryText="Semester 1" />
                <MenuItem value="Semester 2" primaryText="Semester 2" />
                <MenuItem value="Semester 3" primaryText="Semester 3" />
                <MenuItem value="Semester 4" primaryText="Semester 4" />
                <MenuItem value="Semester 5" primaryText="Semester 5" />
                <MenuItem value="Semester 6" primaryText="Semester 6" />
                <MenuItem value="Semester 7" primaryText="Semester 7" />
                <MenuItem value="Semester 8" primaryText="Semester 8" />
              </DropDownMenu>
              <br /><br />
              Author<br /><br />
              <Checkbox label="Indian" labelStyle={{ "color": "rgba(255,255,255,0.87)", "text-align": "left", "margin-left": "5px" }} iconStyle={{ "fill": "rgba(255,255,255,0.87)" }} />
              <Checkbox label="Foreign" labelStyle={{ "color": "rgba(255,255,255,0.87)", "text-align": "left", "margin-left": "5px" }} iconStyle={{ "fill": "rgba(255,255,255,0.87)" }} />
            </div>
            <div className="linksDiv">
              <a href="">Sell Books</a>
            </div>
          </MuiThemeProvider>
        </div>

      );
    } else {
      return (
        <div className="SideMenu mainBackground mainColor">
          <MuiThemeProvider>
            <a href="" className="logo">Books<span id="watchPart">Watch</span></a>
            <div className="userInfoDiv">
              <br /><br />
              <img src={this.props.proPic} className="profilePic" /><br /><br />
              {this.props.userDetails.name}<br />
              {this.props.userDetails.email}<br />
            </div>
            <div className="linksDiv">
              <RaisedButton backgroundColor="lawngreen" fullWidth={true}>Add Book</RaisedButton><br /><br />
              <RaisedButton backgroundColor="red" fullWidth={true}>Logout</RaisedButton>
            </div>
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

export default connect(
  (store) => {
    return store;
  },
  (dispatch) => {
    return {
      update: (dispatchType, dispatchPayload) => {
        dispatch({ type: dispatchType, payload: dispatchPayload });
      }
    }
  }
)(SideMenu);