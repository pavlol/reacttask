import React, {Component} from 'react';
import {Card} from 'react-bootstrap';

class Book extends Component{

    render(){
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{this.props.bookTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.bookAuthor}</Card.Subtitle>
                    <Card.Text>{this.props.bookPublicationCity}</Card.Text>
                    <Card.Text>{this.props.bookPublicationCountry}</Card.Text>
                    <Card.Text>{this.props.bookPublicationYear}</Card.Text>
                    <Card.Text>{this.props.bookPages}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default Book;