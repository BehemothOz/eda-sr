import { useRef } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

// TODO: move
import { api } from 'api';

export function SearchInput() {
    const inputRef = useRef();

    const onSearch = async event => {
        event.preventDefault();
        console.log('this is value from input-search:', inputRef.current.value);

        await api.s.searchQuery(inputRef.current.value);
    };

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            onSubmit={onSearch}
        >
            <InputBase
                inputRef={inputRef}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search.."
                inputProps={{ 'aria-label': 'search tasks' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
