import yargs from 'yargs';
import path from 'path';
import inquirer from 'inquirer';
import { openRepository, fetchRemote, getBranches } from './git';
import reviewGoneBranches from './reviewGoneBranches';
import reviewRemoteBranches from './reviewRemoteBranches';

let branches;

async function mainMenu(argv) {
  const goneBranches = branches.locals.filter(branch => branch.gone);
  const remoteBranches = branches.remotes.filter(branch => branch.onTargetRemote);

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      choices: [
        {
          value: () => reviewRemoteBranches(argv, remoteBranches),
          name: `review branches on remote (${remoteBranches.length})`,
        },
        {
          value: () => reviewGoneBranches(argv, goneBranches),
          name: `review tracking branches gone on remote (${goneBranches.length})`,
        },
        {
          value: null,
          name: 'exit',
        },
      ],
      name: 'action',
      message: '[main menu] What would you like to do?',
    },
  ]);

  if (action) {
    const shouldContinue = await action();
    if (shouldContinue) {
      await mainMenu(argv);
    }
  }
}

async function main(argv) {
  console.log('\n\nWelcome to git housekeeper! \n\n');
  const repositoryPath = path.resolve(argv.path);
  await openRepository(repositoryPath);
  await fetchRemote();
  branches = await getBranches();
  await mainMenu(argv);
  console.log('\nBye! \n');
}

yargs
  .command(
    '$0 <path>',
    'starts branch cleanup for the given repository',
    y => {
      y
        .options({
          d: {
            alias: 'dry-mode',
            default: false,
            describe: "Runs in dry mode (won't remove any branches)",
            type: 'boolean',
          },
        })
        .positional('path', {
          describe: 'the path to the repository to analyse',
          type: 'string',
        });
    },
    main,
  )
  .command(
    'process-sheet <path>',
    'Process a Google Sheet previously created with git-housekeeper',
    y => {
      y.positional('path', {
        describe: 'the path to the repository to analyse',
        type: 'string',
      });
    },
    argv => {
      console.log(argv.path);
    },
  )
  .help()
  .wrap(yargs.terminalWidth()).argv;
