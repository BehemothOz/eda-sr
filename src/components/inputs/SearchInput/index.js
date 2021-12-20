import { useEffect } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from 'hooks/useDebounce';

export const SearchInput = props => {
    const { onSetParams } = props;

    const onSearch = event => event.preventDefault();

    const handleChange = event => {
        const { name, value } = event.target;
        onSetParams({ [name]: value });
    };

    const debounceChange = useDebounce(handleChange, 500);

    useEffect(() => {
        return () => {
            debounceChange.clear();
        };
    }, [debounceChange]);

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            onSubmit={onSearch}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                name="query"
                placeholder="Search.."
                inputProps={{ 'aria-label': 'search tasks' }}
                onChange={debounceChange}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};
