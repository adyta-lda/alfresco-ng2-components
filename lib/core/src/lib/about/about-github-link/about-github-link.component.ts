/*!
 * @license
 * Copyright 2019 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'adf-about-github-link',
    templateUrl: './about-github-link.component.html',
    styleUrls: ['./about-github-link.component.scss'],
})
export class AboutGithubLinkComponent {
    /** Commit corresponding to the version of ADF to be used. */
    @Input()
    url = 'https://github.com/Alfresco/alfresco-ng2-components/commits/';

    /** Current version of the app running */
    @Input()
    version: string = '';

    /** Title of app running */
    @Input()
    application: string = '';

    dropdownExpandedStatus = false;
    dropdownToggle = true;

    constructor() {}

    toggleDropdown() {
        this.dropdownExpandedStatus = !this.dropdownExpandedStatus;

        if (!this.dropdownExpandedStatus) {
            this.dropdownToggle = true;
        }
    }
}
