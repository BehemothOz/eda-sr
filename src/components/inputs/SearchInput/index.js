import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { useDebounce } from 'hooks/useDebounce';

const someAsyncFunction = params => {
    console.log('i am called with', params)
}

export function SearchInput() {
    const onSearch = event => event.preventDefault();

    const handleChange = event => {
        someAsyncFunction(event.target.value)
    }

    const debounceChange = useDebounce(handleChange, 500);

    useEffect(() => {
        return () => {
            debounceChange.clear();
        }
    }, [debounceChange])

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            onSubmit={onSearch}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search.."
                inputProps={{ 'aria-label': 'search tasks' }}
                onChange={debounceChange}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
