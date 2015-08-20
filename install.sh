#!/bin/bash
echo "+------------------------------------------+"
echo "|             prepare folders              |"
echo "|                                          |"
# folders for source files
mkdir src
mkdir src/js
mkdir src/style
mkdir src/style/base
mkdir src/style/component
mkdir src/style/theme
mkdir src/img
mkdir src/font

# folders for production files
mkdir dist
mkdir dist/js
mkdir dist/style
mkdir dist/img
mkdir dist/font

# prepare readme file for kss styleguide
if [ -f src/style/styleguide.md ] 
then
	echo "styleguide readme exists"
else
	touch src/style/styleguide.md
	echo "StyleGuide
==========" >> src/style/styleguide.md
fi

# prepare main script file
if [ -f src/js/main.js ]
then
	echo "main script file exists"
else
	touch src/js/main.js
	echo "(function(){
	
	'use strict';

	var dump = function(message) {
		/*jshint devel:true */
		console.log(message);
	};

	dump('Works!');

})();" > src/js/main.js
fi	

# prepare main less style file
if [ -f src/style/main.less ] 
then
	echo "main style file exists"
else
	touch src/style/main.less
	echo "/**
Heading

This is H1 style

Markup:
<h1>Test KSS</h1>

Styleguide Heading
*/
h1 { color: red; }" > src/style/main.less
fi

echo "+------------------------------------------+"
echo "|               npm install                |"
echo "|                                          |"

npm install --silent
npm update --silent --depth=0

echo "+------------------------------------------+"
echo "|              bower install               |"
echo "|                                          |"

bower install

echo "+------------------------------------------+"
echo "|  DONE! Now you can run 'grunt' command   |"
echo "|------------------------------------------|"