/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import React from 'react';
import MdiIcon from '@mdi/react';
import styling from '../../styling/search.module.css';

import { useEffect, useState } from 'react';
import { mdiAlert, mdiMagnify } from '@mdi/js';
import { CoursePayload, useDebounce } from '../../../hooks';

import {
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';

export interface CourseSearchBarProps {
    setSuggestions: React.Dispatch<React.SetStateAction<CoursePayload[]>>;
}

export const CourseSearchBar: React.FC<CourseSearchBarProps> = ({ setSuggestions }) => {
    const [query, setQuery] = useState('');
    const [errored, setErrored] = useState(false);

    const debouncedQuery = useDebounce(query, 250);

    useEffect(() => {
        fetch(`/api/search`, {
            method: 'POST',
            body: JSON.stringify({
                input: debouncedQuery,
                advancedOpts: {},
                limit: -1
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                setErrored(true);
                setSuggestions([]);
                return;
            }

            setErrored(false);
            setSuggestions(res.courses);
        });
    }, [debouncedQuery]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setQuery('');
            setSuggestions([]);
            return;
        }

        setQuery(e.target.value);
    };

    return (
        <FormGroup>
            <InputGroup className='input-group-alternative mb-4'>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <span>
                            <MdiIcon
                                size="20px"
                                className={'text-gray cursor-pointer ' + (errored ? 'text-danger' : '')}
                                path={
                                    errored
                                        ? mdiAlert
                                        : mdiMagnify
                                }
                            />
                        </span>
                    </InputGroupText>
                </InputGroupAddon>
                <div className={styling.inputBoxRadius}>
                    <input
                        value={query}
                        type="text"
                        placeholder="Search for any course.."
                        className="form-control form-control-alternative"
                        onChange={e => onChange(e)}
                    />
                </div>
            </InputGroup>
        </FormGroup>
    )
}