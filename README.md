# red-string
A research and investigational app that uses visual data to describe relationships between documents.

## Contents

* Using red-string
    * Submitting documents
    * Selecting and submitting tags
    * Viewing a stringmap
    * Saving stringpaths
* How red-string works
    * LOL (Language-obtaining layer)
    * SQL
    * React and D3
* Who made red-string?
    * About us
    * Contact us


## Using red-string

### Creating a case

On the home page, scroll down until you see the "New Case" button. Click the button, enter a case name and a brief description, and click "Create New Case". You will be redirected to the home page, where you can select which case you would like to view.

### Submitting and viewing files

On the home page, click on the case you would like to add a file to. On the left-hand side of the page, you will see a list of the files already available for view. Click a filename to bring up a stringmap of that file. To add a new file, click on "Add File". In the form field, click the "Upload" button to choose a file to add to the case, add a name and description, and click "Submit".

### Viewing tags



  ### Viewing a stringmap
  ### Saving stringpaths

## How red-string works

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


  ###React and D3


## Who made red-string?

### About us

red-string was developed in September/October 2017 by Stephen Boynton, Nick Nauert and Ryan Kelley as a final project at the Iron Yard, a 3-month full-stack programming course.

### Contact us
  Stephen Boynton: www.stephenboynton.com
  Nick Nauert: https://nicknauert.github.io/PortTwoFolio/
  Ryan Kelley: www.rtkelley.com
