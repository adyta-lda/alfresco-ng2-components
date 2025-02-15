---
Title: Card Item Type service
Added: v2.0.0
Status: Active
Last reviewed: 2018-11-20
---

# [Card Item Type service](../../../lib/core/src/lib/card-view/services/card-item-types.service.ts "Defined in card-item-types.service.ts")

Maps type names to field component types for the [Card View component](../components/card-view.component.md).

## Class members

### Methods

-   **getComponentTypeResolver**(type: `string`, defaultValue: `Type<any>` = `this.defaultValue`): [`DynamicComponentResolveFunction`](lib/core/src/lib/common/services/dynamic-component-mapper.service.ts)<br/>
    Gets the currently active [DynamicComponentResolveFunction](lib/core/src/lib/common/services/dynamic-component-mapper.service.ts) for a field type.
    -   _type:_ `string`  - The type whose resolver you want
    -   _defaultValue:_ `Type<any>`  - Default type returned for types that are not yet mapped
    -   **Returns** [`DynamicComponentResolveFunction`](lib/core/src/lib/common/services/dynamic-component-mapper.service.ts) - Resolver function
-   **register**(components: `Function`, override: `boolean` = `false`)<br/>
    Register multiple components
    -   _components:_ `Function`  - 
    -   _override:_ `boolean`  - 
-   **resolveComponentType**(model: [`DynamicComponentModel`](lib/core/src/lib/common/services/dynamic-component-mapper.service.ts), defaultValue: `Type<any>` = `this.defaultValue`): `Type<any>`<br/>
    Finds the component type that is needed to render a form field.
    -   _model:_ [`DynamicComponentModel`](lib/core/src/lib/common/services/dynamic-component-mapper.service.ts)  - [Form](../../../lib/process-services/src/lib/task-list/models/form.model.ts) field model for the field to render
    -   _defaultValue:_ `Type<any>`  - Default type returned for field types that are not yet mapped.
    -   **Returns** `Type<any>` - Component type
-   **setComponentTypeResolver**(type: `string`, resolver: [`DynamicComponentResolveFunction`](lib/core/src/lib/common/services/dynamic-component-mapper.service.ts), override: `boolean` = `true`)<br/>
    Sets or optionally replaces a [DynamicComponentResolveFunction](lib/core/src/lib/common/services/dynamic-component-mapper.service.ts) for a field type.
    -   _type:_ `string`  - The type whose resolver you want to set
    -   _resolver:_ [`DynamicComponentResolveFunction`](lib/core/src/lib/common/services/dynamic-component-mapper.service.ts)  - The new resolver function
    -   _override:_ `boolean`  - The new resolver will only replace an existing one if this parameter is true

## Details

The [Card View component](../components/card-view.component.md) uses this service to find the component
type that is required to display a particular field type (text, date, etc). The service
maps a type name string to a corresponding [`DynamicComponentResolveFunction`](lib/core/src/lib/common/services/dynamic-component-mapper.service.ts) that takes a
model object as a parameter and returns the component type needed to display that model.

The default mapping is shown below:

| Type string | Component |
| ----------- | --------- |
| 'text' | [`CardViewTextItemComponent`](../../../lib/core/src/lib/card-view/components/card-view-textitem/card-view-textitem.component.ts) |
| 'int' | [`CardViewTextItemComponent`](../../../lib/core/src/lib/card-view/components/card-view-textitem/card-view-textitem.component.ts) |
| 'float' | [`CardViewTextItemComponent`](../../../lib/core/src/lib/card-view/components/card-view-textitem/card-view-textitem.component.ts) |
| 'date' | [`CardViewDateItemComponent`](../../../lib/core/src/lib/card-view/components/card-view-dateitem/card-view-dateitem.component.ts) |
| 'datetime' | [`CardViewDateItemComponent`](../../../lib/core/src/lib/card-view/components/card-view-dateitem/card-view-dateitem.component.ts) |
| 'bool' | [`CardViewBoolItemComponent`](../../../lib/core/src/lib/card-view/components/card-view-boolitem/card-view-boolitem.component.ts) |
| 'map' | [`CardViewMapItemComponent`](../../../lib/core/src/lib/card-view/components/card-view-mapitem/card-view-mapitem.component.ts) |

### Adding new type mappings

You can define your own custom field types for the Card View (see the
[Card View Item interface](../interfaces/card-view-item.interface.md) page for full details of how to do this).
When you have defined the field component, you need to register it with the [Card Item Types service](lib/core/src/lib/card-view/services/card-item-types.service.ts)
so that the [Card View component](../components/card-view.component.md) can make use of it:

```ts
@Component({
    ...
    providers: [ CardItemTypeService ] /* If you don't want to pollute the main instance of the CardItemTypeService service */
    ...
})
export class SomeParentComponent {

    constructor(private cardItemTypeService: CardItemTypeService) {
        cardItemTypeService.setComponentTypeResolver('star-date', () => CardViewStarDateItemComponent);
    }
}
```

## See also

-   [Card View component](../components/card-view.component.md)
-   [Card View Item interface](../interfaces/card-view-item.interface.md)
