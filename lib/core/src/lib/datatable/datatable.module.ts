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
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '../material.module';
import { ContextMenuModule } from '../context-menu/context-menu.module';
import { PipeModule } from '../pipes/pipe.module';

import { DirectiveModule } from '../directives/directive.module';
import { DataTableCellComponent } from './components/datatable-cell/datatable-cell.component';
import { DataTableRowComponent } from './components/datatable-row/datatable-row.component';
import { DataTableComponent } from './components/datatable/datatable.component';
import { DateCellComponent } from './components/date-cell/date-cell.component';
import { ColumnsSelectorComponent } from './components/columns-selector/columns-selector.component';
import { EmptyListBodyDirective,
    EmptyListComponent,
    EmptyListFooterDirective,
    EmptyListHeaderDirective } from './components/empty-list/empty-list.component';
import { FileSizeCellComponent } from './components/filesize-cell/filesize-cell.component';
import { LocationCellComponent } from './components/location-cell/location-cell.component';
import { LoadingContentTemplateDirective } from './directives/loading-template.directive';
import { NoContentTemplateDirective } from './directives/no-content-template.directive';
import { NoPermissionTemplateDirective } from './directives/no-permission-template.directive';
import { HeaderFilterTemplateDirective } from './directives/header-filter-template.directive';
import { CustomEmptyContentTemplateDirective } from './directives/custom-empty-content-template.directive';
import { CustomLoadingContentTemplateDirective } from './directives/custom-loading-template.directive';
import { CustomNoPermissionTemplateDirective } from './directives/custom-no-permission-template.directive';
import { MainMenuDataTableTemplateDirective } from './directives/main-data-table-action-template.directive';
import { JsonCellComponent } from './components/json-cell/json-cell.component';
import { ClipboardModule } from '../clipboard/clipboard.module';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IconModule } from '../icon/icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataColumnComponent, DataColumnListComponent, DateColumnHeaderComponent } from './data-column';

@NgModule({
    imports: [
        RouterModule,
        MaterialModule,
        CommonModule,
        TranslateModule,
        ContextMenuModule,
        PipeModule,
        DirectiveModule,
        ClipboardModule,
        DragDropModule,
        IconModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        DataTableComponent,
        EmptyListComponent,
        EmptyListHeaderDirective,
        EmptyListBodyDirective,
        EmptyListFooterDirective,
        DataTableCellComponent,
        DataTableRowComponent,
        DateCellComponent,
        FileSizeCellComponent,
        LocationCellComponent,
        JsonCellComponent,
        ColumnsSelectorComponent,
        NoContentTemplateDirective,
        NoPermissionTemplateDirective,
        LoadingContentTemplateDirective,
        HeaderFilterTemplateDirective,
        CustomEmptyContentTemplateDirective,
        CustomLoadingContentTemplateDirective,
        CustomNoPermissionTemplateDirective,
        MainMenuDataTableTemplateDirective,
        DropZoneDirective,
        DataColumnComponent,
        DataColumnListComponent,
        DateColumnHeaderComponent
    ],
    exports: [
        DataTableComponent,
        EmptyListComponent,
        EmptyListHeaderDirective,
        EmptyListBodyDirective,
        EmptyListFooterDirective,
        DataTableCellComponent,
        DataTableRowComponent,
        DateCellComponent,
        ColumnsSelectorComponent,
        FileSizeCellComponent,
        LocationCellComponent,
        JsonCellComponent,
        NoContentTemplateDirective,
        NoPermissionTemplateDirective,
        LoadingContentTemplateDirective,
        HeaderFilterTemplateDirective,
        CustomEmptyContentTemplateDirective,
        CustomLoadingContentTemplateDirective,
        CustomNoPermissionTemplateDirective,
        MainMenuDataTableTemplateDirective,
        DropZoneDirective,
        DataColumnComponent,
        DataColumnListComponent,
        DateColumnHeaderComponent
    ]
})
export class DataTableModule {}
