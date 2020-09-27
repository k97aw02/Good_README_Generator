const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./dev/generateMarkdown");

const questions = [
    {
        type: "input",
        message: "What is the title of your project?",
        name: "title"
    },
    {
        type: "input",
        message: "Enter a description.",
        name: "description"
    },
    {
        type: "input",
        message: "What are the installation guidelines?",
        name: "install"
    },
    {
        type: "input",
        message: "What is your application used for?",
        name: "usage"
    },
    {
        type: "checkbox",
        message: "Select a license",
        name: "license",
        choices: [
            'Apache License 2.0', 
            'GNU General Public License v3.0', 
            'MIT license', 
            'BSD 2-Clause "Simplified" License', 
            'Boost Software License 1.0', 
            'Creative Commons Zero v1.0 Universal', 
            'Eclipse Public License 2.0', 
            'GNU Affero General Public License v3.0', 
            'GNU General Public License v2.0', 
            'GNU Lesser General Public License v2.1', 
            'Mozzila Public License 2.0',
            'The Unilicense',
        ]
    },
    {
        type: "input",
        message: "Who is(are) the author(s)?",
        name: "author"
    },
    {
        type: "input",
        message: "What are the rules for contributing?",
        name: "contribute"
    },
    {
        type: "input",
        message: "Tests",
        name: "test"
    },
    {
        type: "input",
        message: "enter github user name",
        name: "githubUserName"
    },
    {
        type: "input",
        message: "enter contact e-mail address.",
        name: "email"
    },
    {
        type: "input",
        message: "Enter instructions on how to reach you for any questions",
        name: "questions"
    }

];

function licenseBadge(data) {
  switch (data.licenseLevel) {
    case "GNU AGPLv3":
      data.licenseLevel +=` [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)`;
      return data;

    case "GNU GPLv3":
      data.licenseLevel += ` [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
      return data;

    case "GNU LGPLv3":
     data.licenseLevel +=` [![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)`;
      return data;

    case "GNU FDL v1.3":
      data.licenseLevel +=` [![License: FDL 1.3](https://img.shields.io/badge/License-FDL%20v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)`;
      return data;

    case "Mozilla Public License 2.0":
      data.licenseLevel +=` [![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
      return data;

    case "Apache License 2.0":
      data.licenseLevel +=` [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
      return data;

    case "MIT License":
      data.licenseLevel +=` [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
      return data;

    case "Boost Software License 1.0":
      data.licenseLevel +=` [![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`;
      return data;

    case "Unlicense":
      data.licenseLevel +=` [![License:](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`;
      return data;
    
    default:
      return ` No license selected, default exclusive copyright in place`;
  }
}

// function to write README file
function writeToFile(fileName, data) {
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// function to initialize program
function init() {
    
    try{
        inquirer.prompt(questions).then(data => {
            const filename = './assets/README.md'
            fs.writeFile(filename, generateMarkdown(data), err => {
                if (err) {
                    console.log('ERROR: Could not write README'); 
                } else {
                    console.log('Success! You now have an very well written README')
                }
            });

        });

    }
    catch(error){
        console.log(error);
    }
    finally{
        return `You've created a well written README! Thank you for using the Good_README_Generator.`
    }
};

init();
// function call to initialize program
