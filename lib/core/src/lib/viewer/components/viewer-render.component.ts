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

//TODO FIX documentation
//TODO FIX unit test

import {
    Component, EventEmitter,
    Input, OnChanges, Output, TemplateRef,
    ViewEncapsulation, OnInit, OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { ViewUtilService } from '../services/view-util.service';
import { AppExtensionService, ViewerExtensionRef } from '@alfresco/adf-extensions';
import { MatDialog } from '@angular/material/dialog';
import { Track } from "../models/viewer.model";

@Component({
    selector: 'adf-viewer-render',
    templateUrl: './viewer-render.component.html',
    styleUrls: ['./viewer-render.component.scss'],
    host: {class: 'adf-viewer-render'},
    encapsulation: ViewEncapsulation.None,
    providers: [ViewUtilService]
})
export class ViewerRenderComponent implements OnChanges, OnInit, OnDestroy {

    /** If you want to load an external file that does not come from ACS you
     * can use this URL to specify where to load the file from.
     */
    @Input()
    urlFile = '';

    /** Loads a Blob File */
    @Input()
    blobFile: Blob;

    /** Toggles the 'Full Screen' feature. */
    @Input()
    allowFullScreen = true;

    /** Toggles PDF thumbnails. */
    @Input()
    allowThumbnails = true;

    /** The template for the right sidebar. The template context contains the loaded node data. */
    @Input()
    sidebarRightTemplate: TemplateRef<any> = null;

    /** The template for the left sidebar. The template context contains the loaded node data. */
    @Input()
    sidebarLeftTemplate: TemplateRef<any> = null;

    /** The template for the pdf thumbnails. */
    @Input()
    thumbnailsTemplate: TemplateRef<any> = null;

    /** MIME type of the file content (when not determined by the filename extension). */
    @Input()
    mimeType: string;

    /** Override Content filename. */
    @Input()
    fileName: string;

    /** Override Content view type.
     Viewer to use with the `urlFile` address (`pdf`, `image`, `media`, `text`).*/
    @Input()
    viewerType: string = 'unknown';

    /** Allows `back` navigation */
    @Input()
    allowGoBack = true;

    /** Override loading status */
    @Input()
    isLoading = false;

    /** Enable when where is possible the editing functionalities  */
    @Input()
    readOnly = true;

    /** media subtitles for the media player*/
    @Input()
    tracks: Track[] = [];

    /** Emitted when the filename extension changes. */
    @Output()
    extensionChange = new EventEmitter<string>();

    /** Emitted when the img is submitted in the img viewer. */
    @Output()
    submitFile = new EventEmitter<Blob>();

    /** Emitted when the img is submitted in the img viewer. */
    @Output()
    close = new EventEmitter<boolean>();

    extensionTemplates: { template: TemplateRef<any>; isVisible: boolean }[] = [];
    extension: string;

    /**
     * Returns a list of the active Viewer content extensions.
     */
    get viewerExtensions(): ViewerExtensionRef[] {
        return this.extensionService.getViewerExtensions();
    }

    /**
     * Provides a list of file extensions supported by external plugins.
     */
    get externalExtensions(): string[] {
        return this.viewerExtensions.map(ext => ext.fileExtension);
    }

    private _externalViewer: ViewerExtensionRef;
    get externalViewer(): ViewerExtensionRef {
        if (!this._externalViewer) {
            this._externalViewer = this.viewerExtensions.find(ext => ext.fileExtension === '*');
        }

        return this._externalViewer;
    }

    cacheTypeForContent = '';

    private onDestroy$ = new Subject<boolean>();

    constructor(private viewUtilService: ViewUtilService,
                private extensionService: AppExtensionService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        this.cacheTypeForContent = '';
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    ngOnChanges() {
        this.isLoading = true;

        if (this.blobFile) {
            this.setUpBlobData();
            this.isLoading = false;
        } else if (this.urlFile) {
            this.setUpUrlFile();
            this.isLoading = false;
        }
    }

    private setUpBlobData() {
        this.mimeType = this.blobFile.type;
        this.viewerType = this.viewUtilService.getViewerTypeByMimeType(this.mimeType);

        this.extensionChange.emit(this.mimeType);
        this.scrollTop();
    }

    private setUpUrlFile() {
        this.fileName = this.fileName ? this.fileName : this.viewUtilService.getFilenameFromUrl(this.urlFile);
        this.extension = this.viewUtilService.getFileExtension(this.fileName);
        this.viewerType = this.viewerType === 'unknown' ? this.viewUtilService.getViewerType(this.extension, this.mimeType) : this.viewerType;

        this.extensionChange.emit(this.extension);
        this.scrollTop();
    }

    scrollTop() {
        window.scrollTo(0, 1);
    }

    checkExtensions(extensionAllowed) {
        if (typeof extensionAllowed === 'string') {
            return this.extension.toLowerCase() === extensionAllowed.toLowerCase();
        } else if (extensionAllowed.length > 0) {
            return extensionAllowed.find((currentExtension) => this.extension.toLowerCase() === currentExtension.toLowerCase());
        }
    }

    onSubmitFile(newImageBlob: Blob) {
        this.submitFile.next(newImageBlob);
    }

    onUnsupportedFile() {
        this.viewerType = 'unknown';
    }

    onClose() {
        this.close.next(true);
    }

}
