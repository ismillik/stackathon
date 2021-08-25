import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Results = ({ imdb }) => {
    return (
      <div id="content-wrapper">
        <div id='imdbList'>
            <h2>What are you looking for?</h2>

            <ul>
                {imdb.map((result) => {
                    return (
                        <li key= {result.imdb_id}>
                            <Link to= {`/results/${result.imdb_id}`}>
                                <div>
                                    <h4>{result.title}</h4>
                                    <p>Year: {result.year}</p>
                                </div>
                            </Link>
                            <p><a href={`https://www.imdb.com/title/${result.imdb_id}`} target= '_blank'>View on imdb.</a></p>
                        </li>
                    );
                })}
            </ul>
            <Link to = '/home'>
                <button>Back to Search</button>
            </Link>
        </div>
      </div>
    );
};


const mapStateToProps = ({ imdb }) => {
  return {
    imdb
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  getImdbResults: (title, type) => dispatch(getImdbResults(title, type, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);