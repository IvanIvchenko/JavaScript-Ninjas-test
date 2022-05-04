import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import CreateIcon from '@mui/icons-material/Create';

function BookFormatter({ book, onDelete }) {

    const handleDeleteClick = () => {
        return onDelete(book.id)
    }

    return !book ?
        <Typography gutterBottom variant="h5" color="primary" >
            Book with such id was not found!
        </Typography>
        : (
            <Card sx={{ width: 500, m: 2 }} >
                <CardMedia
                    component="img"
                    height="140"
                    image={book.image}
                    alt={book.title}
                />
                <CardContent>
                    <Grid 
                    container direction="row" 
                    justify="space-between" 
                    alignItems="center" 
                    wrap="nowrap"
                    >
                        <Grid item xs={24}>
                            <Typography gutterBottom variant="h5" color="text.primary">
                                {book.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton onClick={handleDeleteClick}>
                                <CreateIcon
                                    style={{ fontSize: "large" }}
                                    sx={{ "&:hover": { color: "green" } }}
                                />
                            </IconButton>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={handleDeleteClick}>
                                <BlockIcon
                                    style={{ fontSize: "large" }}
                                    sx={{ "&:hover": { color: "red" } }}
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="text.secondary">
                        Description: {book.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Author: {book.bookData.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Year: {book.bookData.year_written}
                    </Typography>
                </CardContent>
            </Card >
        )
}

export default BookFormatter