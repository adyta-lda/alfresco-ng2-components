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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';

import { HighlightDirective } from './highlight.directive';
import { LogoutDirective } from './logout.directive';
import { UploadDirective } from './upload.directive';
import { NodeDownloadDirective } from './node-download.directive';
import { VersionCompatibilityDirective } from './version-compatibility.directive';
import { TooltipCardDirective } from './tooltip-card/tooltip-card.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { TooltipCardComponent } from './tooltip-card/tooltip-card.component';
import { InfiniteSelectScrollDirective } from './infinite-select-scroll.directive';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        OverlayModule
    ],
    declarations: [
        HighlightDirective,
        LogoutDirective,
        NodeDownloadDirective,
        UploadDirective,
        VersionCompatibilityDirective,
        TooltipCardDirective,
        TooltipCardComponent,
        InfiniteSelectScrollDirective
    ],
    exports: [
        HighlightDirective,
        LogoutDirective,
        NodeDownloadDirective,
        UploadDirective,
        VersionCompatibilityDirective,
        TooltipCardDirective,
        InfiniteSelectScrollDirective
    ]
})
export class DirectiveModule {}
