import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, CircularProgress } from '@material-ui/core';
import AppHeader from "../components/AppHeader.js"
import BookFormatter from "../components/BookFormatter.js";
import { getBookData, deleteBookData } from "../redux/actions/booksActions.js";

function BookDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchingBook = useSelector(state => state.library.fetchingBook)
    const deletingBook = useSelector(state => state.library.deletingBook)
    const book = useSelector(state => state.library.book)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getBookData(id))
    }, [id])

    useEffect(() => {
        if(deletingBook){
            navigate('/library')
        }
    }, [deletingBook])

    const handleBookDelete = id => {
        dispatch(deleteBookData(id))
    }

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
            <AppHeader path='/library' />
            <Box sx={{ mt: 9 }}>
                {fetchingBook ?
                    <CircularProgress />
                    : <BookFormatter book={book} onDelete={handleBookDelete} />}
            </Box>
        </Grid>
    )

}

export default BookDetails