import React from 'react';
import MdiIcon from '@mdi/react';
import Autosuggest from 'react-autosuggest';
import styling from './styling/search.module.css';
import IsolatedScroll from 'react-isolated-scroll';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { CoursePayload, useCourseList } from '../hooks';
import { FormGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { ContentArea, getIconForCourse, isValidCourseName } from '../util';
import { ChangeEvent, SuggestionSelectedEventData } from 'react-autosuggest';

import {
    mdiAlert,
    mdiBeakerOutline,
    mdiFileDocumentEditOutline,
    mdiLoading,
    mdiMagnify,
    mdiNumeric1Box,
    mdiNumeric2Box,
    mdiNumeric3Box,
    mdiNumeric4Box,
    mdiNumeric4BoxMultiple
} from '@mdi/js';

type AttributeSymbol = {
    icon: string;
    color?: string;
    size?: string;
}

type Modifiers = 'ca1'
               | 'ca2'
               | 'ca3'
               | 'ca4'
               | 'ca4int'
               | 'lab'
               | 'w'
               | 'q'
               | 'e';

export const CobaltSearch = () => {
    const router = useRouter();

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [errored, setErrored] = useState(false);
    const [suggestions, setSuggestions] = useState([] as CoursePayload[]);
    
    const { data, isLoading, isError } = useCourseList();
    
    const onClear = () => setSuggestions([]);
    const onChange = (_: any, { newValue }: ChangeEvent) => setQuery(newValue);
    const onRequest = ({ value }: { value: string }) => setSuggestions(suggestFor(value));
    const onSelect = (_: any, { suggestionValue }: SuggestionSelectedEventData<CoursePayload>) => {
        setLoading(true);
        router.push(`/course/${suggestionValue}`);
    }

    const enabled = !isLoading && !isError;
    const predicates: ((input: string, course: CoursePayload) => boolean)[] = [
        (input, { name, catalogName }) => name.toLowerCase().slice(0, input.length) === input.toLowerCase()
                                       || catalogName.toLowerCase().slice(0, input.length) === input.toLowerCase(),
        (input, { name, catalogName }) => name.toLowerCase().includes(input)
                                       || catalogName.toLowerCase().includes(input)
    ];

    const suggestFor = (input: string) => {
        let modifiers = input
            .split(' ')
            .filter(input => input.startsWith('+'))
            .map(token => token.substring(1))
            .filter(isValidModifier);

        if (!data)
            return [];
            
        let res = data
            .courses
            .filter(course => predicates.some(predicate => predicate(input.split(' ').filter(token => !token.startsWith('+')).join(' '), course)))
            .sort((a, b) => {
                let aStart = a.name.toLowerCase().slice(0, input.length) === input.toLowerCase();
                let bStart = b.name.toLowerCase().slice(0, input.length) === input.toLowerCase();
                if (aStart && bStart)
                    return a.name.localeCompare(b.name);

                if (aStart && !bStart)
                    return -1;

                if (bStart && !aStart)
                    return 1;

                return a.name.localeCompare(b.name);
            });

        return processModifiers(modifiers, res);
    }

    const renderSymbols = (course: CoursePayload, element = true) => {
        let symbols: AttributeSymbol[] = [];
        if (course.attributes.lab)
            symbols.push({ icon: mdiBeakerOutline });

        if (course.attributes.writing)
            symbols.push({ icon: mdiFileDocumentEditOutline });

        if (hasContentArea(course, ContentArea.CA1))
            symbols.push({ icon: mdiNumeric1Box });

        if (hasContentArea(course, ContentArea.CA2))
            symbols.push({ icon: mdiNumeric2Box });

        if (hasContentArea(course, ContentArea.CA3))
            symbols.push({ icon: mdiNumeric3Box });

        if (hasContentArea(course, ContentArea.CA4))
            symbols.push({ icon: mdiNumeric4Box });

        if (hasContentArea(course, ContentArea.CA4INT))
            symbols.push({ icon: mdiNumeric4BoxMultiple });

        if (!element)
            return symbols;

        return <>{ symbols.map(symbol => <MdiIcon path={symbol.icon} className={`fa-fw ${symbol.color || 'text-primary'}`} size={symbol.size || '20px'} />) }</>
    }

    const hasContentArea = (course: CoursePayload, area: ContentArea) => 
        course
            .attributes
            .contentAreas
            .some(ca => ca === area);
            
    const isValidModifier = (input: string): input is Modifiers => {
        let lower = input.toLowerCase();
        return lower === 'ca1'
            || lower === 'ca2'
            || lower === 'ca3'
            || lower === 'ca4'
            || lower === 'ca4int'
            || lower === 'lab'
            || lower === 'w'
            || lower === 'q'
            || lower === 'e' 
    }

    const processModifiers = (modifiers: Modifiers[], data: CoursePayload[]) => {
        let copy = [...data];

        if (hasModifier(modifiers, 'ca1'))
            copy = copy.filter(ent => hasContentArea(ent, ContentArea.CA1))
            
        if (hasModifier(modifiers, 'ca2'))
            copy = copy.filter(ent => hasContentArea(ent, ContentArea.CA2))
            
        if (hasModifier(modifiers, 'ca3'))
            copy = copy.filter(ent => hasContentArea(ent, ContentArea.CA3))
            
        if (hasModifier(modifiers, 'ca4'))
            copy = copy.filter(ent => hasContentArea(ent, ContentArea.CA4))
            
        if (hasModifier(modifiers, 'ca4int'))
            copy = copy.filter(ent => hasContentArea(ent, ContentArea.CA4INT))
            
        if (hasModifier(modifiers, 'lab'))
            copy = copy.filter(ent => ent.attributes.lab)
            
        if (hasModifier(modifiers, 'w'))
            copy = copy.filter(ent => ent.attributes.writing)
            
        if (hasModifier(modifiers, 'q'))
            copy = copy.filter(ent => ent.attributes.quantitative)
            
        if (hasModifier(modifiers, 'e'))
            copy = copy.filter(ent => ent.attributes.environmental);

        return copy;
    }

    const hasModifier = (modifiers: Modifiers[], target: Modifiers) => {
        return modifiers.some(modifier => modifier === target);
    }

    const onKeyUp = (e: any, suggestions: CoursePayload[]) => {
        if (e.keyCode !== 13 && !errored)
            return;

        if (e.keyCode !== 13 && errored)
            return setErrored(false);

        let current: string = e.target.value;
        if (!isValidCourseName(current))
            return setErrored(true);

        if (!suggestions.some(ent => ent.name.toLowerCase() === current.toLowerCase()))
            return setErrored(true);

        setLoading(true);
        router.push(`/course/${current.toUpperCase()}`);
    }

    return (
        <FormGroup>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onRequest}
                onSuggestionsClearRequested={onClear}
                onSuggestionSelected={onSelect}
                getSuggestionValue={selection => selection.name}
                renderInputComponent={inputProps => (
                    <>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <MdiIcon
                                    spin={loading}
                                    size="20px"
                                    className={errored ? 'text-danger' : ''}
                                    path={
                                        loading
                                            ? mdiLoading
                                            : errored
                                                ? mdiAlert
                                                : mdiMagnify
                                    }
                                />
                            </InputGroupText>
                        </InputGroupAddon>
                        <div className={styling.inputBoxRadius}>
                            <input {...inputProps} />
                        </div>
                    </>
                )}
                renderSuggestion={suggestion => (
                    <div className="row">
                        <div className="col-9">
                            {getIconForCourse(suggestion.name)} {suggestion.name}
                        </div>
                        <div className={`col-3 ${styling.symbolOffset}`}>
                            {renderSymbols(suggestion)}
                        </div>
                    </div>
                )}
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
                    type: 'text',
                    placeholder: 'Search for any course..',
                    className: `form-control-alternative form-control`,
                    onChange,
                    onKeyUp: e => onKeyUp(e, suggestions),
                }}
                theme={styling}
                id="cobalt-search"
            />
        </FormGroup>
    )
}