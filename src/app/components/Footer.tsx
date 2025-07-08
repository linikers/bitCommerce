import { WhatsApp } from "@mui/icons-material";
import { Box, Container, IconButton } from "@mui/material";

export default function Footer() {

    return (
        <Box
            sx={{
                background: "#f5f5f5",
                py: 4,
                mt: 'auto'
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2
                    }}
                >
                    <IconButton color="primary">
                        <WhatsApp />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    )
}