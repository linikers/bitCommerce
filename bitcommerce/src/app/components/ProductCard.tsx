import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

interface Produto {
    id: number,
    nome: string,
    preco: string,
    img: string,
}

export default function ProductCard({ produto}: {produto: Produto}) {

    return (
        <Card>
            <CardMedia component="img" height="140" image={produto.img} />
                <CardContent>
                    <Typography>
                        {produto.nome}
                    </Typography>
                    <Typography variant="body2">
                        {produto.preco}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button>
                        Comprar
                    </Button>
                </CardActions>
            {/* </CardMedia> */}
        </Card>
    )
}