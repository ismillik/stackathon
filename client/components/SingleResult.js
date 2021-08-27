import React from 'react';
import { connect } from 'react-redux';
import { getStreamResults } from '../store/infoCalls';
import { Link } from 'react-router-dom';

class SingleResult extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        const { match } = this.props;
        if (match.params.id) {
            this.props.getStreamResults(match.params.id);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getStreamResults(this.props.match.params.id);
        }
    }

    render() {
        // console.log('These are the SINGLE props', this.props)
        if (!Object.keys(this.props.stream).length) {
            return (
                <div id="content-wrapper">
                    <h4>Loading your data...</h4>
                </div>
            )
        }
        const { stream } = this.props;
        const rating = stream.imdbRating/10;
        const cast = stream.cast.join(', ');
        const significants = stream.significants.join(', ');
        const posterURL = stream.posterURLs[342];
        const streamingInfo = stream.streamingInfo;
        let streamingKeys = [];
        if (streamingInfo) {
            streamingKeys = Object.keys(streamingInfo);
        };
        let seasons = 0;
        if(stream.seasons) {
            seasons = stream.seasons;
        }

        return (
            <div id='view'>
                <div id='content-wrapper'>
                    <div id='title-block'>
                        <h1>{stream.originalTitle}</h1>
                        <div id='title-details'>                          
                            <p>{stream.year}</p>
                            <p>{stream.runtime || stream.episodeRuntimes[0]} Minutes</p>
                            <p><img src='/images/star.png'id='star'/>IMDb Rating <strong>{rating}</strong>/10</p>
                        </div>
                    </div>
                    <div id = 'content-block'>
                        <div id='left'>
                            <img src={posterURL}/>
                            <p><i>{stream.tagline}</i></p>
                        </div>
                        <div id='right'>
                            <p><strong>Starring</strong>   {cast}</p>
                            <p><strong>Directed/Produced</strong>   {significants}</p>
                            {seasons ? (
                                <p><strong>Seasons</strong>   {seasons}</p>
                            ):(
                                <span></span>
                            )}  
                            <p>{stream.overview}</p>
                            <a href={`https://www.imdb.com/title/${stream.imdbID}`} target= '_blank'>
                                <p><img src='/images/imdb.png'id='imdb'/> View IMDb.</p>
                            </a>
                            
                        </div>
                        <div id='streaming-block'>
                            <h3>Availability</h3>
                            {streamingKeys.length ? (
                                <div id='stream-on'>
                                    <h4>Stream Now On</h4>
                                    <ul>
                                        {streamingKeys.map((service, idx) => {
                                            return (
                                            <li key= {idx}>
                                                <div>
                                                    <a href= {streamingInfo[service].us.link} target= '_blank'>
                                                        <img src={`/images/${service}.jpeg`} className= 'streaming-logo'/>
                                                    </a>  
                                                </div>
                                            </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            ) : (
                                <div id='stream-on-sorry'>
                                    <h5><i>Sorry! This title is not available on streaming services in your area. Try a new Search.</i></h5>
                                    <Link to = '/home'>
                                        <button>Back to Search</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>                   
                </div>
            </div>
  
        )
    }
  }
  
  const mapStateToProps = (state) => {
    const stream = state.stream || {};
    return {
        stream
    }
  }
  
  const mapDispatchToProps = (dispatch) => ({
    getStreamResults: (id) => dispatch(getStreamResults(id))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleResult);