// renderer.js
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const context = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const lineWidthPicker = document.getElementById('lineWidthPicker');
    const toolSelector = document.getElementById('toolSelector');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    resizeCanvas();

    let drawing = false;
    let currentTool = 'pen';
    let color = 'black';
    let lineWidth = 5;
    let laserPenDrawings = []; // Track temporary drawings by Laser Pen
    let penDrawings = []; // Track temporary drawings by Pen

    function getMousePos(event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function startDrawing(event) {
        drawing = true;
        const pos = getMousePos(event);
        if (currentTool === 'laserPen') {
            context.beginPath();
            context.moveTo(pos.x, pos.y);
        } else {
            context.beginPath();
            context.moveTo(pos.x, pos.y);
        }
    }

    function endDrawing() {
        drawing = false;
        if (currentTool === 'laserPen') {
            // Clear temporary drawings after each stroke with Laser Pen
            setTimeout(() => {
                laserPenDrawings = [];
                redrawCanvas();
            }, 3000);
        } else {
            context.beginPath();
        }
    }

    function draw(event) {
        if (!drawing) return;

        const pos = getMousePos(event);

        if (currentTool === 'pen') {
            context.lineWidth = lineWidth;
            context.lineCap = 'round';
            context.strokeStyle = color;

            context.lineTo(pos.x, pos.y);
            context.stroke();
            context.beginPath();
            context.moveTo(pos.x, pos.y);

            // Track temporary drawings by Pen
            penDrawings.push({
                x: pos.x,
                y: pos.y
            });
        } else if (currentTool === 'laserPen') {
            context.lineWidth = lineWidth;
            context.lineCap = 'round';
            context.strokeStyle = 'red';

            context.lineTo(pos.x, pos.y);
            context.stroke();
            context.beginPath();
            context.moveTo(pos.x, pos.y);

            // Draw the white center of the line
            context.lineWidth = lineWidth - 2;  // Make the white center line narrower
            context.strokeStyle = 'white';
            context.lineTo(pos.x, pos.y);
            context.stroke();
            context.beginPath();
            context.moveTo(pos.x, pos.y);

            // Track temporary drawings by Laser Pen
            laserPenDrawings.push({
                x: pos.x,
                y: pos.y
            });
        } else if (currentTool === 'eraser') {
            context.lineWidth = lineWidth;
            context.lineCap = 'round';
            context.strokeStyle = 'white';

            context.lineTo(pos.x, pos.y);
            context.stroke();
            context.beginPath();
            context.moveTo(pos.x, pos.y);
        }
    }

    function redrawCanvas() {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Redraw all non-temporary drawings
        penDrawings.forEach(drawing => {
            context.beginPath();
            context.arc(drawing.x, drawing.y, 5, 0, Math.PI * 2);
            context.fillStyle = 'black';
            context.fill();
        });

        laserPenDrawings.forEach(drawing => {
            context.beginPath();
            context.arc(drawing.x, drawing.y, 5, 0, Math.PI * 2);
            context.fillStyle = 'red';
            context.fill();
        });
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mousemove', draw);

    colorPicker.addEventListener('input', (event) => {
        color = event.target.value;
    });

    lineWidthPicker.addEventListener('input', (event) => {
        lineWidth = event.target.value;
    });

    toolSelector.addEventListener('change', (event) => {
        currentTool = event.target.value;
        if (currentTool !== 'laserPen') {
            // Clear temporary drawings when switching tools
            laserPenDrawings = [];
            redrawCanvas();
        }
    });

    window.addEventListener('resize', resizeCanvas);
});
