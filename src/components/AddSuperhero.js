import React, { useState } from "react";
import { Box, TextField, Button, Typography } from '@material-ui/core';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Fab from '@mui/material/Fab';
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
            <TextField id="nickname" label="Nickname" variant="standard" onChange={handleInputChange} />
            <TextField id="real_name" label="Real name" variant="standard" onChange={handleInputChange} />
            <TextField id="origin_description" label="Origin description" variant="standard" onChange={handleInputChange} />
            <TextField id="superpowers" label="Superpowers" variant="standard" onChange={handleInputChange} />
            <TextField id="catch_phrase" label="Catch phrase" variant="standard" onChange={handleInputChange} />
            <label htmlFor="mainImage">
                <input
                    style={{ display: 'none' }}
                    id="mainImage"
                    name="mainImage"
                    type="file"
                    onChange={handleMainImageUpload}
                />

                <Fab
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                >
                    <ImageSearchIcon />  Upload main image
                </Fab>
            </label>
            <ImagesDropzone onDrop={handleImagesUpload} />
            {formValues.images.length !== 0 ?
                <>
                    <Typography color="primary">Images:</Typography>
                    <DisplayImagesFilenames images={formValues.images} onDelete={handleImageDelete} />
                </>
                : null
            }
            <Button
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
            >
                Submit
            </Button>
        </Box>
    )
}

export default AddSuperhero