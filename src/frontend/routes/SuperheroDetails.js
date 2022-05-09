import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, CircularProgress } from '@material-ui/core';
import AppHeader from "../components/AppHeader.js"
import EditSuperhero from '../components/EditSuperhero.js'
import SuperheroFormatter from "../components/SuperheroFormatter.js";
import { getSuperheroData, deleteSuperheroData, editSuperheroData } from "../redux/actions/superheroesActions.js";

function SuperheroDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editSuperheroActive, setEditSuperheroActive] = useState(false)
    const fetchingSuperhero = useSelector(state => state.superheroes.fetchingSuperhero)
    const deletingSuperhero = useSelector(state => state.superheroes.deletingSuperhero)
    const editingSuperhero = useSelector(state => state.superheroes.editingSuperhero)
    const superhero = useSelector(state => state.superheroes.superhero)
    const { id } = useParams()

    useEffect(() => {
        if(!editingSuperhero){
            dispatch(getSuperheroData(id))
        }
    }, [id, editingSuperhero])

    useEffect(() => {
        if(deletingSuperhero){
            navigate('/')
        }
    }, [deletingSuperhero])

    const handleEditClick = ()=>{
        setEditSuperheroActive(!editSuperheroActive)
    }

    const handleSuperheroEdit = data => {
        setEditSuperheroActive(false)
        dispatch(editSuperheroData(superhero.id, data))
    }

    const handleSuperheroDelete = id => {
        dispatch(deleteSuperheroData(id))
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
            <AppHeader/>
            <Box sx={{ mt: 9 }}>
                {fetchingSuperhero ?
                    <CircularProgress />
                    : editSuperheroActive ?
                    <EditSuperhero superhero={superhero} onSubmit={handleSuperheroEdit} onCancelClick={handleEditClick}/>
                    :<SuperheroFormatter superhero={superhero} onDelete={handleSuperheroDelete} onEditClick={handleEditClick}/>}
            </Box>
        </Grid>
    )

}

export default SuperheroDetails