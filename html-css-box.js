const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Grid {

    generateBoxes() {
        // The rows array which contains e.g. 3 rows
        // Each row exists of an array of boxIds
        const rows = [
            { boxIds: ['crazybox', '😁', '😅'] },
            { boxIds: ['😴 ', 'YO', '😡', '😵'] },
            { boxIds: ['🤬', '👻', '😓', '🤐', '😰'] }
        ];

        let html = '';
        // We iterate over each row object inside the rows array
        rows.forEach((row, rowIndex) => {
            // Open row div
            html += `<div id="row-${rowIndex + 1}" class="boxes">`;
            // For each box id inside a row, generate a box div
            row.boxIds.forEach(boxId => html += `<div id="${boxId}" class="box flex-center"></div>`);
            // Close row div
            html += `</div>`;
        })
        $('#a4').append(html);
    }

    initEvents() {
        //              Actually you can name the callback variables however you want
        $('.box').each((index, value) => {
            const $box = $(value);
            // Start the mouseenter event for each box.
            $box.mouseenter(() => {
                const width = $box.width();
                const height = $box.height();
                const offset = $box.offset();
                const id = $box.attr('id');
                this.handleBox({
                    $box: $box,
                    id: id,
                    width: width,
                    height: height,
                    x: offset.left,
                    y: offset.top
                });
            });

            // TODO: hover für spezielle box // feixen ansatz

            // Start the mouse leave event for each box
            $box.mouseleave(() => {
                this.clear($box);
            });
        });
    };

    clear(box) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        box.empty();
    }

    handleBox(box) {
        box.$box.html(`<div>${box.id}</div>`);

        // correct x, y
        // const a4offset = $('#a4').offset();
        // const x = box.x - a4offset.left;
        // const y = box.y - a4offset.top;

        // ctx.fillStyle = "#333";
        // ctx.fillRect(x, y, box.width, box.height);

        if (box.id === 'YO') {
            const a = new Audio('4939.mp3');
            // a.play();
        }
    }
}

// Run:
const grid = new Grid();
grid.generateBoxes();
grid.initEvents();
