import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImdbResults, getStreamResults } from '../store/infoCalls';

class Results extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (!this.props.imdb.length) {
      return (
        <div id="content-wrapper">
          <div id='message'>
            <h4>Hmm... that doesn't seem to be working.</h4>
            <h4>Please try a new search!</h4>
            <Link to = '/home'>
              <button>Back to Search</button>
            </Link>
          </div>
        </div>
      )
    }
    const { imdb } = this.props;  
    return (
      <div id="content-wrapper">
        <div id='imdbList'>
          <h3>What are you looking for?</h3>
          <ul id='result-list'>
              {imdb.map((result) => {
                return (
                  <li key= {result.imdb_id} className='result'>
                    <Link to= {`/results/${result.imdb_id}`}>
                        <p><strong>{result.title}</strong> ({result.year || result.release_date.slice(0,4)})</p>
                    </Link>
                    <div className='result-info'>
                      <a href={`https://www.imdb.com/title/${result.imdb_id}`} target= '_blank'>
                        <p><img src='/images/star.png'id='star-result'/> View IMDb.</p>
                      </a> 
                    </div>
                  </li>
                )
              })}
          </ul>
          <Link to = '/home'>
            <button>Back to Search</button>
          </Link>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const imdb = state.imdb || [];
  return {
    imdb
  }
}

const mapDispatchToProps = (dispatch, {history}) => ({
  getImdbResults: (title, type) => dispatch(getImdbResults(title, type, history)),
  getStreamResults: (id) => dispatch(getStreamResults(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);