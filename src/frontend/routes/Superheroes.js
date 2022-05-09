import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { Grid, CircularProgress, Box, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppHeader from "../components/AppHeader.js"
import SuperheroCard from "../components/SuperheroCard.js";
import AddSuperhero from "../components/AddSuperhero.js";
import { getSuperheroesData, createSuperheroData } from "../redux/actions/superheroesActions.js";
import setPage from '../helpers/setPage.js'

function Superheroes() {
    const [addSuperheroActive, setAddSuperheroActive] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pagesNumber = useSelector(state => state.superheroes.pagesNumber)
    const fetchingSuperheroes = useSelector(state => state.superheroes.fetchingSuperheroes)
    const creatingSuperhero = useSelector(state => state.superheroes.creatingSuperhero)
    const deletingSuperhero = useSelector(state => state.superheroes.deletingSuperhero)
    const superheroes = useSelector(state => state.superheroes.superheroes)

    useEffect(() => {
        const page = setPage(searchParams.get('page'), pagesNumber)
        dispatch(getSuperheroesData(page))
    }, [])

    useEffect(() => {
        if (!creatingSuperhero || !deletingSuperhero) {
            dispatch(getSuperheroesData())
        }
    }, [creatingSuperhero, deletingSuperhero])

    const handleSuperheroCreation = event => {
        setAddSuperheroActive(!addSuperheroActive)
        dispatch(createSuperheroData(event))
        window.location.reload(false)
    }

    const handleSuperheroClick = id => {
        navigate(`../superhero/${id}`)
    }

    const handlePageChange = (event, value) => {
        if (value === +searchParams.get('page')) {
            return
        } else {
            setSearchParams({ page: value })
            setAddSuperheroActive(false)
            dispatch(getSuperheroesData(value))
        }
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
                <IconButton onClick={(() => setAddSuperheroActive(!addSuperheroActive))}>
                    <AddCircleOutlineIcon style={{ fontSize: "50" }} />
                </IconButton>
                {addSuperheroActive ?
                    <AddSuperhero onFormSubmit={handleSuperheroCreation} />
                    : null
                }
                {fetchingSuperheroes ?
                    <CircularProgress />
                    : <>
                        {superheroes.map(superhero =>
                            <SuperheroCard
                                style={{ margin: '30px' }}
                                superhero={superhero}
                                onClick={handleSuperheroClick}
                            />
                        )}
                        {pagesNumber > 1 ?
                            < Pagination
                                count={pagesNumber}
                                page={searchParams.get('page')}
                                onChange={handlePageChange}
                                style={{ margin: '30px' }}
                                boundaryCount={2}
                                hidePrevButton
                                hideNextButton
                            />
                            : null
                        }
                    </>
                }
            </Box>
        </Grid>
    )

}

export default Superheroes