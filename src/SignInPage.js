import React, { Component } from 'react';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { handleSignIn } = this.props;
    handleSignIn();
  };

  render() {
    const { username, password } = this.state;

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999
        }}
      >
        <div
          style={{
            backgroundColor: '#f2f2f2',
            padding: '20px',
            borderRadius: '4px',
            textAlign: 'center'
          }}
        >
          <h1>Welcome to Random User Generator</h1>
          <p>Please sign in to continue</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleInputChange}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  width: '200px',
                  margin: '10px'
                }}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  width: '200px',
                  margin: '10px'
                }}
              />
            </label>
            <br />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignInPage;


