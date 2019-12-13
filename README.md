# ohce-cli-app
Our solution for GuideSmiths 2019 Christmas Challenge - **ohce-kata**.

### Usage
Just install the app globally `npm i ohce-cli-app -g` in your machine and the `ohce` command will be available. (the app-package is available in NPM)

Example:

`ohce Felipe` will launch the app.

`ohce Glenn --language=en` will launch the app in English.

`ohce Peter -l hu` will launch the app in Hungarian.

### Solution criteria:

- **commits quality**: We have followed our **GS commit template** (prefix: title | description | ticketNº), so it´s really easy to track changes in our repo, we´ve committed often (74 commits at the time this readme is written), one commit per each relevant change.
- **TDD driven**: We have used a TDD approach from the very beginning. Reviewing commits history shows how we always wrote a test (specially e2e) to check every new feature. We check it failing and then we implement the necessary changes in our code until our cli app passes the tests.
- **pairing**: Our collaboration can be reviewed through the different pull requests & issues discussions. Commits history is not the only way to check for "pairing".
- **test design quality**: Our approach has been testing production code without non-sense mocks. This means that we have unit tests for our functions (single responsibility, input-output) and, for the highly valuable e2e tests, we use Mocha as the test runner. Mocha process spawns our cli-app as a child process so we can feed it with inputs and check for the right output. We use Node IPC (Inter Process Communication) to be able to simulate different hours by monkey-patching the getCurrentHour function in test env using a pub-sub pattern. Our test suite covers every feature/case due to the TDD approach.
We have also added CI testing in our repo that is triggered for every PR.
- **software design quality**: We have followed clean code best practices and tried to keep things as modular as possible. We have curryfied all the functions that were suitable for it because we do not want to repeat ourselves and Felipe loves curry.

Besides that, our cli-app, obviously, meets all the requirements that were specified in the original kata-specs. 

But we have gone further and implemented a few more features that make our ohce app cooler.
- It handles palindromes even when they are a whole sentence with commas and other non-alphanumeric characters.
- It chalks the output to put a little bit of color in your life.
- It supports language options, default is Spanish but you can get ohce to answer you using English or Hungarian, yes, Hungarian!!
- It shows suggestions when you type in something similar to a known command like "stop".
- It shows documentation to let the user know the available commands and how to use them.

We have set a **CI pipeline** to run our test suite with GitHub actions and a **CD pipeline** too for automating the app-package publishing to NPM (https://www.npmjs.com/package/ohce-cli-app) triggered by each new release.

A Kanban board has been our tool to manage project issues, milestones and PRs. Each commit is related to at least one issue by its id#.

We hope you like it,

Lots of love ❤️,
Carlos & Daniel

## kata-requirements
**ohce** is a console application that echoes the reverse of what you input through the console.

Even though it seems a silly application, **ohce** knows a thing or two.

1. When you start oche, it greets you differently depending on the current time, but only in Spanish: 
    - Between 20 and 6 hours, **ohce** will greet you saying:  *¡Buenas noches < your name >!*
    - Between 6 and 12 hours, **ohce** will greet you saying:  *¡Buenos días < your name >!*
    - Between 12 and 20 hours, **ohce** will greet you saying:  *¡Buenas tardes < your name >!*
2. When you introduce a palindrome, **ohce** likes it and after reverse-echoing it, it adds *¡Bonita palabra!*
3. **ohce** knows when to stop, you just have to write *Stop!* and it'll answer *Adios < your name >* and end.

This is an example of using **ohce** during the morning:

    $ ohce Pedro
    > ¡Buenos días Pedro!
    $ hola
    > aloh
    $ oto
    > oto
    > ¡Bonita palabra!
    $ stop
    > pots
    $ Stop!
    > Adios Pedro
