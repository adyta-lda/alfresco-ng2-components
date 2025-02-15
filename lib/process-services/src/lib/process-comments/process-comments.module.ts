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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ADF_COMMENTS_SERVICE, CoreModule } from '@alfresco/adf-core';

import { ProcessCommentsComponent } from './process-comments.component';
import { CommentProcessService } from './services/comment-process.service';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        CommonModule,
        CoreModule
    ],
    declarations: [
        ProcessCommentsComponent
    ],
    exports: [
        ProcessCommentsComponent
    ],
    providers: [
        {
            provide: ADF_COMMENTS_SERVICE,
            useClass: CommentProcessService
        }
    ]
})
export class ProcessCommentsModule {
}
