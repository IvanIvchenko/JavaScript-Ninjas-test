import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

function SuperheroFormatter({ superhero, onDelete, onEditClick }) {

    const handleDeleteClick = () => {
        return onDelete(superhero.id)
    }

    const handleEditClick = () => {
        return onEditClick(superhero)
    }

    return !superhero ?
        <Typography gutterBottom variant="h5" color="primary" >
            Superhero with such id was not found!
        </Typography>
        : (
            <Card sx={{ width: 1000, m: 1 }} >
                <ImageList sx={{ maxheight: 400 }} cols={3} gap={3} rowHeight={400}>
                <ImageListItem key={superhero.mainImage}>
                            <img
                                style={{
                                    maxHeight: '100%',
                                    maxWidth: "100%",
                                    minHeight: '100%',
                                    minWidth: "20%"
                                }}
                                src={superhero.mainImage}
                                alt={superhero.mainImage}
                            />
                        </ImageListItem>
                    {superhero.images.map((item) => (
                        <ImageListItem key={item}>
                            <img
                                style={{
                                    maxHeight: '100%',
                                    maxWidth: "100%",
                                    minHeight: '100%',
                                    minWidth: "20%"
                                }}
                                src={item}
                                alt={item}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                <CardContent>
                    <Grid
                        container direction="row"
                        justify="space-between"
                        alignItems="center"
                        wrap="nowrap"
                    >
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h5" color="text.primary">
                                {superhero.nickname}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={handleEditClick}>
                                <CreateIcon
                                    style={{ fontSize: "large" }}
                                    sx={{ "&:hover": { color: "green" } }}
                                />
                            </IconButton>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={handleDeleteClick}>
                                <DeleteIcon
                                    style={{ fontSize: "large" }}
                                    sx={{ "&:hover": { color: "red" } }}
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="text.secondary">
                        Real name: {superhero.real_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Origin description: {superhero.origin_description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Superpowers: {superhero.superpowers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Catch phrase: {superhero.catch_phrase}
                    </Typography>
                </CardContent>
            </Card >
        )
}

export default SuperheroFormatter