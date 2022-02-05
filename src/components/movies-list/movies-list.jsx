import React from 'React';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card'
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()))
    }

    if (!movies) return <div className='main-view' />


    return <>
        <Row className="justify-content-center">
            <Col md={12} style={{ margin: '1em' }}>
                <VisibilityFilterInput visibilityFilter={visibilityFilter}
                />
            </Col>
        </Row>

        <Row className="justify-content-center" >
            {filteredMovies.map(m => (
                <Col md={3} key={m._id}>
                    <MovieCard movies={m} />
                </Col>

            ))}
        </Row>
    </>
}

export default connect(mapStateToProps)(MoviesList);
