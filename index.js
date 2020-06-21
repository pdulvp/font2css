if (typeof require !== "undefined" && typeof exports === 'object' && typeof module === 'object') { 

	var tocss = {
		execute: function(script, args){
			return new Promise((resolve, reject) => {
				let spawn = require("child_process").spawn;
				let ps = spawn("python.exe", [script, args]);
				let result = "";
				let error = "";
				ps.stdout.on('data', function(data) {
					result += data;
				});
				ps.stderr.on('data', (data) => {
					error += data;
				});
				ps.stdout.on("end", function(){
					if (error.length == 0) {
						result = result.replace(/'/g, "\"");
						resolve(JSON.parse(result));
					} else {
						reject(error);
					}
				})
		   });
		},
		
		toCss: function(fontName, prefix) {
			return tocss.execute("getunicode.py", fontName).then(e => {
				let result = e.map(x => {
					return `${prefix}${x.n}:before { content: "\\${x.c.toString(16).toUpperCase()}" }`;
				}).join("\n");
				console.log(result);
				return Promise.resolve(result);
			});
		}
	};

	//export to nodeJs
	if(typeof exports === 'object' && typeof module === 'object') {
		module.exports = tocss;
	}
	
}
