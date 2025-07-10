import { Container, Typography, Box, Card, CardContent, Chip, Grid } from "@mui/material";

const pedidosModelo = [
    { id: 1, cliente: "João Silva", status: "Pendente", total: 150.00, data: "2024-01-15" },
    { id: 2, cliente: "Maria Santos", status: "Enviado", total: 280.50, data: "2024-01-14" },
    { id: 3, cliente: "Carlos Lima", status: "Entregue", total: 95.75, data: "2024-01-13" },
    { id: 4, cliente: "Ana Costa", status: "Pendente", total: 320.00, data: "2024-01-12" },
    { id: 5, cliente: "Pedro Oliveira", status: "Enviado", total: 210.25, data: "2024-01-11" },
];

export default function Dashboard() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                minHeight: '100vh',
                py: 4 
            }}>
                <Typography variant="h4" gutterBottom>
                    Dashboard
                </Typography>
                
                <Box sx={{ width: '100%', maxWidth: 800 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Pedidos Recentes
                    </Typography>
                    
                    <Grid container spacing={2}>
                        {pedidosModelo.map((pedido) => (
                            <Grid item xs={12} key={pedido.id}>
                                <Card sx={{ width: '100%' }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="h6">
                                                    Pedido #{pedido.id}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    {pedido.cliente}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {pedido.data}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Chip 
                                                    label={pedido.status}
                                                    color={
                                                        pedido.status === 'Entregue' ? 'success' :
                                                        pedido.status === 'Enviado' ? 'primary' : 'warning'
                                                    }
                                                    sx={{ mb: 1 }}
                                                />
                                                <Typography variant="h6">
                                                    R$ {pedido.total.toFixed(2)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}