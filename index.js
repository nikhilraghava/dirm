#!/usr/bin/env node
var chalk = require('chalk');
var figlet = require('figlet');
var fs = require('fs');
var inquirer = require('inquirer');
var nodemailer = require('nodemailer');
var path = require('path');
var rimraf = require('rimraf');

// Get e-mail credentials
function getEmailCredentials(callback) {
    var questions = [{
        name: 'service',
        type: 'input',
        message: 'Email service provider (E.g. Gmail, Outlook365):',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your e-mail service provider';
            }
        }
    },
    {
        name: 'username',
        type: 'input',
        message: 'Enter your e-mail address:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your e-mail address';
            }
        }
    },
    {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your password';
            }
        }
    },
    {
        name: 'forward',
        type: 'input',
        message: 'Send e-mail to:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter the destination e-mail address';
            }
        }
    },
    {
        name: 'subject',
        type: 'input',
        message: 'Subject:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter the subject of your email';
            }
        }
    },
    {
        name: 'message',
        type: 'input',
        message: 'Message:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter the subject of your email';
            }
        }
    },
    {
        name: 'attachment',
        type: 'input',
        message: 'Attachment:'
    }];
    // Prompt questions
    inquirer.prompt(questions).then(callback);
}

// Send Email
function sendEmail(serviceProvider, email, password, forward, subject, message, attachment) {
    var transporter = nodemailer.createTransport({
        service: serviceProvider,
        auth: {
            user: email,
            pass: password
        }
    });

    var mailOptions = {
        from: email,
        to: forward,
        subject: subject,
        text: message,
        attachments: [{
            filename: attachment,
            path: attachment
        }]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(chalk.red("Error, something is not right. E-mail was not sent"));
        } else {
            console.log(chalk.yellow('E-mail sent to ' + forward));
        }
    });
}

// Send Email without attachment
function sendEmailWithoutAttachment(serviceProvider, email, password, forward, subject, message) {
    var transporter = nodemailer.createTransport({
        service: serviceProvider,
        auth: {
            user: email,
            pass: password
        }
    });

    var mailOptions = {
        from: email,
        to: forward,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(chalk.red("Error, something is not right. E-mail was not sent"));
        } else {
            console.log(chalk.yellow('E-mail sent ' + forward));
        }
    });
}

function removeAllPrompt(callback) {
    var question = [{
        name: 'remove',
        type: 'input',
        message: 'The directory is not empty, do you want to remove the files and delete it? (Y/n)',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please type (Y/n) to proceed';
            }
        }
    }]

    //Prompt user
    inquirer.prompt(question).then(callback);
}

// Core function
function core() {
    var command = process.argv[2];
    var rfile = process.argv[3];
    var content;

    // No content if no argument is given
    if (process.argv[4] == undefined)
        content = '';
    else
        content = process.argv[4]


    if (command.toLowerCase() == 'create') {
        // Create file
        fs.writeFile(rfile, content, function (err) {
            if (err)
                console.log(chalk.red("Error creating file!"));
            else
                console.log(chalk.yellow(rfile + " has been created successfully"));
        });
    } else if (command.toLowerCase() == 'delete') {
        // Delete file
        fs.unlink(rfile, function (err) {
            if (err)
                console.log(chalk.red("Error deleting file!"));
            else
                console.log(chalk.yellow(rfile + " has been deleted successfully"));
        });
    } else if (command.toLowerCase() == 'create-dir') {
        // Create directory
        fs.mkdir(rfile, function (err) {
            if (err)
                console.log(chalk.red("Error creating directory!"));
            else
                console.log(chalk.yellow("The directory " + rfile + " has been created successfully"));
        });
    } else if (command.toLowerCase() == 'delete-dir') {
        // Delete directory
        fs.rmdir(rfile, function (err) {
            rimraf(rfile, function (err) {
                if (err)
                    console.log(chalk.red("There was an error"));
                else {
                    console.log(chalk.yellow("The directory has been deleted"));
                    console.log(chalk.red("WARNING! The contents of the directory have been removed (if any) while deleting the directory"));
                }
            });
        });
    } else if (command.toLowerCase() == 'email') {
        //Get Email credentials
        getEmailCredentials(function () {
            var serviceProvider = arguments['0']['service'];
            var email = arguments['0']['username'];
            var password = arguments['0']['password'];
            var forward = arguments['0']['forward'];
            var subject = arguments['0']['subject'];
            var message = arguments['0']['message'];
            var attachment = arguments['0']['attachment'];

            if (attachment != '') {
                attachment = process.cwd() + '\\' + attachment;
                fs.stat(attachment, function (err, stat) {
                    if (err == 'ENOENT') {
                        // File does not exist
                        console.log(chalk.red("File to be attached does not exist!"));
                    } else if (err == null) {
                        // File exists
                        try {
                            sendEmail(serviceProvider, email, password, forward, subject, message, attachment);
                        } catch (err) {
                            console.log(chalk.red("Error sending e-mail"));
                        }
                    }
                });
            } else if (attachment == '') {
                try {
                    sendEmailWithoutAttachment(serviceProvider, email, password, forward, subject, message);
                } catch (err) {
                    console.log(chalk.red("Error sending e-mail"));
                }
            }
        });
    } else {
        console.log(chalk.red("Invalid command!"));
    }
}

function bigBang() {
    if (process.argv[2] == null) {
        console.log(chalk.yellow("Lightning speed directory management from the terminal."));
    } else {
        core();
    }
}

// dirm logo
console.log(
    chalk.cyan(
        figlet.textSync('dirm', { horizontalLayout: 'full' })
    )
);

// Initiate the big bang (main function)
bigBang();