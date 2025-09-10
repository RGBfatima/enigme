document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const pieces = Array.from(document.querySelectorAll('.puzzle-piece'));

    // Randomize the order of the pieces
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach(piece => puzzleContainer.appendChild(piece));

    let draggedPiece = null;

    puzzleContainer.addEventListener('dragstart', (e) => {
        draggedPiece = e.target;
        e.dataTransfer.setData('text/plain', null);
    });

    puzzleContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    puzzleContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('puzzle-piece')) {
            const temp = document.createElement('div');
            puzzleContainer.insertBefore(temp, e.target);
            puzzleContainer.insertBefore(e.target, draggedPiece);
            puzzleContainer.insertBefore(draggedPiece, temp);
            puzzleContainer.removeChild(temp);
            checkWinCondition();
        }
    });

    function checkWinCondition() {
        const currentOrder = Array.from(puzzleContainer.children).map(piece => piece.getAttribute('data-order'));
        const correctOrder = ['1', '2', '3', '4', '5', '6'];

        if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
            document.getElementById('next-step').style.display = 'block';
            puzzleContainer.style.border = "5px solid green";
        }
    }
});
