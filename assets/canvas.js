window.addEventListener("load",function()
{
    const canvas = document.getElementById("canvasOne");

    const context = canvas.getContext("2d",{
        willReadFrequently: true
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(effect, x, y, color){
            this.effect = effect;
            this.color = color;
            this.x = Math.random() * effect.canvasHeight;
            this.y = 0;

            this.originX = x;
            this.originY = y;

            this.size = effect.gap;

            this.dx = 0;
            this.dy = 0;
            this.vx = 0;
            this.vy = 0;
            this.force = 0;
            this.angle =0;
            this.distance = 0;
            this.friction = Math.random() * 0.6 + 0.15 ;
            this.ease = Math.random() * 0.1 + 0.005;

        }

        draw(){
            this.effect.context.fillStyle = this.color;
            this.effect.context.fillRect(this.x, this.y, this.size, this.size);
        }

        update(){

            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;

            this.distance =(this.dx * this.dx) + (this.dy * this.dy);
            this.force = -this.effect.mouse.radius / this.distance;

            if(this.distance  < this.effect.mouse.radius)
            {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force  * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }
            this.x += (this.vx *=  this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
    }

    class Effect
    {

        constructor(context, canvasWidth, canvasHeight)
        {

            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;

            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;

            this.lineHeight = this.fontSize * 0.8;
            this.maxTextWidth = this.canvasWidth  * 0.8;

            this.fontSize = 96;

            
            this.particles = [];
            this.gap = 3;
            this.mouse = {
                radius: 20000,
                x: 0,
                y: 0 
            };
            
            window.addEventListener("mousemove", (e) =>
            {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
                // console.log(this.mouse.x, this.mouse.y)
            });

            this.textInput = document.getElementById("userInput");

            this.textInput.addEventListener("keyup", (e) => {

                    console.log(e);

                    this.context.clearRect(0,0,this.canvasWidth, this.canvasHeight);

                    this.textX = this.canvasWidth/2;
                    this.textY = this.canvasHeight/2;

                    this.wrapText(e.target.value);

            });

        }

        wrapText(text){
            /* Canvas Settings */

            const gradient = this.context.createLinearGradient(0,0, this.canvasWidth, this.canvasHeight);

            gradient.addColorStop(0.3, 'red');
            gradient.addColorStop(0.5,'fuchsia');
            gradient.addColorStop(0.7,"purple");

            this.context.fillStyle = gradient;

            this.context.textAlign = "center";
            this.context.textBaseLine = "middle";

            this.context.lineWidth = 3;
            this.context.strokeStyle = "white";

            this.context.font = this.fontSize + "px Candara";

            console.log(`${this.textX},${this.textY}`);

            this.context.fillText(text, this.textX, this.textY);
            this.context.strokeText(text, this.textX, this.textY);

            // break the text

            let linesArray = [];
            let words = text.split(' ');
            let lineCounter = 0;
            let line = ' ';
            for(let i = 0; i < words.length;i++){
                let testLine = line  + words[i] + ' ';

                if(this.context.measureText(testLine).width > this.maxTextWidth){

                    line = words[i] + ' ';
                    lineCounter++;

                } else {

                    line = testLine;

                }
                linesArray[lineCounter] = line;
            }

            let textHeight = this.lineHeight * lineCounter;
            this.textY  = this.canvasHeight / 2  - textHeight / 2;

            linesArray.forEach((el, index) => {
                this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));

                this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));
            });

            this.converToParticles();
        }

        converToParticles() {
            this.particles = [];
            const pixels = this.context.getImageData(0,0, this.canvasWidth, this.canvasHeight).data;
            this.context.clearRect(0,0, this.canvasWidth, this.canvasHeight);

            for(let y = 0; y < this.canvasHeight; y+= this.gap){

                for(let x  = 0; x < this.canvasWidth; x+= this.gap){

                    const index = (y * this.canvasWidth + x) * 4;
                    const alpha = pixels[index + 3];

                    if(alpha > 0){

                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];

                        const color  = 'rgb(' + red + ',' + green + ',' + blue + ')';

                        this.particles.push(new Particle(this, x, y, color));
                    }
                }
            }
            // console.log(this.particles);

            // console.log(pixels);
        }

        //Draw and update all the particles
        render(){

            this.particles.forEach(particle => {

                particle.update();
                particle.draw();
            });
        }
    }

    const effect = new Effect(context, canvas.width, canvas.height);

    effect.wrapText(effect.textInput.value);

    effect.render();

    function animate() {

        context.clearRect(0,0,canvas.width, canvas.height);
        effect.render();
        requestAnimationFrame(animate);
    }

    animate();

});