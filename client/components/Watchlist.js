import React from 'react';
import { Link } from 'react-router-dom'

const Watchlist = () => {

  return (
    <div id='content-wrapper'>
        <div id='message'>
            <h4>Coming soon!</h4>
            <Link to = '/home'>
              <button>Back to Search</button>
            </Link>
          </div>
        </div>

  );
};

export default Watchlist;
