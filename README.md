# Date input facade

A widely supported pure JS solution for styling the form field representation of `input type="date"`.

As of 2025, browser makers limit stylistic control of `input type="date"` DOM elements, while also tightly coupling the associated native date picker to that input, such that absent an ugly workaround, there is no way to avail the user of a native date-picker experience without sacrificing input styling.

This package offers such a workaround, while insulating the consuming code base.

Declare the date input as `<input type="text" data-date-facade ... />`  then proceed to style it like any other text input -- no DOM clutter or special CSS selectors needed. 

Under the hood, it will retain a shadow `input type="date"` to which user input is delegated, prompting the normal native picker.

Attributes `placeholder` `min` and `max` may be declared, as well as custom formatting hook. See usage examples below. 


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



