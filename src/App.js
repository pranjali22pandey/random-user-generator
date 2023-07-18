import React, { Component } from 'react';
import SignInPage from './SignInPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      loading: false,
      items: [],
      showSubscribePopup: false,
      showCongratsPopup: false,
      generatedProfiles: 0
    };
  }

  fetchRandomUser = () => {
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((response) => {
        this.setState(
          (prevState) => ({
            items: [...prevState.items, response.results[0]],
            loading: false,
            generatedProfiles: prevState.generatedProfiles + 1
          }),
          () => {
            if (this.state.generatedProfiles === 5) {
              this.setState({ showSubscribePopup: true });
            }
          }
        );
      });
  };

  handleSignIn = () => {
    this.setState({ signedIn: true });
  };

  handleGenerateNewUser = () => {
    const { signedIn, generatedProfiles, showSubscribePopup } = this.state;

    if (!signedIn) {
      return;
    }

    if (showSubscribePopup) {
      return;
    }

    if (generatedProfiles >= 5) {
      this.setState({ showSubscribePopup: true });
      return;
    }

    this.setState({ loading: true }, this.fetchRandomUser);
  };

  handleLogout = () => {
    this.setState({
      signedIn: false,
      items: [],
      generatedProfiles: 0,
      showSubscribePopup: false,
      showCongratsPopup: false
    });
  };

  handleSubscribe = () => {
    this.setState({ showSubscribePopup: false, showCongratsPopup: true });
  };

  handleClosePopup = () => {
    this.setState({ showSubscribePopup: false, showCongratsPopup: false });
  };

  render() {
    const {
      signedIn,
      loading,
      items,
      showSubscribePopup,
      showCongratsPopup,
      generatedProfiles
    } = this.state;

    if (!signedIn) {
      return <SignInPage handleSignIn={this.handleSignIn} />;
    }

    return (
      <div
        style={{
          backgroundColor: '#f2f2f2',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <h1>Random User Generator</h1>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
          onClick={this.handleGenerateNewUser}
        >
          Generate New User
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={this.handleLogout}
        >
          Logout
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }}
          >
            {items.map((item) => (
              <div
                key={item.login.uuid}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                <button
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '5px',
                    backgroundColor: '#ccc',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => this.handleDeleteProfile(item.login.uuid)}
                >
                  Delete
                </button>
                <img
                  src={item.picture.medium}
                  alt={item.name.first}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginBottom: '10px'
                  }}
                />
                <p style={{ margin: '0' }}>
                  Name: {item.name.first} {item.name.last}
                </p>
                <p style={{ margin: '0' }}>Email: {item.email}</p>
                <p style={{ margin: '0' }}>
                  Location: {item.location.city}, {item.location.country}
                </p>
              </div>
            ))}
          </div>
        )}
        {showSubscribePopup && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              zIndex: 9999
            }}
          >
            <h2>Subscribe to PRO for unlimited generations</h2>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#ccc',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                marginRight: '10px'
              }}
              onClick={this.handleClosePopup}
            >
              Maybe Later
            </button>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: '#fff',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={this.handleSubscribe}
            >
              Sub to PRO
            </button>
          </div>
        )}
        {showCongratsPopup && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              zIndex: 9999
            }}
          >
            <h2>Congratulations, you are a PRO! 👑</h2>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: '#fff',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() =>
                this.setState({ showCongratsPopup: false, generatedProfiles: 0 })
              }
            >
              OK
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;

    