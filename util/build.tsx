/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
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