function importMongo {
	mongoimport --db factwings --collection factbook --file $1
}


function traverseFolder {
	cd factbook.json/$1

	for f in *.json; 
	  do echo "Processing $f file.."; 
	  importMongo $f
	done	

	cd ../../
}

mongo factwings --eval "db.dropDatabase();"

traverseFolder africa
traverseFolder antarctica
traverseFolder australia-oceania
traverseFolder central-america-n-caribbean
traverseFolder central-asia
traverseFolder east-n-southeast-asia
traverseFolder europe
traverseFolder middle-east
traverseFolder north-america
traverseFolder south-america
traverseFolder south-asia









