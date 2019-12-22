$(document).ready(function() {
 full = new fullpage("#page",{
	//options here
	autoScrolling:true,
	scrollHorizontally: true
 })
 fullpage_api.setAllowScrolling(false);
 loadingUserData()
});

function loadingUserData(){
 const users = ["Paty","Ju","Naty","Angel"]
 const user = new URL(window.location.href)
	.searchParams
	.get("user")
 const h1 = $("#loading-section h1")
 if(users.includes(user)){
	alert("oi")
	//$("#player-section video").attr("src",`${user}.mp4`)
	h1.html(`Seja bem vinda ${user}`)
	$("#loading-section .spinner-border").addClass("d-none")
	$("#loading-section .btn").removeClass("d-none")
 }
 else{
	h1.html('Ops o que você procura não esta aqui')
	$("#loading-section .spinner-border").addClass("d-none")
 }
}



const start = function(){
 full.moveSectionDown()
}
