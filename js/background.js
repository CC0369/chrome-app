const colors = [
    "#525FA1",
    "#313961",
    "#BAC1E6",
    "#C3C1E6"
];

const bgcolor = colors[Math.floor(Math.random() * colors.length)];
      
document.body.style.backgroundColor = bgcolor;


const setColors = document.getElementsByClassName("bgColor");

function setBackground(event) {
    const color = event.target.style.backgroundColor;
    document.body.style.backgroundColor = color;
}

Array.from(setColors).forEach(color =>
    color.addEventListener("click", setBackground)
);
