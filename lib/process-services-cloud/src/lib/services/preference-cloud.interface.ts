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

import { Observable } from 'rxjs';

export interface PreferenceCloudServiceInterface {
    getPreferences(appName: string, key?: string): Observable<any>;
    getPreferenceByKey(appName: string, key: string): Observable<any>;
    createPreference(appName: string, key: string, newPreference: any): Observable<any>;
    updatePreference(appName: string, key: string, updatedPreference: any): Observable<any>;
    deletePreference(appName: string, key: any): Observable<any>;
}
