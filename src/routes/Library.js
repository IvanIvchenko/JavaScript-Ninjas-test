import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Grid, CircularProgress, Box, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppHeader from "../components/AppHeader.js"
import BookCard from "../components/BookCard.js";
import AddBook from "../components/AddBook.js";
import { getBooksData, createBookData } from "../redux/actions/booksActions.js";

function Library() {
    const [addBookActive, setAddBookActive] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchingBooks = useSelector(state => state.library.fetchingBooks)
    const creatingBook = useSelector(state => state.library.creatingBook)
    const books = useSelector(state => state.library.books)

    useEffect(() => {
        if(!creatingBook){
            dispatch(getBooksData())
        }
    }, [creatingBook])

    const handleBookCreation = event => {
        dispatch(createBookData(event))
        setAddBookActive(!addBookActive)
    }

    const handleBookClick = id => {
        navigate(`../book/${id}`)
    }

    return (
        <Grid
            container
            style={{
                color: "lightblue",
                width: "100%",
                height: '100%'
            }}
            justifyContent="center"
            direction="column"
            alignItems="center"
        >
            <AppHeader />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ mt: 9 }}
            >
                <IconButton onClick={(() => setAddBookActive(!addBookActive))}>
                    <AddCircleOutlineIcon style={{ fontSize: "50" }} />
                </IconButton>
                {addBookActive ?
                    <AddBook onFormSubmit={handleBookCreation} />
                    : null
                }
                {fetchingBooks ?
                    <CircularProgress />
                    : books.map(book => <BookCard style={{ margin: '30px' }} book={book} onClick={handleBookClick} />)
                }
            </Box>
        </Grid>
    )

}

export default Library