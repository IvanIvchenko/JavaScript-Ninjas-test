import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';

function BookCard({book, onClick}) {
    const handleClick = () =>{
        return onClick(book.id) 
    }
    return (
        <Card sx={{ width: 500, m: 2 }} key={book.title}>
            <CardActionArea id={book.id} onClick={handleClick}>
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
                        {book.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default BookCard