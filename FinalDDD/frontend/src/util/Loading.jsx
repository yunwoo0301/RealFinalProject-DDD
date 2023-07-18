import styled from 'styled-components';
import { Box, CircularProgress } from '@mui/material';

const Container = styled.div`
    background-color: transparent;
    position: absolute;
    top: ${props => props.top || '0%'};
    left: ${props => props.left || '0%'};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loading = ({ top, left }) => {
    return (
        <Container top={top} left={left}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </Container>
    );
};

export default Loading;
