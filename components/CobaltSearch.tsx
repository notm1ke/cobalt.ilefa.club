import React from 'react';
import MdiIcon from '@mdi/react';
import Autosuggest from 'react-autosuggest';
import styling from './styling/search.module.css';
import IsolatedScroll from 'react-isolated-scroll';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCourseList } from '../hooks';
import { getIconForCourse } from '../util';
import { mdiLoading, mdiMagnify } from '@mdi/js';
import { FormGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { ChangeEvent, SuggestionSelectedEventData } from 'react-autosuggest';

export const CobaltSearch = () => {
    const router = useRouter();
    
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([] as string[]);
    
    const { data, isLoading, isError } = useCourseList();
    
    const onClear = () => setSuggestions([]);
    const onChange = (_: any, { newValue }: ChangeEvent) => setQuery(newValue);
    const onRequest = ({ value }: { value: string }) => setSuggestions(suggestFor(value));
    const onSelect = (_: any, { suggestionValue }: SuggestionSelectedEventData<string>) => {
        setLoading(true);
        router.push(`/course/${suggestionValue}`);
    }

    const suggestFor = (input: string) => {
        if (!data) return [];
        return data
            .courses
            .filter(course => course
                .toLowerCase()
                .slice(0, input.length) === input.toLowerCase())
    }

    const enabled = !isLoading && !isError;

    return (
        <FormGroup>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onRequest}
                onSuggestionsClearRequested={onClear}
                onSuggestionSelected={onSelect}
                getSuggestionValue={_ => _}
                renderInputComponent={inputProps => (
                    <>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <MdiIcon path={loading ? mdiLoading : mdiMagnify} spin={loading} size="20px" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <input {...inputProps} />
                    </>
                )}
                renderSuggestion={suggestion => <>{getIconForCourse(suggestion)} {suggestion}</>}
                renderSuggestionsContainer={({ containerProps, children }) => {
                    const { ref, ...restContainerProps } = containerProps;
                    const callRef = (isolatedScroll: any) => {
                        if (!!isolatedScroll)
                            ref(isolatedScroll.component);
                    }
                    
                    return (
                        <IsolatedScroll ref={callRef} {...restContainerProps}>
                            {children}
                        </IsolatedScroll>
                    )
                }}
                containerProps={{
                    className: "input-group-alternative mb-4 input-group"
                }}
                inputProps={{
                    value: query,
                    disabled: !enabled,
                    type: "text",
                    placeholder: "Begin typing..",
                    className: "form-control-alternative form-control",
                    onChange,
                }}
                theme={styling}
                id={'cobalt-search'}
            />
        </FormGroup>
    )
}