# jQuery.Toggler

Toggle elements (state/visibility) based on the value of other fields, with wide customization support

[Live demo and documentation](https://biohzrdmx.github.io/jQuery.Toggler/)

## Installing

Just download `jquery.toggler.js` then add it to your HTML file:

```html
<script type="text/javascript" src="js/jquery.toggler.js"></script>
```

You may instead use the minified version if you like.

## Basic usage

You'll need a select or another predictable-value form control, for example:

```html
  <select name="foo" id="foo" data-toggler="foo">
    <option value="bar">bar</option>
    <option value="baz">baz</option>
  </select>
```

Notice how we added a `data-toggler` attribute and set it to `foo`. This is important

Not you'll need to add your conditional elements, for example:

```html
  <div class="conditional" data-toggle-condition="foo" data-toggle-value="bar">The value is bar</div>
  <div class="conditional" data-toggle-condition="foo" data-toggle-value="baz">The value is baz</div>
```

Now you should notice the two attributes that we added to each of the conditional blocks:

- `data-toggle-condition` - Specifies which condition to check on, for this example we only have one, `foo`
- `data-toggle-value` - Specifies the value of the condition that will toggle the element, in this case we may have specified either `bar` or `baz` as they are the possible options on the `select` control

There are another two possible `data` attributes:

- `data-toggle-function` - Specifies the toggle function, the default is `display` and will toggle the CSS `display` property between `none` and `block`. There is another one, `enabled` and will toggle the `disabled` attribute.
- `data-toggle-solver` - Specifies the toggle solver, the default is `value` and will check the `value` of the control. Other included solvers are `valueNot` which just inverts the evaluation and `oneOf` which accepts several possible conditions separated by a _pipe_ `|`, for example `foo|quaz` (given that you have both conditions available).

We also added a `conditional` class, you may use it to hide the contents initially, with a `display: none` property for example.

Once you're done with the markup, just add a simple call on your `onDomReady` callback:

```javascript
  $('[data-toggler]').toggler();
```

And that's all. Change the `select` value and you'll see how the other boxes are automatically shown/hidden.

You may chain a `change` event trigger if you feel so:

```javascript
  $('[data-toggler]').toggler().trigger('change');
```

That way the initial values will also trigger a toggle on the linked containers.

## Advanced usage

You may add your own solvers and togglers if you like. Just extend the `$.toggler.defaults` object or add an options hash on your call to the `toggler` function:

```javascript
$('[data-toggler]').toggler({
  togglers: {
    unhide: function(el, toggle, opts) {
      if (toggle) {
        el.removeClass('hide');
      } else {
        el.addClass('hide');
      }
      el.closest('.form-group').removeClass('has-error');
    }
  }
});
```

In this example we just added a toggle function named `unhide` that toggles the `hide` class on your containers, to use it specify it at the `data-toggle-function` attribute:

```html
  <div class="conditional" data-toggle-condition="foo" data-toggle-value="bar" data-toggle-function="unhide">The value is bar</div>
  <div class="conditional" data-toggle-condition="foo" data-toggle-value="baz" data-toggle-function="unhide">The value is baz</div>
```

To add a solver, do the same but on the `solvers` object:

```javascript
$('[data-toggler]').toggler({
  solvers: {
    numeric: function(el, param, item, opts) {
      var val = el.val();
      return !isNaN(val);
    }
  }
});
```

There we added a simple solver for numeric-values only. To use it, specify it at the `data-toggle-solver` attribute:

```html
  <div class="conditional" data-toggle-condition="foo" data-toggle-value="" data-toggle-solver="numeric">The value is bar</div>
  <div class="conditional" data-toggle-condition="foo" data-toggle-value="" data-toggle-solver="numeric">The value is baz</div>
```

In this case the `data-toggle-value` attribute is irrelevant for the check.

You may also customize both of them, just use each attribute when required.

## Requirements

- jQuery 1.8+
- A recent/decent web browser (Firefox, Chrome or Opera suggested; **IE/Edge NOT TESTED/DON'T CARE**)

## Licensing

MIT Licensed

## Contributing

Fork the repo, add an interesting feature or fix a bug and send a pull request.

## Troubleshooting

Open an issue and provide a clear description of the error, how to reproduce it and your test environment specs (browser, jQuery version, etc.)

## Credits

Lead coder: biohzrdmx (github.com/biohzrdmx)