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

import buildInfo from '../build_info.json';

export const DISPLAY_VERSION = buildInfo.version;
export const MAJOR_VERSION = buildInfo.version.split('.')[0];
export const MINOR_VERSION = buildInfo.version.split('.')[1];
export const PATCH_VERSION = buildInfo.version.split('.')[2];
export const COMMIT_HASH = buildInfo.sha;
export const COMMIT_MESSAGE = buildInfo.message;
export const COMMIT_AUTHOR = buildInfo.dev;
export const COMMIT_AUTHOR_NAME = buildInfo.dev_name;
export const COMMIT_AUTHOR_EMAIL = buildInfo.dev_email;
export const RELEASE_CHANNEL = buildInfo.channel;
export const INSTANCE_HOST = buildInfo.device;
export const BUILT_AT = buildInfo.time;