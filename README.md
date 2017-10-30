```
                        _______ __       _            
         ________  ____/ / ___// /______(_)___  ____ _
        / ___/ _ \/ __  /\__ \/ __/ ___/ / __ \/ __ `/
       / /  /  __/ /_/ /___/ / /_/ /  / / / / / /_/ /
 _____/_/   \___/\__,_//____/\__/_/  /_/_/ /_/\__, /  
/_____/                                      /____/   
```

# redString
redSting is a research and investigational app that uses visual data to describe relationships between documents.

redString was inspired by the age-old trope of the "investigation" room in every cop drama ever made: walls lined with photographs, files and scribbled notes, all connected with thumbtacks and pieces of red string. In this case (ha!), instead of tacking paper to a wall, users upload text files and redString uses natural language processing to generate a dynamic map of relevant tags.  

## Contents

* Using redString
    * Creating a case
    * Submitting and viewing files
    * Viewing and navigating stringmaps
      * Layout
      * Routes
* How redString works
    * LOL (Language-obtaining layer)
    * SQL
    * React and D3
* Who made redString?
    * About us
    * Contact us


## Using redString

### Creating a case

On the home page, scroll down until you see the "New Case" button. Click the button, enter a case name and a brief description, and click "Create New Case". You will be redirected to the home page, where you can select which case you would like to view.

### Submitting and viewing files

In the main window on the home page, click on the case you would like to add a file to. On the left-hand side of the page, you will see a list of the files already available for view. Click a filename to bring up details of that file. To add a new file, click on the plus (+) icon and choose either "Manually enter text" or "Upload a file".

To create a text file manually, select "Manually enter text", and type the text you would like to save into the text box. Next, enter a file name and a short description and click "submit".

To upload a PDF or Word document, select "Upload a file" and choose the filetype you would like to submit. Next, click the "Upload" button to select a file from your computer to upload. Finally, enter a new file name if you wish, and a short description, and click "submit".

After clicking "submit", you will see the file appear in the sidebar, under "Files". Click on a file name to see more information about the file and to view a stringmap.

### Viewing and navigating stringmaps

To view a stringmap, choose a case from the main page and click on a file under "Files" in the sidebar. Click on the graph icon to the right of the file name. You will be taken to a stringmap of the file and its tags.

#### Layout

The original file appears at the center of the stringmap, with its related tags splayed out around it and connected with red strings. Tags are color-coded by frequency: white tags occur least frequently, grey tags appear more frequently, and red tags appear most frequently. The map is draggable and zoomable; click on a tag to highlight it.

The sidebar contains a list of related tags and files; in the upper right corner of the stringmap view, your route's history is displayed.

#### Routes

To select a tag, select it from the sidebar; a new map will be generated from that tag, with related files extending out from it. Similarly, to select another file from the map related to the selected tag, simply click on the file name in the sidebar.

As you click on new tags and files, a route will be generated under the Route heading; to return to a previous point in the route, click on the file or tag in the route to return.

## How redString works

### LOL (Language-obtaining layer)

The LOL (heh!) is run in Node.js. First, raw text is pulled from the submitted document, and the first set of tag filters is created using regular expressions; the RegEx filters return tags of phone numbers, web addresses and email addresses. These tags are packaged into objects that also contain metadata about the file that they are associated with.

The second set of tags is created through a Python child process that uses the Natural Language Toolkit (NLTK) library to tag all of the words in the file with part-of-speech tags. Included in the POS tags are special NER (named entity recognition) tags, which identify people, organizations and locations in the text. The NER tags are scrubbed with another set of RegEx filters and inserted into tag objects, which are then ready to be inserted into the SQL database.

### SQL
  For the creation of Cases, Files, Tags and Routes, the data structure required by the Data Access Layer is as follows:

  ``` javascript
  caseObject = {
    case_name: "Name",
    case_description: "description",
  }

  fileObject = {
    case_id: associated_case_id,
    file_name: "File name",
    file_description: "file description",
    file_text: "Not required, if manually entered text"
  }

  tagObjectArray = [
      {
        tag: "tag",
        file_id: associated_file_id,
        case_id: associated_case_id
      },
      {
        tag: "tag2",
        file_id: associated_file_id,
        case_id: associated_case_id
      }
    ];

    routeObject = {
      case_id: associated_case_id,
      route: "f1, t1, f2, t8",
      route_name: "Route name",
      route_description: "This is the route description"
    }

  ```


### React and D3

The stringmaps are generated using D3, a JavaScript library for data visualization and data-driven transformation. A React library called React-Vis-Force was used to integrate the D3 graphs into the React components that comprise the app, since D3 and React don't generally play nicely together!

## Who made redString?

### About us

redString was developed in September/October 2017 by Stephen Boynton, Nick Nauert and Ryan Kelley as a final project at the Iron Yard, a 3-month full-stack programming course, and presented on Demo Day at the Harbor Entrepreneur Center on November 2, 2017.


### Contact the redString team
  * [Stephen Boynton](https://www.stephenboynton.com)
  * [Nick Nauert](https://nicknauert.github.io/PortTwoFolio/)
  * [Ryan Kelley](www.rtkelley.com)
