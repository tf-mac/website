/*const positions = [
    { id: 'activity1', x: -300, y: -200 },
    { id: 'activity2', x: 300, y: -200 },
    { id: 'activity3', x: -300, y: 200 },
    { id: 'activity4', x: 300, y: 200 },
];*/

const nodes = [
    { id : 'communication', color : "#577590", connects : ['pbm', 'fa24']},
    { id : 'leadership', color : "#43aa8b", connects : ['pbm']},
    { id : 'programming', color : "#90be6d", connects : ['sp25']},
    { id : 'parallel', color : "#f9c74f", connects : []},
    { id : 'physics', color : "#f8961e", connects : []},
    { id : 'algorithms', color : "#f3722c", connects: []},
    { id : 'quant', color : "#f94144", connects: []},
    { id : 'collaboration', color : "red", connects: []},
]

function drawConnections() {
    //const scroller = document.getElementById('back-to-top');
    //scroller.innerHTML = `${window.scrollY}`;
    const mainNode = document.getElementById('name-node');
    const canvas = document.getElementById('connections');
    const ctx = canvas.getContext('2d');
    //const nodes = document.getElementsByClassName('node')
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
    ctx.strokeStyle = '#577590';
    ctx.lineWidth = 10;
    ctx.beginPath();
    const topDate = document.getElementById('top-date').getBoundingClientRect();
    ctx.moveTo(topDate.left + topDate.width / 2, topDate.top + topDate.height / 2);
    const bottomDate = document.getElementById('bottom-date').getBoundingClientRect();
    ctx.lineTo(bottomDate.left + bottomDate.width / 2, bottomDate.top + bottomDate.height / 2);
    ctx.stroke();

    // Make the site linear if we're on mobile
    if (containerBounds.width < 600) {
        bottom = 0;
        for (let node of nodes) {
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
    const perNode = (2 * Math.PI) / (nodes.length);
    const right = 3;
    rightcnt = 1;
    const left = 5;
    leftcnt = 1;
    i = 0;
    nodes.forEach( ({id, color, connects}) => {
        console.log(id);
        const node = document.getElementById(id);
        const newX = mainNodeX + (Math.cos(perNode * i) * scalerX);
        const newY = mainNodeY + (Math.sin(perNode * i) * scalerY);
        node.style.left = `${newX - node.offsetWidth / 2}px`;
        node.style.top = `${newY - node.offsetHeight / 2}px`;
        node.style.backgroundColor = color;
        const rect = node.getBoundingClientRect();
        const mainRect = mainNode.getBoundingClientRect();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
        ctx.lineTo(mainRect.x + mainRect.width / 2, mainRect.y + mainRect.height / 2);
        ctx.stroke();
        i++;
        const margin = window.screen.width - document.getElementById('timeline').getBoundingClientRect().right - 10;
        const rightEdge = document.getElementById('timeline').getBoundingClientRect().right + 10;
        connects.forEach ( (dest) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
            const xSide = (newX > mainNodeX ? rightcnt * ((margin) / right) + rightEdge : leftcnt * ((margin) / left));
            
            ctx.lineTo(xSide ,rect.top + rect.height / 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(xSide, rect.top + rect.height / 2);
            box = document.getElementById(dest).getBoundingClientRect();
            ctx.lineTo(xSide, box.top + (newX > mainNodeX ? rightcnt : leftcnt) * box.height / ((newX > mainNodeX ? right : left) + 2));
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(xSide, box.top + (newX > mainNodeX ? rightcnt : leftcnt) * box.height / ((newX > mainNodeX ? right : left) + 2));
            ctx.lineTo(box.right, box.top + (newX > mainNodeX ? rightcnt : leftcnt) * box.height / ((newX > mainNodeX ? right : left) + 2));
            ctx.stroke();
        });
        (newX > mainNodeX ? rightcnt++ : leftcnt++);
    });

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
            popup.style.width = `${Math.min(containerBounds.width, node.offsetWidth * 5)}px`;
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
    const cards = document.getElementsByClassName('card');
    const popupsContent = document.getElementById('popupContent');
    for (let card of cards) {
        if(card.getElementsByClassName('hidden').length > 0) {
            card.classList.add('clickable');
        card.addEventListener('click', () => {
            popupOverlay.classList.add("show");
            document.body.style.overflow = "hidden"; // Disable scrolling
            popupsContent.innerHTML = card.getElementsByClassName('hidden')[0].innerHTML;
        });
    }
    }
    const popupOverlay = document.getElementById("popupOverlay");

    document.getElementById('closePopup').addEventListener("click", () => {
        popupOverlay.classList.remove("show");
        popupContent.innerHTML = "";
        document.body.style.overflow = ""; // Re-enable scrolling
    });

    // Close the popup when clicking outside of it
    popupOverlay.addEventListener("click", (event) => {
        if (event.target === popupOverlay) {
            popupOverlay.classList.remove("show");
            popupContent.innerHTML = ""
            document.body.style.overflow = ""; // Re-enable scrolling
        }
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