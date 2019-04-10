import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter } from 'react-router-dom';
import {Button, Container, Row, Col, Badge,Pagination, PageItem } from 'react-bootstrap';
import Book from '../components/Book';
import * as text from '../text/EN/en-gb';

class BooksContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            itemsPerPage: 20,
            filters: [],
            books: [],
            totalBookCount : 0
        }
    }

    loadData = () => {
        axios.post('http://nyx.vima.ekt.gr:3000/api/books', 
        {
            page: this.props.match.params.page,
            itemsPerPage: 20,
            filters: []
        }).then((response) => {
            console.log('response');
            console.log(response);
            if(response.data.books){
                this.updateBooks(response.data);
            }
        });
    }

    updateBooks = (fetchedBooks) => {
        this.setState({ books: fetchedBooks.books, totalBookCount : fetchedBooks.count });
    }

    handleNextPageClick = () => {
        if(+this.props.match.params.page > 0){
            const newPageNumber = +this.props.match.params.page + 1
            this.props.history.push(newPageNumber.toString());
            this.props.match.params = {page : newPageNumber};
            this.loadData();
        }
    }

    handleSpecificPageClick = (pageNumber) => {
            this.props.history.push(pageNumber.toString());
            this.props.match.params = {page : pageNumber};
            this.loadData();
    }

    handlePrevPageClick = () => {
        if (+this.props.match.params.page > 1){
            const newPageNumber = +this.props.match.params.page - 1
            this.props.history.push(newPageNumber.toString());
            this.props.match.params = {page : newPageNumber};
            this.loadData();
        }
    }

    componentWillMount(props){
       if(Number.isInteger(+this.props.match.params.page)){
           this.loadData();
        }
    }


    render(){
        let bookList = [];
        bookList = this.state.books.map(function(item, i){
            return (
                <li key={item.id}>
                    <Book
                        bookId={item.id}
                        bookTitle={item.book_title}
                        bookAuthor={item.book_author}
                        bookPublicationCity={item.book_publication_city}
                        bookPublicationCountry={item.book_publication_country}
                        bookPublicationYear={item.book_publication_year}
                        bookPages={item.book_pages}
                    ></Book>
                </li>
            );
        });

        const currentPage = +this.props.match.params.page;
        const lowerPageNumber =  currentPage < 11 ? 1 : currentPage - 10 ;
        const higherPageNumber = currentPage + 20;
        const lastPageNumber = (this.state.totalBookCount) ? Math.ceil(this.state.totalBookCount / this.state.itemsPerPage) : 1;
        return(
            <Container>
                <h4>{text.LIST_OF_BOOKS}</h4>
                <Pagination size='lg'>
                    <Pagination.First onClick={this.handleSpecificPageClick.bind(this, 1)}/>
                    <Pagination.Prev onClick={this.handlePrevPageClick}/>
                    <Pagination.Item onClick={this.handleSpecificPageClick.bind(this, lowerPageNumber)}>{lowerPageNumber}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item active>{currentPage}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item onClick={this.handleSpecificPageClick.bind(null, higherPageNumber)}>{higherPageNumber}</Pagination.Item>
                    <Pagination.Next onClick={this.handleNextPageClick}/>
                    <Pagination.Last  onClick={this.handleSpecificPageClick.bind(this, lastPageNumber)}/>
                </Pagination>
                <ul>
                     {bookList.length ? bookList : text.NO_DATA_FOUND}
                </ul>
            </Container>
        )
    }
}

export default withRouter(BooksContainer);