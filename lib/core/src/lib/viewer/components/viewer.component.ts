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

import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import {  Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ViewUtilService } from '../services/view-util.service';
import { ViewerToolbarComponent } from './viewer-toolbar.component';
import { ViewerOpenWithComponent } from './viewer-open-with.component';
import { ViewerMoreActionsComponent } from './viewer-more-actions.component';
import { ViewerSidebarComponent } from "./viewer-sidebar.component";

@Component({
    selector: 'adf-viewer',
    templateUrl: './alfresco-viewer.component.html',
    styleUrls: ['./alfresco-viewer.component.scss'],
    host: {class: 'adf-alfresco-viewer'},
    encapsulation: ViewEncapsulation.None,
    providers: [ViewUtilService]
})
export class ViewerComponent implements OnInit, OnDestroy {

    @ContentChild(ViewerToolbarComponent)
    toolbar: ViewerToolbarComponent;

    @ContentChild(ViewerSidebarComponent)
    sidebar: ViewerSidebarComponent;

    @ContentChild(ViewerOpenWithComponent)
    mnuOpenWith: ViewerOpenWithComponent;

    @ContentChild(ViewerMoreActionsComponent)
    mnuMoreActions: ViewerMoreActionsComponent;

    /** If you want to load an external file that does not come from ACS you
     * can use this URL to specify where to load the file from.
     */
    @Input()
    urlFile = '';

    /** Override Content filename. */
    @Input()
    fileName: string;

    /** Hide or show the viewer */
    @Input()
    showViewer = true;

    /** Allows `back` navigation */
    @Input()
    allowGoBack = true;

    /** Hide or show the toolbar */
    @Input()
    showToolbar = true;

    /** If `true` then show the Viewer as a full page over the current content.
     * Otherwise fit inside the parent div.
     */
    @Input()
    overlayMode = false;

    /** Toggles before/next navigation. You can use the arrow buttons to navigate
     * between documents in the collection.
     */
    @Input()
    allowNavigate = false;

    /** Toggles the "before" ("<") button. Requires `allowNavigate` to be enabled. */
    @Input()
    canNavigateBefore = true;

    /** Toggles the next (">") button. Requires `allowNavigate` to be enabled. */
    @Input()
    canNavigateNext = true;

    /** Allow the left the sidebar. */
    @Input()
    allowLeftSidebar = false;

    /** Allow the right sidebar. */
    @Input()
    allowRightSidebar = false;

    /** Toggles right sidebar visibility. Requires `allowRightSidebar` to be set to `true`. */
    @Input()
    showRightSidebar = false;

    /** Toggles left sidebar visibility. Requires `allowLeftSidebar` to be set to `true`. */
    @Input()
    showLeftSidebar = false;

    /** The template for the right sidebar. The template context contains the loaded node data. */
    @Input()
    sidebarRightTemplate: TemplateRef<any> = null;

    /** The template for the left sidebar. The template context contains the loaded node data. */
    @Input()
    sidebarLeftTemplate: TemplateRef<any> = null;

    /** Emitted when the shared link used is not valid. */
    @Output()
    invalidSharedLink = new EventEmitter();

    /** Emitted when user clicks 'Navigate Before' ("<") button. */
    @Output()
    navigateBefore = new EventEmitter<MouseEvent | KeyboardEvent>();

    /** Emitted when user clicks 'Navigate Next' (">") button. */
    @Output()
    navigateNext = new EventEmitter<MouseEvent | KeyboardEvent>();

    /** Emitted when the viewer close */
    @Output()
    close = new EventEmitter<boolean>();

    private onDestroy$ = new Subject<boolean>();

    isLoading: boolean;
    urlFileContent: string;
    viewerType: any;
    mimeType: string;
    readOnly: boolean = true;

    sidebarRightTemplateContext: { node: Node } = {node: null};
    sidebarLeftTemplateContext: { node: Node } = {node: null};

    constructor(private el: ElementRef,
                public dialog: MatDialog) {
    }


    onNavigateBeforeClick(event: MouseEvent | KeyboardEvent) {
        this.navigateBefore.next(event);
    }

    onNavigateNextClick(event: MouseEvent | KeyboardEvent) {
        this.navigateNext.next(event);
    }

    /**
     * close the viewer
     */
    onClose() {
        this.showViewer = false;
        this.close.emit(this.showViewer);
    }

    toggleRightSidebar() {
        this.showRightSidebar = !this.showRightSidebar;
    }

    toggleLeftSidebar() {
        this.showLeftSidebar = !this.showLeftSidebar;
    }

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event && event.defaultPrevented) {
            return;
        }

        const key = event.keyCode;

        // Left arrow
        if (key === 37 && this.canNavigateBefore) {
            event.preventDefault();
            this.onNavigateBeforeClick(event);
        }

        // Right arrow
        if (key === 39 && this.canNavigateNext) {
            event.preventDefault();
            this.onNavigateNextClick(event);
        }

        // Ctrl+F
        if (key === 70 && event.ctrlKey) {
            event.preventDefault();
            this.enterFullScreen();
        }
    }

    /**
     * Triggers full screen mode with a main content area displayed.
     */
    enterFullScreen(): void {
        const container = this.el.nativeElement.querySelector('.adf-viewer__fullscreen-container');
        if (container) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
        }
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

}
