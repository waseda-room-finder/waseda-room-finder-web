import PropTypes from "prop-types";
import React from "react";
import { Authenticator } from "aws-amplify-react";
import { Provider } from "react-redux";
import ReactGA from "react-ga";
import { Route, BrowserRouter } from "react-router-dom";
import debounce from "lodash/debounce";

import App from "./App";

// A invisible component that sends a GA pageview every time
// the pathname of the user is changed.
// Written by @dandalf and improved by @ianarundale and @jessepinho.
// Reference: https://github.com/react-ga/react-ga/issues/122#issuecomment-353101102
class Analytics extends React.Component {
  componentDidMount() {
    this.sendPageChange(
      this.props.location.pathname,
      this.props.location.search
    );
  }

  componentDidUpdate(prevProps) {
    const prevPathname = prevProps.location.pathname;
    const thisPathname = this.props.location.pathname;
    const prevSearch = prevProps.location.search;
    const thisSearch = this.props.location.search;

    if (prevPathname !== thisPathname) {
      this.sendPageChange(thisPathname, thisSearch);
    } else {
      if (
        prevSearch !== thisSearch &&
        thisSearch !== "" &&
        thisPathname === "/syllabus"
      ) {
        this.debounceSendPageChange(thisPathname, thisSearch);
      }
    }
  }

  sendPageChange(pathname, search) {
    const page = pathname + search;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }

  debounceSendPageChange = debounce(this.sendPageChange, 2000, {
    leading: false,
  });

  render() {
    return null;
  }
}

const federatedConfig = {
  google_client_id:
    "184356976101-9r6g0till2pt58h45qvc4hp5slhmdtab.apps.googleusercontent.com",
};

const Root = ({ store }) => {
  // production -> UA-112185819-1, staging -> UA-112185819-4, dev/others -> UA-112185819-3
  let trackingId;
  let debug = false;
  if (process.env.NODE_ENV === "production") {
    trackingId =
      process.env.REACT_APP_ENV === "staging"
        ? "UA-112185819-4"
        : "UA-112185819-1";
  } else {
    trackingId = "UA-112185819-3";
    debug = true;
  }

  ReactGA.initialize(trackingId, { debug: debug, titleCase: false });
  const analyticsRoute = <Route path="/" component={Analytics} />;
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Authenticator federated={federatedConfig}>
            {analyticsRoute}
            <App />
          </Authenticator>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
