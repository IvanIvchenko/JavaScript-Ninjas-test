import React, { useState } from "react";
import { Box, TextField, Button, Typography } from '@material-ui/core';
import { Grid, Fab } from '@mui/material'
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import getFormDataFromObject from '../helpers/getFormDataFromObject.js'
import ImagesDropzone from './Dropzone.js'
import DisplayImagesFilenames from './DisplayImagesFilenames.js'

function AddSuperhero({ onFormSubmit }) {

    const defaultValues = {
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: "",
        catch_phrase: "",
        mainImage: null,
        images: [],
    };

    const [formValues, setFormValues] = useState(defaultValues)

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues({
            ...formValues,
            [id]: value,
        });
    };

    const handleMainImageUpload = (e) => {
        setFormValues({
            ...formValues,
            mainImage: e.target.files[0]
        })
    }

    const handleImagesUpload = upploadedImages => {
        setFormValues({
            ...formValues,
            images: [...formValues.images, ...upploadedImages]
        })
    }

    const handleImageDelete = value => {
        setFormValues({
            ...formValues,
            images: formValues.images.filter(image => image.name !== value)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formDataObject = getFormDataFromObject(formValues)
        return onFormSubmit(formDataObject)
    }
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Grid
                container
                sx={{
                    '& > :not(style)': { m: 2, width: '1000px' }
                }}
                display="flex"
                flexDirection="column"
                wrap="nowrap"
            >
                <Grid item >
                    <TextField
                        id="nickname"
                        label="Nickname"
                        variant="standard"
                        multiline
                        style={{ maxWidth: '300px', minWidth: '300px' }}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item >
                    <TextField
                        id="real_name"
                        label="Real name"
                        variant="standard"
                        multiline
                        style={{ maxWidth: '300px', minWidth: '300px' }}
                        onChange={handleInputChange}
                    />
                </Grid>
                <TextField
                    id="origin_description"
                    label="Origin description"
                    variant="standard"
                    multiline
                    minRows={3}
                    style={{ maxWidth: '100%', minWidth: '100%' }}
                    onChange={handleInputChange}
                />
                <TextField
                    id="superpowers"
                    label="Superpowers"
                    variant="standard"
                    multiline
                    minRows={3}
                    style={{ maxWidth: '100%', minWidth: '100%' }}
                    onChange={handleInputChange}
                />
                <TextField
                    id="catch_phrase"
                    label="Catch phrase"
                    variant="standard"
                    multiline
                    minRows={3}
                    style={{ maxWidth: '100%', minWidth: '100%' }}
                    onChange={handleInputChange}
                />
                <Grid item  style={{textAlign: "center"}}>
                <label htmlFor="mainImage">
                    <input
                        style={{ display: 'none' }}
                        id="mainImage"
                        name="mainImage"
                        type="file"
                        onChange={handleMainImageUpload}
                    />
                    <Fab
                        style={{ maxWidth: '50%', minWidth: '50%' }}
                        color="primary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                    >
                        <ImageSearchIcon />  Upload main image
                    </Fab>
                
                </label>
                </Grid>
                <Grid item >
                    <ImagesDropzone onDrop={handleImagesUpload} />
                    {formValues.images.length !== 0 ?
                        <>
                            <Typography style={{ color: "black" }}>Images:</Typography>
                            <DisplayImagesFilenames images={formValues.images} onDelete={handleImageDelete} />
                        </>
                        : null
                    }
                </Grid>
                <Grid item align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        type="submit"
                        style={{ maxWidth: '150px', maxHeight: '30px', minWidth: '150px', minHeight: '30px' }}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddSuperhero