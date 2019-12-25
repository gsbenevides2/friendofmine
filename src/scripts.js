document.addEventListener("DOMContentLoaded", function(event) {
 try{
	full = new fullpage("#fullpage")
 }catch(e){}
 const video = document.querySelector("video")
 window.onload = function(){
	document.body.classList.add("show")
	navigator.serviceWorker.register('../sw.js');
 }
 if(video){
	video.addEventListener("ended",full.moveSectionDown,false)
 }
 firebase.performance()
})
