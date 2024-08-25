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
 
import { Modal as RModal } from 'reactstrap';

export interface ModalProps {
    open: boolean;
    setOpen: (state: boolean) => void;
    title: string | JSX.Element;
    width?: string;
    footerButtons?: JSX.Element;
    closeIcon?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ open, setOpen, title, width, footerButtons, closeIcon, children }) => (
    <RModal className="modal-dialog-centered" isOpen={open} toggle={() => setOpen(!open)} style={{ maxWidth: width ?? '500px' }}>
        <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">{title}</h6>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => setOpen(false)}>
                <span aria-hidden={true}>×</span>
            </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
            {footerButtons}
            <a className="btn btn-link ml-auto text-lowercase" onClick={() => setOpen(false)}>{closeIcon && (<><i className="fa fa-times fa-fw"></i>{" "}</>)}Close</a>
        </div>
    </RModal>
)