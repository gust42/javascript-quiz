var fs = require("fs");

var file = "../SJSJ/data.json";
fs.readFile(file, 'utf8', function(err, contents) {
    if(err)
        console.log(err);
    var c = JSON.parse(contents);
    
    var entries = [];
    for(var i in c) {
        var title = /title: .+/g.exec(c[i].markdown);
        var text = /excerpt: .+/g.exec(c[i].markdown);
        entries.push({
            title : title[0].replace("title: ",""),
            text : text[0].replace("excerpt: ","")
        });
    }
    
    fs.writeFile("./data.json", JSON.stringify(entries),function(err){
        console.log("data.json written");
    });
});