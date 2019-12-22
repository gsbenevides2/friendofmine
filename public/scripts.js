document.addEventListener("DOMContentLoaded", function(event) {
 full = new fullpage("#fullpage")
 const video = document.querySelector("video")
 console.log(video)
 window.onload = function(){
	document.body.classList.add("show")
 }
 video.addEventListener("ended",full.moveSectionDown,false)
})
