import React, { useState } from "react";
import { Box, TextField, Button, } from '@material-ui/core';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Fab from '@mui/material/Fab';
import getFormDataFromObject from '../helpers/getFormDataFromObject.js'

function AddBook({ onFormSubmit }) {

    const defaultValues = {
        title: "",
        description: "",
        author: "",
        year_written: 0,
        image: null,
    };

    const [formValues, setFormValues] = useState(defaultValues)

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues({
            ...formValues,
            [id]: value,
        });
    };

    const handleImageUpload = (e) =>{
        setFormValues({
            ...formValues,
            image: e.target.files[0]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        return onFormSubmit(getFormDataFromObject(formValues))
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            display="flex"
            flexDirection="column"
            alignItems="center"
            onSubmit={handleSubmit}
        >
            <TextField id="title" label="Title" variant="standard" onChange={handleInputChange}/>
            <TextField id="description" label="Description" variant="standard" onChange={handleInputChange}/>
            <TextField id="author" label="Author" variant="standard" onChange={handleInputChange}/>
            <TextField
                id="year_written"
                label="Year Written"
                type='number'
                variant="standard"
                InputProps={{
                    inputProps: {
                        max: 2022, min: 0
                    }
                }}
                onChange={handleInputChange}
            />
            <label htmlFor="image">
                <input
                    style={{ display: 'none' }}
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageUpload}
                />

                <Fab
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                >
                    <ImageSearchIcon />  Upload image
                </Fab>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    type="submit"
                >
                    Submit
                </Button>
            </label>;
        </Box>
    )
}

export default AddBook