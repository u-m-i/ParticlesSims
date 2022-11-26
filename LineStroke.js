function drawLine()
{
    const textInput = document.getElementById("userInput");
    const canvas = document.getElementById("canvasOne");
    const context = canvas.getContext("2d");

    context.lineWidth = 3;
    context.strokeStyle = 'red';

    context.beginPath();
    context.moveTo(canvas.width/2,100);
    context.lineTo(canvas.width/2,canvas.height/2);
    context.stroke();

    context.lineWidth = 3;
    context.strokeStyle = 'green';

    context.beginPath();
    context.moveTo(0,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2);
    context.stroke();

    const text = "You can write something!";
    
    const textX = canvas.width/2;
    
    const textY = canvas.height/2;

    const gradient = context.createLinearGradient(0,0, canvas.width, canvas.height);

    gradient.addColorStop(0.34,  'green');
    gradient.addColorStop(0.5,  'red');
    gradient.addColorStop(0.7, 'yellow');

    context.fillStyle = gradient;
    context.strokeStyle = 'green';
    
    context.lineWidth =4;
    context.font = '80px Candara';
    context.textAlign = 'center';
    context.textBaseline = 'alphabetic';

    const maxTextWidth = canvas.width  * 0.6    ;
    const lineHeight = 80;

    function wrapText(text) {
    
        let linesArray = [];
        let lineCounter = 0;
    
        let line = ' ';
    
        let words = text.split(' ');
    
        for(let i = 0; i < words.length; i++) {
    
            let testLine = line + words[i] + ' ';

            if(context.measureText(testLine).width > maxTextWidth)
            {
                line =  words[i] + ' ';
                lineCounter++;
            }
            else
            {
                line = testLine;
            }

            linesArray[lineCounter] = line;
        }

        let textHeight = lineHeight * lineCounter;
        let yText = canvas.height/2 - textHeight/2;

        linesArray.forEach((el, index) => {
            context.fillText(el, canvas.width/2, yText + (index * lineHeight));
        })

        console.log(linesArray);
    }

    // wrapText('There are many process behind this');

    textInput.addEventListener('keyup', function(e){

        context.clearRect(0,0,canvas.width, canvas.height);

        wrapText(e.target.value);
    });
    
}

window.addEventListener("load", drawLine);