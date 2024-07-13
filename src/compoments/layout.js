import {
    createTheme,
    ThemeProvider,
} from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark', // 或 'dark'，根據你的需求
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ff4081',
        },
    },
});

export default function Layout({ children }) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <main>{children}</main>
            </ThemeProvider>
        </>
    )
}