import React, { Component } from "react";
import { connect } from "react-redux";
import { showLoader, hideLoader } from "../redux/actions/loader-data";
import { updateUserData } from "../redux/actions/user-data";
import "../assets/login.css";
import { login } from "../http-calls";
import { showToast } from "../helper-methods";

class LoginPage extends Component {
  state = {
    formFields: {
      email: {
        value: "",
        isValid: false,
        isDirty: false
      },
      password: {
        value: "",
        isValid: false,
        isDirty: false
      }
    },
    isFormValid: false,
    redirectTo: null
  };

  componentDidMount() {
    this._storeRedirectParamsIfAvailable();
    if (this.props.userData.token) {
      // Already logged in
      this.props.history.replace("/");
    }
    this.props.showLoader("Loading");
    setTimeout(() => {
      this.props.hideLoader();
    }, 500);
  }

  _storeRedirectParamsIfAvailable = () => {
    const { location } = this.props;
    if (location.extras) {
      this.setState({
        redirectTo: location.extras.pathname + location.extras.search
      }, () => {
        if (location.extras.pathname !== '' && location.extras.pathname !== '/') {
          showToast('Please login first to continue');
        }
      });
    }
  };

  _markAsDirty = fieldName => {
    const { formFields } = this.state;
    formFields[fieldName].isDirty = true;
    this.setState({ formFields });
    this._validateForm();
  };

  _updateFieldValue = (fieldName, value) => {
    const { formFields } = this.state;
    formFields[fieldName].value = value;
    this.setState({ formFields });
    if (formFields[fieldName].isDirty) {
      // Validate
      this._validateForm();
    }
  };

  _validateForm = () => {
    const { formFields } = this.state;
    let isFormValid = true;
    Object.keys(formFields).forEach((fieldName, index) => {
      switch (fieldName) {
        case "email": {
          var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (emailRegex.test(String(formFields.email.value).toLowerCase())) {
            formFields.email.isValid = true;
          } else {
            formFields.email.isValid = false;
            isFormValid = false;
          }
          break;
        }
        case "password": {
          if (formFields.password.value.length >= 5) {
            formFields.password.isValid = true;
          } else {
            formFields.password.isValid = false;
            isFormValid = false;
          }
          break;
        }
      }
    });
    this.setState({ formFields, isFormValid });
  };

  _makeAllFieldDirty = () => {
    const { formFields } = this.state;
    Object.keys(formFields).forEach((fieldName, index) => {
      formFields[fieldName].isDirty = true;
    });
  };

  _validateAndSubmit = async e => {
    e.preventDefault();
    const { formFields, isFormValid, redirectTo } = this.state;
    this._makeAllFieldDirty();
    this._validateForm();
    console.log('log')
    if (isFormValid) {
      try {
        console.log('2')
        this.props.showLoader("Logging you in");
        const loginResponse = await login({
          email: formFields.email.value,
          password: formFields.password.value
        });
        // Login success
        this.props.updateUserData(loginResponse);
        this.props.hideLoader();
        // Success login
        // First check if any redirect required
        if (redirectTo) {
          this.props.history.replace(redirectTo);
        } else {
          this.props.history.replace("/");
        }
      } catch (loginError) {
        this.props.hideLoader();
        showToast(loginError.reason? loginError.reason: 'Login server error', "error");
      }
    }
  };

  render() {
    const { formFields } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <h1>Demo Login</h1>
          <form onSubmit={e => this._validateAndSubmit(e)}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="field"
              value={formFields.email.value}
              onChange={e => this._updateFieldValue("email", e.target.value)}
              onBlur={() => this._markAsDirty("email")}
            />
            {formFields.email.isDirty && !formFields.email.isValid ? (
              <div className="field-error-wrapper">Invalid Email</div>
            ) : null}
            <input
              type="password"
              placeholder="password"
              className="field"
              name="password"
              value={formFields.password.value}
              onChange={e => this._updateFieldValue("password", e.target.value)}
              onBlur={() => this._markAsDirty("password")}
            />
            {formFields.password.isDirty && !formFields.password.isValid ? (
              <div className="field-error-wrapper">Invalid Password</div>
            ) : null}
            <input type="submit" value="login" className="btn" />
          </form>
          <div className="pass-link"></div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLoader: text => dispatch(showLoader(text)),
    hideLoader: () => dispatch(hideLoader()),
    updateUserData: userData => dispatch(updateUserData(userData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
