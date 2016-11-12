# Factwings
Factwings is a REST service for the CIA World Factbook data.

It is based on the JSON country data https://github.com/opendatajson/factbook.json .

You need to install a MongoDB database that is running on localhost:27017 .
Import the JSON data into your MongoDB with the Bash script factbookImport.sh.

You can start the Express REST webservice with:

node index.js

After that you can access individual countries via: http://localhost:3000/factbook/{id}

{id} is the internet domain name of the country.

So to access the data from Germany, enter: http://localhost:3000/factbook/de

## Known issues

It does not work with France.

## Trademark

Factwings is a trademark of Thomas Derflinger.
