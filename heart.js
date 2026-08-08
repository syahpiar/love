// ==========================
// Floating Hearts
// ==========================

const hearts = document.getElementById("hearts");

if(hearts){

    for(let i=0;i<7;i++){

        const heart=document.createElement("div");

        heart.className="heart";
        heart.innerHTML="❤️";

        heart.style.left=Math.random()*100+"vw";

        heart.style.fontSize=
        (18+Math.random()*18)+"px";

        heart.style.animationDuration=
        (8+Math.random()*8)+"s";

        heart.style.animationDelay=
        Math.random()*8+"s";

        hearts.appendChild(heart);

    }

}
