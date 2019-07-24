import React from "react";
import { signIn, signOut } from "../actions";
import { connect } from "react-redux";

class GoogleAuth extends React.Component {
  componentDidMount = () => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "270660236516-kf46t323k144g114ahg2re9mrujtkisq.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  };

  onAuthChange = isSignedIn => {
    isSignedIn ? this.props.signIn() : this.props.signOut();
  };

  onSignInClick = () => {
    this.props.signIn(this.auth.currentUser.get().getId());
  };

  onSignOutClick = () => {
    this.props.signOut();
  };

  renderAuthButton = () => {
    switch (this.props.isSignedIn) {
      case true:
        return (
          <button onClick={this.onSignOutClick} className="ui button red google">
            <i className="icon google" />
            Sign Out
          </button>
        );
      case false:
        return (
          <button onClick={this.onSignInClick} className="ui button red google">
            <i className="icon google" />
            Sign in with Google
          </button>
        );
      default:
        return null;
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth
  };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
