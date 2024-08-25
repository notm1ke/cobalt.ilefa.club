/*
 * Copyright (c) 2024 ILEFA Labs
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import MdiIcon from '@mdi/react';
import Autosuggest from 'react-autosuggest';
import styling from './styling/search.module.css';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CoursePayload, useDebounce } from '../hooks';
import { ChangeEvent, SuggestionSelectedEventData } from 'react-autosuggest';
import { ContentArea, getIconForCourse, isGradLevel, isValidCourseName } from '../util';

import {
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    UncontrolledTooltip
} from 'reactstrap';

import {
    mdiAlert,
    mdiAlphaGBox,
    mdiAlphaHBox,
    mdiBackspace,
    mdiBeakerOutline,
    mdiFileChartOutline,
    mdiFileDocumentEditOutline,
    mdiHammerWrench,
    mdiLoading,
    mdiMagnify,
    mdiNumeric1Box,
    mdiNumeric2Box,
    mdiNumeric3Box,
    mdiNumeric4Box,
    mdiNumeric4BoxMultiple,
    mdiSprout
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

const modifierNames = {
    ca1: 'Content Area 1',
    ca2: 'Content Area 2',
    ca3: 'Content Area 3',
    ca4: 'Content Area 4',
    ca4int: 'Content Area 4 (International)',
    lab: 'Lab (L)',
    w: 'Writing (W)',
    q: 'Quantitative (Q)',
    e: 'Environmental (E)'
}

const icons = {
    ca1: mdiNumeric1Box,
    ca2: mdiNumeric2Box,
    ca3: mdiNumeric3Box,
    ca4: mdiNumeric4Box,
    ca4int: mdiNumeric4BoxMultiple,
    lab: mdiHammerWrench,
    w: mdiFileDocumentEditOutline,
    q: mdiFileChartOutline,
    e: mdiSprout
}

const defaultAdvancedProps = {
    ca1: false,
    ca2: false,
    ca3: false,
    ca4: false,
    ca4int: false,
    lab: false,
    w: false,
    q: false,
    e: false
}

interface AdvancedSearchComponentProps {
    show: boolean;
    has: (param: Modifiers) => boolean;
    toggle: (param: Modifiers) => void;
    clear: () => void;
}

const AdvancedSearchComponent: React.FC<AdvancedSearchComponentProps> = ({ show, has, toggle, clear }) => (
    <div className={`card ${styling.advancedInputCard} ${show ? '' : styling.hideAdvancedInput}`}>
        <div className={`row pt--1 pb-2 ${styling.advancedInputCardBorder}`}>
            {
                Object.keys(icons).map(key => (
                    <div className="col col-md-1 col-auto cursor-pointer shine" key={key} onClick={() => toggle(key as Modifiers)}>
                        <span id={`tooltip-adv-${key}`}>
                            <MdiIcon path={icons[key]} size={'23px'} className={has(key as Modifiers) ? 'text-primary' : 'text-dark'} />
                        </span>
                        <UncontrolledTooltip delay={0} placement="top" target={`tooltip-adv-${key}`}>
                            {modifierNames[key]}
                        </UncontrolledTooltip>
                    </div>
                ))
            }
            <div className="col col-md-1 col-auto mx-md-auto cursor-pointer shine" onClick={() => clear()}>
                <span id="tooltip-adv-clear">
                    <MdiIcon path={mdiBackspace} size={'23px'} className="text-danger" />
                </span>
                <UncontrolledTooltip delay={0} placement="top" target="tooltip-adv-clear">
                    Clear all filters
                </UncontrolledTooltip>
            </div>
        </div>
    </div>
)

export interface CobaltSearchProps {
    feelingSilly?: boolean;
}

export const CobaltSearch: React.FC<CobaltSearchProps> = ({ feelingSilly }) => {
    const router = useRouter();

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<CoursePayload[]>([]);
    const [loading, setLoading] = useState(false);
    const [errored, setErrored] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [advancedOpts, setAdvancedOpts] = useState(defaultAdvancedProps);

    const debouncedQuery = useDebounce(query, 250);

    const hasAdvanced = (opt: Modifiers) => advancedOpts[opt];
    const clearAdvanced = () => setAdvancedOpts(defaultAdvancedProps);

    const toggleAdvanced = (opt: Modifiers) => {
        setAdvancedOpts({
            ...advancedOpts,
            [opt]: !advancedOpts[opt]
        });
    }

    useEffect(() => {
        fetch(`/api/search`, {
            method: 'POST',
            body: JSON.stringify({
                input: debouncedQuery,
                advancedOpts,
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
    }, [debouncedQuery, advancedOpts]);

    const onClear = () => setSuggestions([]);
    const onChange = (_: any, { newValue }: ChangeEvent) => setQuery(newValue);
    const onRequest = (_: any) => {
        setShowAdvanced(false);
    }

    const onSelect = (_: any, { suggestionValue }: SuggestionSelectedEventData<CoursePayload>) => {
        setLoading(true);
        router.push(`/course/${suggestionValue}`);
    }

    const renderSymbols = (course: CoursePayload, element = true) => {
        let symbols: AttributeSymbol[] = [];
        if (course.attributes.lab)
            symbols.push({ icon: mdiBeakerOutline });

        if (course.attributes.writing)
            symbols.push({ icon: mdiFileDocumentEditOutline });

        if (course.gradingType === 'Honors Credit')
            symbols.push({ icon: mdiAlphaHBox, color: 'text-danger' });

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

        if (isGradLevel(course.name.split(/\d/)[0], parseInt(course.name.split(/(\d{3,4})/)[1])))
            symbols.push({ icon: mdiAlphaGBox, color: 'text-success' });

        if (!element)
            return symbols;

        return <>{ symbols.map(symbol => <MdiIcon path={symbol.icon} className={`fa-fw ${symbol.color || 'text-primary'}`} size={symbol.size || '20px'} />) }</>
    }

    const hasContentArea = (course: CoursePayload, area: ContentArea) => 
        course
            .attributes
            .contentAreas
            .some(ca => ca === area);
            
    const onKeyUp = (e: any, suggestions: CoursePayload[]) => {
        if (showAdvanced)
            setShowAdvanced(false);

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

    const pickSillyCourse = () => fetch('/api/courses')
        .then(res => res.json())
        .then(res => {
            if (res.error)
                return;

            const random = Math.floor(Math.random() * res.courses.length);
            router.push(`/course/${res.courses[random].name}`);
        });

    return (
        <FormGroup>
            <Autosuggest
                suggestions={suggestions ?? []}
                onSuggestionsFetchRequested={onRequest}
                onSuggestionsClearRequested={onClear}
                onSuggestionSelected={onSelect}
                getSuggestionValue={selection => selection.name}
                renderInputComponent={inputProps => (
                    <>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <span onClick={() => setShowAdvanced(!showAdvanced)}>
                                    <MdiIcon
                                        spin={loading}
                                        size="20px"
                                        className={'text-gray cursor-pointer shine ' + (errored ? 'text-danger' : '')}
                                        path={
                                            loading
                                                ? mdiLoading
                                                : errored
                                                    ? mdiAlert
                                                    : mdiMagnify
                                        }
                                    />
                                </span>
                            </InputGroupText>
                        </InputGroupAddon>
                        <div className={feelingSilly ? styling.inputBoxRadiusEgg : styling.inputBoxRadius}>
                            <input {...inputProps} />
                            <AdvancedSearchComponent
                                show={showAdvanced}
                                has={hasAdvanced}
                                toggle={toggleAdvanced}
                                clear={clearAdvanced}
                            />
                        </div>
                        { 
                            feelingSilly && (
                                <>
                                    <span id="feeling-silly" className={`btn btn-primary btn-link btn-sm ${styling.feelingSillyButton}`} onClick={() => pickSillyCourse()}>
                                        <i className="fa fa-dice fa-fw text-white"></i>
                                    </span>
                                    <UncontrolledTooltip target="feeling-silly" placement="bottom">
                                        <b>I'm feeling silly</b>
                                        <br/>Take me to a completely random extremely silly course.
                                    </UncontrolledTooltip>
                                </>
                            )
                        }
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
                containerProps={{
                    className: 'input-group-alternative mb-4 input-group'
                }}
                inputProps={{
                    value: query,
                    // disabled: !enabled,
                    type: 'text',
                    placeholder: 'Search for any course..',
                    className: `${feelingSilly ? styling.noRadiusFormGroup : 'form-control-alternative'} form-control`,
                    onChange,
                    onKeyUp: e => onKeyUp(e, suggestions!),
                }}
                theme={styling}
                id="cobalt-search"
            />
        </FormGroup>
    )
}