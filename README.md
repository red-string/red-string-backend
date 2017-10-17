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
  ### Submitting documents
  ### Selecting and submitting tags
  ### Viewing a stringmap
  ### Saving stringpaths

## How red-string works

### LOL (Language-obtaining layer)

The LOL (heh!) is run in Node.js, and uses a mix of regular expressions (RegEx) and a natural language processing API called Parallel Dots to return a series of suggested tags from submitted documents.

  ###SQL
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
