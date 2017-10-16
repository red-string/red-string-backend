# redString

## Type of app:

Visual representation of relationships between user-submitted documents.

## Description:

Users will be able to submit text documents or PDFs; the app will use NLP and RegEx to generate a list of tags. A "stringmap" will then be produced from that document and its tags, with links to other documents which have generated the same tags. This will allow users to see the various relationships between documents and tags.

## Technologies:

* React/Redux: front-end development
* SQLite 3: data management
* D3: data visualization
* Python: Parallel Dots API wrapper for natural language processing
* Regular expressions: data filtration and natural language processing
* CSS: styling
* Node.js: back-end and document conversion
* Document conversion modules: docxtemplater, PDF.js
* JavaScript: data access layer functionality

## Features

### MVP:
* Submit documents in word and raw text form
* Extract text from word files
* Natural language processing and returning tags from file text
* Save tags/data to database
* Retrieve tags and data from database
* Generating stringmap based on tags
* Ability to click through stringmap to view relationships between documents and tags (2 layers)

### Reaches:
* Ability to select, reject and manually add to and edit list of generated tags
* Electron wrapper
* Ability for user to save "routes" through stringmap
* Different models of data visualization: timeline, map
* OCR and image metadata tag generation

## User stories

### Select whether to upload a new file or view a previous file
#### Size
Small
#### Value statement
As a user, when I open the app I need to be able to choose whether I wish to submit a new file or view details about a file I have already uploaded.
#### Assumptions
None
#### Acceptance
* User can click on a button for "upload new file" and be taken to the File Upload screen.
* User can click on a button for "view previous file" and be taken to the View File screen.


### Select the option to upload a new file
####Size
Small
#### Value statement
As a user, at any time and from any portion of the app, I should have the ability to upload a new file by clicking on a button which is always located in the top right corner of the screen. It should be consistently located and easy to identify.
#### Assumptions
None
#### Acceptance
* "Upload new file" button is easily visible on every page of the app.
* Clicking the button will activate the "upload file" view.


### Upload files to database (done)
#### Size
Medium
#### Value statement
As a user, I need to be able to upload and store information about the files I submit to the application. This includes file ID, case ID, associated tags, date created and date modified.
#### Assumptions:
The user must have a text or word file that they wish to upload.
#### Acceptance:
* User can specify a file from their computer that they wish to upload.
* User can successfully upload the file and have the file and associated information appear in the app for later viewing.


### Automatically generate tags based on file contents
#### Size:
Large
#### Value statement:
As a user, I need to be able to generate tags related to the text of the file I am uploading. This will allow me to view files related by tag.
#### Assumptions:
The user must have uploaded a text or word file that contains text for natural language analysis.
#### Acceptance:
* Text is successfully filtered through regular expressions and natural language API to return an array of keywords/tags.
* Keywords/tags are successfully added to the database as part of the file schema.
* Tags can be accessed by the stringmap and the "file detail" view.


### Retrieve and view tag information (to do)
#### Size:
Medium
#### Value statement:
As a user, I need to be able to see a list of tags which have been previously generated for files in the database. I need to be able to select a tag from the list, and see a list of files which are associated with that tag.
#### Assumptions:
The user must have successfully uploaded a file to the database, and tags must have been successfully (automatically) generated for that file.
#### Acceptance:
* User can view a list of previously-generated tags.
* User can select a tag from the list of available tags.
* Upon selection, files associated with the tag become visible.


### Retrieve and view file information (to do)
#### Size:
Medium
#### Value statement:
As a user, I need to be able to view information about files that I have previously uploaded to the database. This includes file ID, case ID, associated tags, date created and date modified.
#### Assumptions:
The user must have successfully uploaded a file to the database that they wish to view.
#### Acceptance:
* User can view a list of previously-uploaded files.
* User can select a file from the list of available files.
* Upon selection, more details about the file become visible.


### View stringmap from tags and filenames (to do)
#### Size:
Large
#### Value statement:
As a user, I need to be able to view a stringmap which shows the relationships between a selected file and its associated tags.
#### Assumptions:
The user must have successfully uploaded a file. The user must have selected a specific file for viewing in a stringmap.
#### Acceptance:
* User can view a stringmap containing a file at its center and associated tags branching out from the central file.
* User can click on a tag to open its associated relationships.

### Navigate through stringmap
#### Size:
Medium
#### Value statement:
As a user, I must be able to change my view of the initial stringmap by opening and closing related nodes to view the relationships between various tags and files. When I click on a tag that is related to the selected file, I should be able to see more files that share the same tag, and vice versa.
#### Assumptions:
The user must be looking at a stringmap, and there must be more than one file associated with the tag that they wish to view.
#### Acceptance:
* The user can toggle between tags and files to view their respective relationships.
* There are at most two levels of map open; as the user clicks further "down" one route, "higher" modules automatically close to avoid cluttering the map.

### View map canvas with dragging and zoom
#### Size:
Medium
#### Value statement:
As a user, I should be able to zoom in and out of the stringmap and drag the viewport to different parts of the map.
#### Assumptions:
The user is viewing a stringmap that has more than one open nodule.
#### Acceptance:
* The user can use the mouse/keyboard to change their view of the stringmap.





## Priorities
* Create a RegEx build from start to finish; fitting all the pieces that we have built working together.
* Return later to API calls, but first focus should be on getting a build working.
