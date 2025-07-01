# Date input facade

A widely supported pure JS solution for styling the form field representation of `input type="date"`.

As of 2025, browser makers limit stylistic control of the `input type="date"` DOM element, while also tightly coupling the associated native date picker to it, such that absent ugly workaround, there is no way to avail the user of a native date picker without accepting an incongruent-looking date form field.

This package offers such a workaround, while insulating the consuming code base.

Declare the date input as `<input type="text" data-date-facade ... />` then style it like any other text input -- no DOM clutter or special CSS selectors. 

Under the hood, it will retain a shadow `input type="date"` to which user input is delegated, prompting the normal native picker on focus.

Attributes `placeholder` `min` and `max` may be declared, as well as custom formatting hook. See usage examples. 


## Usage

### Install

Include source
```
```

### Basic

Clicking input now opens native picker and sets value accordingly. 

```
    <input type="text"  placeholder="Enter date:" data-datefacade/>
```

### Enabling keyboard date input

By default the only interaction with the native picker can alter the field, however keyboard input can be enabled as by adding `data-datefacade-enable-keyboard` attribute:

```
    <input type="text" placeholder="Enter date:" data-datefacade data-datefacade-enable-keyboard/>
```

## Format customization  

Formats according to OS locale by default. Optionally overridden by formatter method found in window scope. 

```
    <input type="text" placeholder="Enter date:" 
        data-datefacade 
        data-datefacade-formatter="myDateFormatter"/>
```
```
    function myDateFormatter(date) {
        ...
    }
```

## Date bounding

Attributes `min` and `max` can be applied to the facade.


## Browser support

Test on a variety of devices, old and new.



