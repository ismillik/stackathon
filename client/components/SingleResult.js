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
        const director = stream.significants[0];
        const posterURL = stream.posterURLs[342];
        const streamingInfo = stream.streamingInfo;
        let streamingKeys = [];
        if (streamingInfo) {
            streamingKeys = Object.keys(streamingInfo);
        };

        return (
            <div id='content-wrapper'>
                <div id='title-block'>
                    <h3>{stream.originalTitle}</h3>
                    <div id='title-details'>
                        <h5>
                            <span>{stream.year}</span>
                            <span>{stream.runtime} Minutes</span>
                            <span>IMDb Rating: {rating}/10</span>
                        </h5>
                    </div>
                    
                </div>
                <div id='img-block'>
                    <img src={posterURL}/>
                    <p>{stream.tagline}</p>
                </div>
                <div id='text-block'>
                    <p>Starring: {cast}</p>
                    <p>Director/Producer {director}</p>
                    
                    <p>{stream.overview}</p>
                </div>
                <div id='streaming-block'>
                    <h3>Streaming Availability</h3>
                    {streamingKeys.length ? (
                        <div>
                            <h4>Watch Now</h4>
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
                        <div>
                            <h4>Sorry! This title is not available on streaming services in your area. Try a new Search.</h4>
                        </div>
                    )}
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