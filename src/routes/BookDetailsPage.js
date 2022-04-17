import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, CircularProgress, Box, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookFormatter from "../components/bookFormatter.js";
import { getBookData } from "../redux/actions/booksActions.js";

function BookDetailsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookLoading = useSelector(state => state.books.loadingBook)
    const book = useSelector(state => state.books.book)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getBookData(id))
    }, [id])

    return (
        <Grid
            container
            style={{
                color: "lightblue",
                width: "100%",
                height: '100%'
            }}
            direction="column"
            alignItems="center"
        >
            <AppBar position="static" >
                <Toolbar >
                    <IconButton
                        onClick={() => navigate('/library')}
                        color="inherit"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Button
                        onClick={() => navigate('/')}
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
            {bookLoading ?
                <CircularProgress />
                : <BookFormatter book={book} />}
        </Grid>
    )

}

export default BookDetailsPage