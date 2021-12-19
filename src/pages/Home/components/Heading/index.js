import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { SearchInput } from 'components/inputs/SearchInput';
import { TaskFilter } from '../Filter';

const updateParams = newParams => previousParams => ({ ...previousParams, ...newParams });

export const Heading = props => {
    const { onCreate, getTasks } = props;

    const [params, setParams] = useState({});

    useEffect(() => {
        getTasks(params);
    }, [getTasks, params]);

    const onSetParams = values => {
        setParams(updateParams(values));
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end', padding: 16, backgroundColor: '#e8e8e8' }}>
                <Button variant="contained" style={{ marginRight: 16 }} onClick={onCreate}>
                    Create
                </Button>
                <SearchInput onSetParams={onSetParams} />
            </div>

            <TaskFilter onSetParams={onSetParams} />
        </>
    );
};
