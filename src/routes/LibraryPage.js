import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Grid, CircularProgress, Box, AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BooksCard from "../components/booksCard.js";
import { getBookData, getBooksData } from "../redux/actions/booksActions.js";

function LibraryPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const booksLoading = useSelector(state => state.books.loadingBooks)
    const books = useSelector(state => state.books.books)

    useEffect(() => {
        dispatch(getBooksData())
    }, [])

    const handleBookClick = event => {
        navigate(`../book/${event}`, { replace: true })
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
            <AppBar position="static" >
                <Toolbar>
                    <Button 
                    onClick={() => navigate('/') }
                    style={{textTransform: 'none'}}
                    color="inherit">
                        <Typography
                            variant="h4"
                        >
                            Library
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <Box >
                {booksLoading ?
                    <CircularProgress />
                    : books.map(book => <BooksCard style={{ margin: '30px' }} book={book} onClick={handleBookClick} />)}
            </Box>
        </Grid>
    )

}

export default LibraryPage