function importMongo {
	mongoimport --db factwings --collection restaurants --file $1
}


function traverseFolder {
	cd restaurants-data

	for f in *.json; 
	  do echo "Processing $f file.."; 
	  importMongo $f
	done	

	cd ../
}

mongo factwings --eval "db.dropDatabase();"

traverseFolder
