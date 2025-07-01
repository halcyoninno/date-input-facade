# Date input facade

A widely supported pure JS solution for styling the form field representation of `input type="date"`.

As of 2025, browser makers still limit stylistic control of the `input type="date"` DOM element, while also tightly coupling the associated native date picker to it, such that absent ugly workaround, there is no way to avail the user of a native date picker without accepting an incongruent-looking date form field.

This package offers such a workaround, while insulating the consuming code base from work-around clutter.

Declare the date input as `<input type="text" data-date-facade ... />` then style it like any other text input -- no DOM clutter or special CSS selectors. 

Under the hood, it will retain a shadow `input type="date"` to which user input is delegated, prompting native picker on focus.

Attributes `placeholder` `min` and `max` may be declared, as well as custom formatting hook. 

See usage examples. 


## Usage

### Importation

The script runs automatically on import, interfaced with via DOM element attributes.

* Via `npm` for a packed project:
```
npm -i @halcyoninno/date-input-facade
```
```
<script>
  import '@halcyoninno/date-input-facade';
</script>
```

* Self-hosted:
```
<script src="./script/date-input-facade.js"></script>
```

* CDN (latest)
```
<script src="https://cdn.jsdelivr.net/npm/@halcyoninno/date-input-facade"></script>
```

### Basic

After applying `data-date-facade`, focus will now trigger and set value from native picker.

```
    <input name="foo-date" type="text"  placeholder="Enter date:" data-date-facade/>
```

### Enabling keyboard date input

If desired that user can override picked value with keyboard input,
add `data-date-facade-enable-keyboard`:

```
    <input type="text" placeholder="Enter date:" data-date-facade data-date-facade-enable-keyboard/>
```

### Format customization  

Locale-specific default formatting overridden by specifying formatter method in `data-date-facade-formatter`;
which must be a method bound to `window` scope taking a Date object and returning a string 

```
    <input type="text" placeholder="Enter date:" 
        data-date-facade 
        data-date-facade-formatter="myDateFormatter"/>
```
```
    function myFormatter(dateVal) {
        const day = dateVal.getDate().toString().padStart(2, '0');
        const month = dateVal.toLocaleString('en-US', { month: 'short' }); // e.g. 'Sep'
        const year = dateVal.getFullYear();
        return `${month} ${day}, ${year}`;
    }
```

### Date range bounding

Attributes `min` and `max` on facade input will be mirrored by underlying `input type="date"`
causing normal documented effect. 

