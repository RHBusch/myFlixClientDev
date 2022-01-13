import React from 'react';
import './movie-view'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './movie-view.scss'





export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body className="cardBodyStyle">
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={() => onBackClick(null)} variant="link">Back</Button>
                </Card.Body>


            </Card>
        )
        // ^^^ The onBackClick button above will need to have new code added to actually point it in a direction. 

    }
}