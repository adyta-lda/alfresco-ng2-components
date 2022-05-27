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
import { APP_INITIALIZER, NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateStore, TranslateService } from '@ngx-translate/core';

import { MaterialModule } from './material.module';
import { AboutModule } from './about/about.module';
import { AlfrescoApiV2 } from './api/alfresco-api-v2';
import { AlfrescoApiV2LoaderService, createAlfrescoApiV2Service } from './api/alfresco-api-v2-loader.service';
import { AngularClientFactory } from './api-factories/angular-api-client.factory';
import { LegacyAlfrescoApiServiceFacade } from './api/legacy-alfresco-api-service.facade';
import { AppConfigModule } from './app-config/app-config.module';
import { CardViewModule } from './card-view/card-view.module';
import { ContextMenuModule } from './context-menu/context-menu.module';
import { DataColumnModule } from './data-column/data-column.module';
import { DataTableModule } from './datatable/datatable.module';
import { InfoDrawerModule } from './info-drawer/info-drawer.module';
import { LanguageMenuModule } from './language-menu/language-menu.module';
import { LoginModule } from './login/login.module';
import { PaginationModule } from './pagination/pagination.module';
import { HostSettingsModule } from './settings/host-settings.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { UserInfoModule } from './userinfo/userinfo.module';
import { ViewerModule } from './viewer/viewer.module';
import { FormBaseModule } from './form/form-base.module';
import { SidenavLayoutModule } from './layout/layout.module';
import { CommentsModule } from './comments/comments.module';
import { ButtonsMenuModule } from './buttons-menu/buttons-menu.module';
import { TemplateModule } from './templates/template.module';
import { ClipboardModule } from './clipboard/clipboard.module';
import { NotificationHistoryModule } from './notifications/notification-history.module';
import { BlankPageModule } from './blank-page/blank-page.module';

import { DirectiveModule } from './directives/directive.module';
import { DialogModule } from './dialogs/dialog.module';
import { PipeModule } from './pipes/pipe.module';

import { AlfrescoApiService } from './services/alfresco-api.service';
import { TranslationService } from './services/translation.service';
import { startupServiceFactory } from './services/startup-service-factory';
import { SortingPickerModule } from './sorting-picker/sorting-picker.module';
import { IconModule } from './icon/icon.module';
import { TranslateLoaderService } from './services/translate-loader.service';
import { ExtensionsModule } from '@alfresco/adf-extensions';
import { directionalityConfigFactory } from './services/directionality-config-factory';
import { DirectionalityConfigService } from './services/directionality-config.service';
import { SearchTextModule } from './search-text/search-text-input.module';
import { versionCompatibilityFactory } from './services/version-compatibility-factory';
import { VersionCompatibilityService } from './services/version-compatibility.service';
import { API_CLIENT_FACTORY_TOKEN, ApiClientsService, AlfrescoJsClientsModule } from '@alfresco/adf-core/api';
import { LegacyClientFactory } from './api-factories/legacy-api-client.factory';
import { AuthBearerInterceptor } from './services/auth-bearer.interceptor';

interface ModuleConfig {
    useLegacy: boolean;
};

const defaultConfig: ModuleConfig = { useLegacy: true };

@NgModule({
    imports: [
        TranslateModule,
        ExtensionsModule,
        AboutModule,
        ViewerModule,
        SidenavLayoutModule,
        PipeModule,
        CommonModule,
        DirectiveModule,
        DialogModule,
        FormsModule,
        ReactiveFormsModule,
        HostSettingsModule,
        UserInfoModule,
        MaterialModule,
        AppConfigModule,
        PaginationModule,
        ToolbarModule,
        ContextMenuModule,
        CardViewModule,
        FormBaseModule,
        CommentsModule,
        LoginModule,
        LanguageMenuModule,
        InfoDrawerModule,
        DataColumnModule,
        DataTableModule,
        ButtonsMenuModule,
        TemplateModule,
        IconModule,
        SortingPickerModule,
        NotificationHistoryModule,
        SearchTextModule,
        BlankPageModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'CSRF-TOKEN',
            headerName: 'X-CSRF-TOKEN'
        }),
        AlfrescoJsClientsModule
    ],
    exports: [
        AboutModule,
        ViewerModule,
        SidenavLayoutModule,
        PipeModule,
        CommonModule,
        DirectiveModule,
        DialogModule,
        ClipboardModule,
        FormsModule,
        ReactiveFormsModule,
        HostSettingsModule,
        UserInfoModule,
        MaterialModule,
        AppConfigModule,
        PaginationModule,
        ToolbarModule,
        ContextMenuModule,
        CardViewModule,
        FormBaseModule,
        CommentsModule,
        LoginModule,
        LanguageMenuModule,
        InfoDrawerModule,
        DataColumnModule,
        DataTableModule,
        TranslateModule,
        ButtonsMenuModule,
        TemplateModule,
        SortingPickerModule,
        IconModule,
        NotificationHistoryModule,
        SearchTextModule,
        BlankPageModule
    ]
})
export class CoreModule {
    static forRoot(config: ModuleConfig = defaultConfig): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                TranslateStore,
                TranslateService,
                ApiClientsService,
                { provide: TranslateLoader, useClass: TranslateLoaderService },
                {
                    provide: APP_INITIALIZER,
                    useFactory: directionalityConfigFactory,
                    deps: [DirectionalityConfigService],
                    multi: true
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: versionCompatibilityFactory,
                    deps: [VersionCompatibilityService],
                    multi: true
                },
                { provide: HTTP_INTERCEPTORS, useClass: AuthBearerInterceptor, multi: true },
                ...(config.useLegacy ?
                    [
                        { provide: API_CLIENT_FACTORY_TOKEN, useClass: LegacyClientFactory },
                        {
                            provide: APP_INITIALIZER,
                            useFactory: startupServiceFactory,
                            deps: [ AlfrescoApiService ],
                            multi: true
                        }
                    ] : [
                        AlfrescoApiV2,
                        LegacyAlfrescoApiServiceFacade,
                        { provide: API_CLIENT_FACTORY_TOKEN, useClass: AngularClientFactory },
                        {
                            provide: APP_INITIALIZER,
                            useFactory: createAlfrescoApiV2Service,
                            deps: [
                                AlfrescoApiV2LoaderService
                            ],
                            multi: true
                        },
                        {
                            provide: AlfrescoApiService,
                            useExisting: LegacyAlfrescoApiServiceFacade
                        }
                    ]
                )
            ]
        };
    }

    static forChild(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule
        };
    }

    constructor(translation: TranslationService) {
        translation.addTranslationFolder('adf-core', 'assets/adf-core');
    }
}
