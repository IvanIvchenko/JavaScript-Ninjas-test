import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';

function BooksFormatter(props) {
    const book = props.book
    return !book ? null : (
        //<div key={book.id} className='book'>{book.title}</div>
        <Card sx={{ width: 500, m: 2 }} >
            <CardMedia
                component="img"
                height="140"
                image={book.image}
                alt={book.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" >
                    {book.title}
                </Typography>
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
        </Card>
    )
}

export default BooksFormatter