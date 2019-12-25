const ncp = require("ncp").ncp
const minify = require("@node-minify/core")
const html = require("@node-minify/html-minifier")
const js = require("@node-minify/uglify-es")
const css = require("@node-minify/clean-css")
const chalk = require("chalk")

const htmls = [
 "index",
 "404",
 "Pati",
 "Naty",
 "Ju",
 "Angel"
]
const csss = [
 "styles"
]
const jss = [
 "sw",
 "scripts"
]

function log(type,text){
 switch(type){
	case 'ERROR':
	 console.log(chalk.bgRed.black("ERROR"),` ${text}`)
	 break;
	case 'INFO':
	 console.log(chalk.bgBlue.black("INFO"),` ${text}`)
	 break;
	case 'SUCCESS':
	 console.log(chalk.bgGreen.black("SUCCESS"),` ${text}`)
	 break;
 }
}
log("INFO","Gerando pasta publica")
ncp.limit = 16
ncp("./src","./public",err=>{
 if(err){
	log("ERROR","Erro ao gerar pasta publica")
	console.error(err)
 }
 else{
	log("SUCCESS","Sucesso ao gerar pasta publica")
	log("INFO","Mimificando arquivos js,css,html")
	const promises = []
	htmls.map(fileName=>{
	 promises.push(
		minify({
		 compressor:html,
		 input:`./public/${fileName}.html`,
		 output:`./public/${fileName}.html`
		})
	 )
	})
	csss.map(fileName=>{
	 promises.push(
		minify({
		 compressor:css,
		 input:`./public/${fileName}.css`,
		 output:`./public/${fileName}.css`
		})
	 )
	})
	jss.map(fileName=>{
	 promises.push(
		minify({
		 compressor:js,
		 input:`./public/${fileName}.js`,
		 output:`./public/${fileName}.js`
		})
	 )
	})
	Promise.all(promises)
	 .then(()=>{
	 log("SUCESS","Mimificado com sucesso")
	})
	 .catch(err=>{
		log("ERROR","Erro ao mimificar")
		console.error(err)
	 })
 }
})
