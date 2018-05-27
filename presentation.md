### First Approach: Pure javascript

Folder: rects or rects2

#### Init
- Define canvasWidth and canvasHeight

- Define a Rect class
    - xStart (number)
    - yStart (number)
    - width (number)
    - height (number)
    - isMouseInRect (boolean, is the mouse in this rect?)

- Define a RectRow class:
    - amount (How many rects does this row have?)
    - rectWidth (How wide is a rect in that row?)
    - magnification (Additional width which gets added to the rectWidth for the mouse over rect)
    - isMouseInRow (boolean, is the mouse in this row?)

- initRects (function)
    - Initializes the rectRows array

#### Update & Draw

- updateRects (function)
    - check if the mouse is in a rect as well as in the corresponding rect row
        - if so, the rect and its row gets updated (width) and redraw all rects.

##### Pros
- Fine control over each rect and its update behavior

##### Cons
- More complex boundary checks (updateRects, updateRectRow, isMouseInRect)



### Second approach: CSS flexbox & hover

External library: jquery

JQuery allows us to generate html and append it to the DOM with less code than pure javascript.

1. Layout the HTML (index.html)
    - div with id `a4` and an approximated A4 size as well as a canvas of the same size in the background. The canvas is unused at this point, but could be used later.

2. Iterate over an array of boxes with boxIds (generateBoxes function)
    - Append the box rows with boxes to the `a4` div
    - Init the mouseenter event for each box (initEvents function)
        - If the mouse is inside a particular box, the handleBox function gets called for that particular box. The handlebox function can now be used to determine which box id was hovered and can implement additional javascript logic.

##### Pros
- Making use of CSS and flexbox removes the overhead of boundary checks with javascript.
- CSS can be used for simple transitions (rotate, scale, ...)
- We also can draw inside the canvas behind the boxes
- The implementaion is faster than the other one (CSS makes use of the graphic card (GPU))

##### Cons
- Since CSS now handles the resize logic we restrict us to the CSS animation possibilites for the boxes.

##### Conclusion
This is approach is simple to implement and allows for a quick interaction with the boxes for simple effects like images, svg's, sound, etc. but takes the possibilites of advanced animations.



### Other approchaes

- p5.js