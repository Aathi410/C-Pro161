AFRAME.registerComponent("bullets", {
    init:function(){
        this.shootBullet()
    },

    shootBullet:function(){
        window.addEventListener("keydown", (e)=>{
            if(e.key === "z"){
                var bullet = document.createElement("a-entity")
                bullet.setAttribute("geometry", {
                    primitive:"sphere",
                    radius:0.1,
                })
                bullet.setAttribute("material", "color", "black")

                var cam = document.querySelector("#camera")
                var camera = document.querySelector("#camera").object3D

                //Get the Camera Direction as 3.js Vector
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                console.log(direction)

                pos = cam.getAttribute("position")
                bullet.setAttribute("position", {
                    x:pos.x,
                    y:pos.y,
                    z:pos.z
                })

                var scene = document.querySelector("#scene")
                bullet.setAttribute("velocity",direction.multiplyScalar(-10))
                
                //Set the Bullet as the Dynamic Entity
                bullet.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:"0"
                })

                // Add the Collide Lvent Listener to the Bullet
                bullet.addEventListener("collide", this.removeBullet)

                scene.appendChild(bullet)
            }
        })
    },

    removeBullet:function(e){
        //Originally Entity (Bullet)
        console.log(e.detail.target.el)
        
        //Other Entity which Bullet Touched
        console.log(e.detail.body.el)

        //Bullet Element
        var element = e.detail.target.el

        //Element which is Hit
        var elementHit = e.detail.body.el

        if(elementHit.id.includes("box")){
            elementHit.setAttribute("material", {
                opacity:0.6,
                transparent:true
            })

            //Remove Event Listener
            element.removeEventListener("collide", this.shoot)

            //Remove the Bullet From the Scene
            var scene = document.querySelector("#scene")
            console.log("check")
            scene.removeChild(element)
        }
    }
})