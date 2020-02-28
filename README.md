


A GitHub app to wrap and execute other MPages CI GitHub apps.

# Contents <!-- omit in toc -->

- [Current Apps](#current-apps)
  - [feature-tracker-automation](#feature-tracker-automation)
    - [Configuration](#configuration)
    - [Tasks](#tasks)
      - [Artifact.meta Validation](#artifactmeta-validation)
  - [auto-assign-reviewers](#auto-assign-reviewers)
    - [Configuration](#configuration-1)
  - [pull-request-check](#pull-request-check)
  - [gaia-json-file-check](#gaia-json-file-check)
- [Development Guide](#development-guide)
  - [Getting Started](#getting-started)

# Current Apps

## feature-tracker-automation

`feature-tracker-automation` is part of the MPages CI Feature Tracker Automation
[process](https://github.cerner.com/MPagesEcosystem/feature-tracker-automator/wiki/MPages-CI-Feature-Tracker-Automation) and runs
as the entry point to the majority of its tasks. {TO COMPLETE}

### Configuration

```yaml
feature-tracker-automation:
  # Through the Feature Tracker Automation - "Artifact.meta Validation" task: Pull request file changes to the following files (by
  # regular expression) will cause pull request warning messages when no project component list (in the artifact.meta file's
  # 'projects' list) contains the file. If the pull request modifies the artifact.meta file, the modified file is used to perform
  # this check. Otherwise, the 'master' version of the artifact.meta file is used to perform this check. This list is meant to be
  # a "best guess" of the repository location of files that should likely be part of a 'projects' property value (i.e., files that
  # should likely be part of a Feature Tracker Project). If this app's 'warn' setting is set to false, this list is ignored.
  whitelist: [<regex>]

  # Whether the artifact.meta file is required to be in the repository. Default: false
  required: <boolean>

  # Whether pull request warnings should be posted at all. Default: false
  warn: <boolean>
```

### Tasks
#### Artifact.meta Validation

This task validates the correctness of the triggering repository's `artifact.meta` file's `projects` property value. When the
value is invalid, this task prevents the pull request's merge to `master`. Of course, not all MPages-related GitHub organizations
and repositories fully participate in MPages CI Feature Tracker automation, so validation does not always occur. For a list of
organizations and repositories through which this task does run, as well as information regarding what makes an artifact.meta
file's 'projects' property value valid or invalid, see [MPages CI - Feature Tracker Automation - artifact.meta](https://github.cerner.com/MPagesEcosystem/feature-tracker-automator#artifact.meta).

Note: _Other artifact.meta file property values are not validated through this task._

## auto-assign-reviewers

This app attempts to automatically assign reviewers to a pull request when a specific label is added to the PR
(currently this label is "ready to merge"). It will use the [team(s)](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams/organizing-members-into-teams)
referenced by id in the config settings per GitHub org (or repo) to pick reviewers. It will check if there are
reviewers already requested and if so, it will compare the number of reviewers to the amount requested per the config
settings. If the number of reviewers already on the PR is less than the requested total, it will grab the current
reviewers (if any), and it will not attempt to add those same people again, nor will it try to add the PR author as a
reviewer. Then it will add the requested number of reviewers per team in the config settings. Once the reviewers
have been chosen, it will save off the index of the next person in the list to allow for a rotation of reviewers.

### Configuration

The settings for assigning reviewers can be setup per GitHub org or repo. If a new setting is needed, a new
`repos` section should be created with the org or repo(s) listed below it. Then a `teams` section is needed which
lists the id and number of reviewers to pull from each list per Pull Request (PR).

If any PR is found to have less than the total of the reviewers listed in the teams section (in the below case,
total of 2), then the reviewers will be added per the config. If the PR already has that many reviewers (or more)
no new reviewers will be added. In the below example, team names were added as a comment to make it clear what
team the id is referring to.

```yaml
- repos:
      - MPagesAssemblies
    teams:
      - id: 8358 # BLR Mergers
        reviewers: 1
      - id: 8357 # KC Mergers
        reviewers: 1
```

## pull-request-check

This app checks two things on Pull Requests (PRs). It checks the title and body to see if they match our
[expectations](https://github.cerner.com/MPagesEcosystem/mpages-process-guide/blob/master/pr-expectations.md).
If either of the checks fail, a comment is added to the PR indicating what's wrong and how to fix it.

## gaia-json-file-check

This app attempts to automatically review gaia.json file from the pull request and check whether the program parameter is in the correct format. If it is incorrect format i.e. if the program parameter includes  extra parts like `MPAGES_X_XX|MPAGES_WORKLIST_X_XX`
it will reflect using statuses and comment is added to the PR indicating what's wrong and how to fix it.

# Development Guide

## Getting Started

Developing for the MPages CI GitHub app involves developing a (mostly) standalone GitHub app through the Probot framework. If you
are new to GitHub app development, a good place to start may be the following:

- [GitHub Apps](https://developer.github.com/apps/) - General GitHub app development documentation
- [Probot](https://probot.github.io/docs/) - A framework for developing GitHub apps in Node.js

We have built `mpages-ci-github-app` through the Probot framework, which simplifies receiving and handling GitHub event payloads
and allows developers to focus on their app logic, rather than receiving GitHub events and authenticating access to the GitHub API.
If you are not familiar with Probot, definitely check out the above Probot link, where there is not only an introduction to Probot
and a Hello World example, but also references to more advanced topics like simulating receiving webhooks (for testing) and using
persistent data. Once you have a handle on what Probot does, you might also check out these additional references, as this is
the GitHub data your app will have access to:

- [Context](https://probot.github.io/api/latest/classes/context.html) object - The context of the GitHub event triggered,
  including the event payload, an authenticated [octokit/rest](https://octokit.github.io/rest.js/) instance, and various helper
  functions.
- [Events](https://developer.github.com/webhooks/#events) - GitHub events supported by GitHub apps.

For help getting started with adding a new app to this repo, [see our Wiki](https://github.cerner.com/MPagesEcosystem/mpages-ci-github-app/wiki)

