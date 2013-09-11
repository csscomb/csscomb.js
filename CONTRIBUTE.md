# Contributing to CSSComb

<a name="pull-requests"></a>
## Pull requests

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork, and configure the remotes:
```bash
# Clone your fork of the repo into the current directory
git clone https://github.com/<your-username>/csscomb.js
# Navigate to the newly cloned directory
cd csscomb.js
# Assign the original repo to a remote called `upstream`
git remote add upstream https://github.com/csscomb/csscomb.js
```

2. If you cloned a while ago, get the latest changes from upstream:
```bash
git checkout dev
git pull upstream dev
```
**IMPORTANT**: We are using `dev` branch for development, not `master`.

3. Create a topic branch for your feature, change, or fix:
```bash
git checkout -b <topic-branch-name>
```

4. Patches and features will not be accepted without tests.
   Run `npm test` to check that all tests pass after you've made changes.

5. Update the `README.md` if there were corresponding changes or new options.

6. Locally rebase the upstream development branch into your topic branch:
```bash
git pull --rebase upstream dev
```

7. Push your topic branch up to your fork:
```bash
git push origin <topic-branch-name>
```

8. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) to a `dev` branch with a clear title and description.

<a name="maintainers"></a>
## Maintainers

### Submitting changes

1. All non-trivial changes should be put up for review using GitHub Pull Requests.
2. Your change should not be merged into `dev`, without at least one "OK" comment
   from another maintainer/collaborator on the project.
3. Once a feature branch has been merged into its target branch, please delete
   the feature branch from the remote repository.

### Releasing a new version

1. Include all new functional changes in the CHANGELOG.
2. Use a dedicated commit to increment the version. The version needs to be
   added to the `CHANGELOG.md` (inc. date) and the `package.json`.
3. The commit message must be of `v0.0.0` format.
4. Merge `dev` into `master`.
5. Create a tag for the version: `git tag v0.0.0`.
6. Push the changes and tags to GitHub: `git push origin dev master v0.0.0`.
7. Publish the new version to npm: `npm publish`.
