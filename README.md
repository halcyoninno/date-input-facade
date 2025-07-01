# DATE-INPUT-FACADE README

Pure JS, framework-agnositic solution for styling `input type="date"` by overlaying an `input type="text"`. 


## The problem

As of this writing in 2024, browser makers have stuck with the odd choice of denying stylistic control of `input type="date"`. 

At the same time, they limit execution of the native date picker to direct user interaction with that element; there are many good reasons to rely on a native date picker, but virtually nobody is willing to dispense with stylistic control in order to avail their users of it.

Whatever laudable reasons they have for these constraints are irrelevant if it pushes that vast majority into using an entirely JS-based solutions, usually abandoned and poorly supported after a couple years.


## A solution

A broadly supported, minimally invasive solution, is to declare the date field `input type="text" data-date-facade` then with styling it as regular `text` field, including `placeholder` attribute.

Included JS will then automatically construct an `input type="date"` obscured underneath the facade input, passing input events to it, mirroring its value.


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



