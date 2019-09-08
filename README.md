# React Table Scroller

A simple-to-use component that wraps a table and handler horizontal scrolling if the table width exceeds the wrapper width.

* Scroll position always **snaps to the nearest table column**;
* Scroll position automatically **follows the currently focused element** inside the table (useful for tables that contain inputs);
* Mouse wheel support;
* No need to pass a `ref` to the table component (that comes at a cost of dirty DOM checking, though).

## Setup

To check out a demo:

1. Clone the repo
2. `npm install`
3. `npm start`

## Usage

Using the scroller is as simple as this:

```tsx
<TableScroller>
    <table>
        {/* here comes anything, really... */}
    </table>
</TableScroller>
```

### Props

Note that the component provides some (pretty basic) styling out of the box, but you'll probably want to finetune it using all of the available
classnames.

```typescript
bottomScrollbar?: boolean;      // Whether to display the bottom scrollbar; default: `true`
topScrollbar?: boolean;         // Whether to display the top scrollbar; default: `true`
scrollbarClassname?: string;    // Custom CSS class for scrollbar element
handlerClassname?: string;      // CSS class for scrollbar handler
arrowLeftClassname?: string;    // CSS class for left scrollbar arrow
arrowRightClassname?: string;   // CSS class for right scrollbar arrow
```

## Limitations

* The scroller only supports horizontal scrolling at the moment
* For scroll snapping to work correctly, all columns in the table must have the same width
* Limited touch support
* The width of the scroller should be divisible by the width of a table column; if the column is `10em` wide, the scroller width can be `10em`, `20em`, `30em`, ...`100em`, etc.