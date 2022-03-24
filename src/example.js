import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import queryString from "query-string";

export default function QueryParamsExample() {
  return (
    <Router>
      <HashParamsDemo />
      <Switch>
        {/* conditionally render based on the path: aka routing */}
        <Route path="/bots/" component={Bots} exact />
      </Switch>
    </Router>
  );
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  // return new URLSearchParams(useLocation().search);
  return queryString.parse(useLocation().hash);
}

function HashParamsDemo() {
  let query = useQuery();

  return (
    <div>
      <div>
        <h2>Categories</h2>
        <ul>
          <li>
            <Link to="/heading?#category=inoperation">Netflix</Link>
          </li>
          <li>
            <Link to="/heading?#category=outofoperation">Prime</Link>
          </li>
          <li>
            <Link to="/bots?#category=inoperation">Inoperation</Link>
          </li>
          <li>
            <Link to="/bots?#category=outofoperation">OutofOperation</Link>
          </li>
        </ul>

        <Child name={query.category} />
      </div>
    </div>
  );
}

// render based on the passed in name, which is the category we pulled out the hash as thoug it was a query str
function Child({ name }) {
  return (
    <div>
      {name ? (
        <h3>
          The <code>name</code> in the query string is &quot;{name}
          &quot;
        </h3>
      ) : (
        <h3>There is no name in the query string</h3>
      )}
    </div>
  );
}

function Bots() {
  let query = useQuery();

  return <p> Conditionally render based on category here: {query.category} </p>;
}
