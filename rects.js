const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// The x, y canvas dimensions in px.
const canvasWidth = 595;
const canvasHeight = 841;

// The x, y mouse position.
let mousePosX;
let mousePosY;

// Global RectRow array.
let rectRows = [];

// Stores the x,y,width,height for each rect as well as
// if the mouse is over the rect
class Rect {
    constructor(xStart, yStart, width, height) {
        this.xStart = xStart;
        this.yStart = yStart;
        this.width = width;
        this.height = height;
        this.isMouseInRect = false;
    }
}

// Holds an array of rects as well as information about how many rects per row (amount),
// how far a rect should expand (magnification) and the default rectWidth and if the mouse is over a row (isMouseInRow).
class RectRow {
    constructor(amount, magnification, canvasWidth, height, yStart) {
        this.rectWidth = canvasWidth / amount;
        this.amount = amount;
        this.magnification = magnification;
        this.isMouseInRow = false;

        // Initialize rects.
        this.rects = [];
        this.rects.push(new Rect(0, yStart, this.rectWidth, height));
        for (let i = 1; i < amount; i++)
            this.rects.push(new Rect(i * this.rectWidth, yStart, this.rectWidth, height));
    }
}

// Runs the scene. (last line in file)
function run() {
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;
    initRects();
    ctx.strokeStyle = 'white';
    drawRects(); // once

    // Update rects every n milliseconds
    setInterval(updateRects, 40);
}

// Initializes the rects and (global) rectRows.
function initRects() {
    const height3 = canvasHeight / 3;
    const row1 = new RectRow(3,  80, canvasWidth, height3, 0);
    const row2 = new RectRow(4, 150, canvasWidth, height3, height3);
    const row3 = new RectRow(5, 100, canvasWidth, height3, height3*2);
    rectRows = [row1, row2, row3];

    // const max = 30;
    // for (let i = 0; i < max; i++)
    //     rectRows.push(new RectRow(i+1, 100, canvasWidth, canvasHeight/max, i * (canvasHeight/max)));
}

// Updates all rects.
function updateRects() {
    let isMouseInOne = false;
    rectRows.forEach(rectRow => {
        rectRow.isMouseInRow = false;
        rectRow.rects.forEach(rect => {
            const isInRect = isMouseInRect(rect, mousePosX, mousePosY);
            rect.isMouseInRect = isInRect;
            if (isInRect) rectRow.isMouseInRow = true;
        })
    });

    // (some) returns true if at least one rectRow has the mouse over it.
    isMouseInOne = rectRows.some(rectRow => rectRow.isMouseInRow);

    // only update / draw the rects and rows if the mouse currently is over one of them.
    if (isMouseInOne) {
        rectRows.forEach(rectRow => updateRectRow(rectRow));
        drawRects();
    }
}

function updateRectRow(rectRow) {
    // If the mouse is not over this row, reset it by the default
    // values stored in the row.
    if (!rectRow.isMouseInRow) {
        // reset
        rectRow.rects[0].width = rectRow.rectWidth;
        for (let i = 1; i < rectRow.rects.length; i++) {
            rectRow.rects[i].width = rectRow.rectWidth;
            updateRectXStart(rectRow.rects[i], rectRow.rects[i - 1]);
        }
    } else { // else update all rects accordingly.
        updateRectWidth(rectRow.rects[0], rectRow.rectWidth, rectRow.amount, rectRow.magnification);
        for (let i = 1; i < rectRow.rects.length; i++) {
            updateRectWidth(rectRow.rects[i], rectRow.rectWidth, rectRow.amount, rectRow.magnification);
            updateRectXStart(rectRow.rects[i], rectRow.rects[i - 1]);
        }
    }
}

// Updates the rects xStart depending on the end of the previous rect.
function updateRectXStart(rect, previousRect) {
    rect.xStart = previousRect.xStart + previousRect.width;
}

// Updates the rects width.
function updateRectWidth(rect, rectWidth, rectAmount, magnification) {
    // If the mouse is over this rect, add the magnification.
    if (rect.isMouseInRect) {
        rect.width = rectWidth + magnification;
    } else { // if not subtract the magnification divided by the remaining rects.
        rect.width = rectWidth - (magnification / (rectAmount - 1));
    }
}

// Draws all the rects store in (global) rectRows.
function drawRects() {
    // Clear the entire canvas before redrawing the rects.
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Draw each rect in each row.
    rectRows.forEach(rectRow =>
        rectRow.rects.forEach(rect =>
            ctx.strokeRect(rect.xStart, rect.yStart, rect.width, rect.height)));
}

// Checks if the mouse is inside a rect.
function isMouseInRect(rect, mousePosX, mousePosY) {
    // x-boundary
    const xStart = rect.xStart;
    const xEnd = rect.xStart + rect.width;
    // y-boundary
    const yStart = rect.yStart;
    const yEnd = rect.yStart + rect.height;

    // is inside
    if (mousePosX >= xStart &&
        mousePosX <= xEnd &&
        mousePosY >= yStart &&
        mousePosY <= yEnd) {
        return true;
    }

    // is not inside
    return false;
}

// Helpers
//////////

// mousemove browser event updates the mouse position.
canvas.addEventListener('mousemove', evt => {
    const mousePos = getMousePos(canvas, evt);
    mousePosX = mousePos.x;
    mousePosY = mousePos.y;
});

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// ENTRY
////////

// Runs the scene.
run();
