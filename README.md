# Git Housekeeper
Keeping your git repository clean can be a pain, especially when working with large teams and large codebases.
Are you lost in the giant pile of outdated branches of remote? Tired of asking all your team members to clear their unused branches?
Git Housekeeper is here to help!

## Available utilities
### Review branches on remote
This utility helps you review all the branches on remote, and remove any unused branches if necessary.
#### Using Google Sheets
> To use the Google Drive and Sheets apis, you will need to generate your own OAuth client ID in the Google Developers Console.
> Please follow the instructions here <TODO: insert link>.

1. A Google Sheet will be generated by Git Housekeeper containing information on all remote branches.
[Click here to see an example sheet](https://docs.google.com/spreadsheets/d/1yptzd3ytvXT8ydxVdXOyPYt3sZu0jHrkslLn_Cil6IQ/edit?usp=sharing)
2. Share this Google Sheet with your team. You can now collaboratively decide which branches to keep by selecting either `KEEP` or `DELETE`
in the action column of each row. The row will turn red or green depending on the selected action.
3. Return to Git Housekeeper to process the sheet. It will list all the branches that have been marked with `DELETE`, and (after your
confirmation) batch delete all those branches.

#### Interactive mode
If you would rather not use Google Sheets and review the remote branches by yourself, you can run in interactive mode. Select
"ask me which branches I would like to keep" from the menu.

### Review tracking branches gone on remote
Sometimes a local branch is tracking a branch on remote, but the remote branch is already gone. This can often happen when the branch
is finished on another machine, or if the branch has been merged using a web interface. This utility lists all those branches, and if
needed cleans them all up in one batch!

## Installation
 - Install Node.JS v6.0.0 or higher
 - Install the git-housekeeper package __globally__ by running `npm install -g git-housekeeper`

## Usage
Run one of the commands listed below. Then follow the on-screen instructions
#### Commands
 - `git-housekeeper [options] <path>` run git-housekeeper on the given repository
 - `git-housekeeper process-sheet [options] <path>` process a Google Sheet previously created with git-housekeeper

#### Arguments:
 - `path` [string] the path to the repository to analyse, relative to the current working directory.

#### Options
 - `-d, --dry-run` Executes a dry run (won't remove any branches) _defaults to `false`_
 - `--version` Show version number
 - `--help` Show help
