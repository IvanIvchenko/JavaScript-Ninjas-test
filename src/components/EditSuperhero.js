import React, { useState } from "react";
import { Box, TextField, Button, Typography } from '@material-ui/core';
import { Grid, Fab, ImageList, ImageListItem } from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import getFormDataFromObject from '../helpers/getFormDataFromObject.js'
import ImagesDropzone from './Dropzone.js'
import DisplayImagesFilenames from './DisplayImagesFilenames.js'

function EditSuperhero({ superhero, onSubmit, onCancelClick }) {

    const defaultValues = {
        nickname: superhero.nickname,
        real_name: superhero.real_name,
        origin_description: superhero.origin_description,
        superpowers: superhero.superpowers,
        catch_phrase: superhero.catch_phrase,
        mainImage: null,
        images: [],
    };

    const [formValues, setFormValues] = useState(defaultValues)

    const handleCancelClick = () => {
        return onCancelClick(superhero)
    }

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

    const handleImagesUpload = images => {
        setFormValues({
            ...formValues,
            images: [...formValues.images, ...images]
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
        console.log(formDataObject)
        return onSubmit(formDataObject)
    }
    console.log(formValues.mainImage)
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
                <Grid item>
                    {formValues.mainImage || formValues.images.length ?
                        <ImageList sx={{ maxheight: 400 }} cols={3} gap={3} rowHeight={400}>
                            {formValues.mainImage ?
                                <ImageListItem key={formValues.mainImage}>
                                    <img
                                        style={{
                                            maxHeight: '100%',
                                            maxWidth: "100%",
                                            minHeight: '100%',
                                            minWidth: "20%"
                                        }}
                                        src={URL.createObjectURL(formValues.mainImage)}
                                        alt="mainImage"
                                    />
                                </ImageListItem>
                                :null
                            }
                        {formValues.images.length ?
                            formValues.images.map((item) => (
                                <ImageListItem key={item}>
                                    <img
                                        style={{
                                            maxHeight: '100%',
                                            maxWidth: "100%",
                                            minHeight: '100%',
                                            minWidth: "20%"
                                        }}
                                        src={URL.createObjectURL(item)}
                                        alt="Image"
                                    />
                                </ImageListItem>
                            ))
                            : null
                        }
                </ImageList>
                : null 
                    }
            </Grid>
            <Grid item >
                <TextField
                    id="nickname"
                    label="Nickname"
                    variant="standard"
                    multiline
                    style={{ maxWidth: '300px', minWidth: '300px' }}
                    value={formValues.nickname}
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
                    value={formValues.real_name}
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
                value={formValues.origin_description}
                onChange={handleInputChange}
            />
            <TextField
                id="superpowers"
                label="Superpowers"
                variant="standard"
                multiline
                minRows={3}
                style={{ maxWidth: '100%', minWidth: '100%' }}
                value={formValues.superpowers}
                onChange={handleInputChange}
            />
            <TextField
                id="catch_phrase"
                label="Catch phrase"
                variant="standard"
                multiline
                minRows={3}
                style={{ maxWidth: '100%', minWidth: '100%' }}
                value={formValues.catch_phrase}
                onChange={handleInputChange}
            />
            <label htmlFor="mainImage">
                <input
                    style={{ display: 'none' }}
                    id="mainImage"
                    name="mainImage"
                    type="file"
                    onChange={handleMainImageUpload}
                />

                <Fab
                    style={{ maxWidth: '100%', minWidth: '100%' }}
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                >
                    <ImageSearchIcon />  Upload main image
                </Fab>
            </label>
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
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                wrap="nowrap"
                sx={{ m: 4 }}
            >
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        style={{ maxWidth: '150px', maxHeight: '30px', minWidth: '150px', minHeight: '30px' }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        style={{ maxWidth: '150px', maxHeight: '30px', minWidth: '150px', minHeight: '30px' }}
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Grid >
        </Box >
    )
}

export default EditSuperhero