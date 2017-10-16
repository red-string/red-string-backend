# Name of app: redString

## Type of app:

Visual representation of relationships between user-submitted documents.

## Description:

Users will be able to submit text documents or PDFs; the app will use NLP and RegEx to generate a list of tags, and users will be able to add their own tags. After the user has completed reviewing and editing the list of tags, the app will produce a "stringmap" from that document, with links to other documents which have the same tag. This will allow users to see the various relationships between documents and tags.

##Technologies:

* React/Redux
* D3
* CSS
* IBM Watson API
* Regular expressions
* JavaScript
* SQLite 3
* Node.js
* Document conversion modules: docxtemplater, PDF.js

##Features/MVP:
* Submit documents in word and raw text form
* Extract text from word files
* Natural language processing and returning tags from file text
* Save tags/data to database
* Retrieve tags and data from database
* Generating stringmap based on tags
* Ability to click through stringmap to view relationships between documents and tags (2 layers)

##Reaches:
* Ability to select, reject and manually add to and edit list of generated tags
* Electron wrapper
* Ability for user to save "routes" through stringmap
* Different models of data visualization: timeline, map
* OCR and image metadata tag generation

##User stories
* Create file schema for database (done)
* Create functions for retrieving and saving data to database (to do)
* Create functions for retrieving raw text from word documents (to do, kinda)
* Create regular expressions for generating formatted tags (done)
* Create NLP API calls to Watson API for tag generation (to do)
* Creating stringmap from tags and filenames (to do)
* D3 map canvas with dragging and zoom
* UI: navbar, file upload, viewing files and tags (select menu)
* Colors and styling (white and black with splashes of red)
* Map exploration: draggable D3 canvas


## Priorities
* Create a RegEx build from start to finish; fitting all the pieces that we have built working together.
* Return later to API calls, but first focus should be on getting a build working.
