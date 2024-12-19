/*const positions = [
    { id: 'activity1', x: -300, y: -200 },
    { id: 'activity2', x: 300, y: -200 },
    { id: 'activity3', x: -300, y: 200 },
    { id: 'activity4', x: 300, y: 200 },
];*/

function drawConnections() {
    //const scroller = document.getElementById('back-to-top');
    //scroller.innerHTML = `${window.scrollY}`;
    const mainNode = document.getElementById('name-node');
    const canvas = document.getElementById('connections');
    const ctx = canvas.getContext('2d');
    const nodes = document.getElementsByClassName('node')
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const container = document.getElementById('cloud-container');
    const containerBounds = container.getBoundingClientRect();
    canvas.width = window.screen.width;
    canvas.height = window.screen.height;

    /*abandonGraph = false;
    positions.forEach(({id}) => {
        const node = document.getElementById(id);
        positions.forEach(({id2}) => {
            const node2 = document.getElementById(id2);

})});*/

    /*const timeCanvas = document.getElementById('connections-timeline');
    const timeCtx = timeCanvas.getContext('2d');
    const timeBounds = document.getElementById('timeline').getBoundingClientRect();
    
    timeCanvas.style.width = `${timeBounds.width}px`;
    timeCanvas.style.height = `${timeBounds.height}px`;
    timeCanvas.style.top =  `${document.getElementById('timeline').offsetTop}px`;
    //document.getElementById('timeline').innerHTML += `<p>${document.getElementById('timeline').offsetTop}</p>`
    timeCtx.strokeStyle = '#555';
    timeCtx.lineWidth = 2;
    timeCtx.beginPath();
    const topDate = document.getElementById('top-date').getBoundingClientRect();
    document.getElementById('top-date').innerHTML += `VALX = ${topDate.left}, VALY = ${topDate.y + window.scrollY}`;
    timeCtx.moveTo(topDate.x, topDate.y + window.scrollY);
    const bottomDate = document.getElementById('bottom-date').getBoundingClientRect();
    document.getElementById('bottom-date').innerHTML += `VALX = ${bottomDate.left}, VALY = ${bottomDate.y + window.scrollY}`;
    timeCtx.lineTo(bottomDate.x, bottomDate.y + window.scrollY);
    timeCtx.stroke();*/

    // Make the site linear if we're on mobile
    if (containerBounds.width < 600) {
        bottom = 0;
        for (let node of nodes) {
            //const node = document.getElementById(id);
            //const rect = node.getBoundingClientRect();
            //const newX = mainNodeX + (scalerX * x);
            //const newY = mainNodeY + (scalerY * y);
            //node.style.left = `${newX}px`;
            //node.style.top = `${newY}px`;
            node.style.width = `${containerBounds.width}px`;
            node.style.margin = '1px';
            node.style.padding = '5px';
            node.style.position = 'relative';
            if (node.getBoundingClientRect().bottom > bottom) bottom = node.getBoundingClientRect().bottom;
        };
        container.style.height = `${bottom}px`;
        return;
    }

    const mainNodeX = (containerBounds.width) / 2;
    const mainNodeY = (containerBounds.height) / 2;
    mainNode.style.left = `${mainNodeX - mainNode.offsetWidth / 2}px`;
    mainNode.style.top = `${mainNodeY - mainNode.offsetHeight / 2}px`;
    const scalerX = (containerBounds.width - mainNode.offsetWidth) / 2;
    const scalerY = (containerBounds.height - mainNode.offsetHeight) / 2;
    const perNode = (2 * Math.PI) / (nodes.length - 1);
    for (var i = 0; i < nodes.length; ++i) {
        const node = nodes[i];
        if (node.id == 'name-node') continue;
        const newX = mainNodeX + (Math.cos(perNode * i) * scalerX);
        const newY = mainNodeY + (Math.sin(perNode * i) * scalerY);
        node.style.left = `${newX - node.offsetWidth / 2}px`;
        node.style.top = `${newY - node.offsetHeight / 2}px`;
        const rect = node.getBoundingClientRect();
        const mainRect = mainNode.getBoundingClientRect();
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
        ctx.lineTo(mainRect.x + mainRect.width / 2, mainRect.y + mainRect.height / 2);
        ctx.stroke();
    };

}

document.addEventListener('DOMContentLoaded', () => {
    // Word Cloud functionality
    const nodes = document.querySelectorAll('.node');
    //const mainNode = document.getElementById('name-node');
    //const canvas = document.getElementById('connections');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    const closePopup = document.getElementById('close-popup');

    



    //positions.forEach(({ id, x, y }) => {
    //    const node = document.getElementById(id);
    //    node.style.left = `${x}px`;
    //    node.style.top = `${y}px`;
    //});



    

    drawConnections();

    // Popup functionality

    // REWRITE, s.t. each activity has its own popup
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const container = document.getElementById('cloud-container');
            const containerBounds = container.getBoundingClientRect();
            const info = node.dataset.info || 'No additional information available.';
            popupContent.innerHTML = info;
            popup.style.display = 'block';
            popup.style.width = `${Math.min(containerBounds.width, node.offsetWidth * 3)}px`;
            posX = node.getBoundingClientRect().x + node.offsetWidth / 2;
            posY = node.getBoundingClientRect().y + node.getBoundingClientRect().height / 2;
            popup.style.left = `${posX}px`;
            popup.style.top = `${posY}px`;
            if(popup.getBoundingClientRect().bottom > containerBounds.bottom) popup.style.top = `${containerBounds.bottom - popup.offsetHeight / 2}px`;
            //if(popup.getBoundingClientRect().left < containerBounds.left) popup.style.left = `${containerBounds.left + popup.offsetWidth / 2}px`;
            if(popup.getBoundingClientRect().top < containerBounds.top) popup.style.top = `${containerBounds.top + popup.offsetHeight / 2}px`;
            //if(popup.getBoundingClientRect().right > containerBounds.right) popup.style.left = `${containerBounds.right - popup.offsetWidth / 2}px`;

        });
    });

    

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Scroll-triggered animations
    const scrollContents = document.querySelectorAll('.scroll-content');

    const handleScroll = () => {
        drawConnections();
        scrollContents.forEach(content => {
            const rect = content.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                content.classList.add('visible');
            }
        });
        //popup.style.display = 'none';
    };

    const handleResize = () => {
        drawConnections();
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize, false);
});