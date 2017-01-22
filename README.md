# open-project-file

[![apm](https://img.shields.io/apm/l/open-project-file.svg?style=flat-square)](https://atom.io/packages/open-project-file)
[![apm](https://img.shields.io/apm/v/open-project-file.svg?style=flat-square)](https://atom.io/packages/open-project-file)
[![apm](https://img.shields.io/apm/dm/open-project-file.svg?style=flat-square)](https://atom.io/packages/open-project-file)
[![ci](https://img.shields.io/circleci/project/github/avaly/atom-open-project-file.svg?style=flat-square)](https://circleci.com/gh/avaly/atom-open-project-file)
[![dependencies](https://img.shields.io/david/avaly/atom-open-project-file.svg?style=flat-square)](https://david-dm.org/avaly/atom-open-project-file)

Open file under cursor in Atom.

![Demo Screencast](https://raw.github.com/avaly/atom-open-project-file/master/docs/screencast.gif)

It handles opening:

- files using relative paths:

```js
// /foo/bar.js
import test from './sub/dir/test';
// -> /foo/sub/dir/test.js
```

- files using default project paths:

```js
// /foo/bar.js
import test from 'sub/dir/test';
// -> /sub/dir/test.js
```

- files using custom project paths specified in [`projects.cson`](https://github.com/danielbrodin/atom-project-manager#local-settings-file)

```
{
  title: "Sample Project"
  paths: [
    "/path/to/project"
  ]
  prefixPaths: [
    "/path/to/other"
  ]
}
```

```js
// /path/to/project/foo.js
import test from 'sub/dir/bar';
// -> /path/to/other/sub/dir/bar.js
```

Useful for projects which use custom path resolving (e.g. using [webpack](https://webpack.js.org/configuration/resolve/#resolve-modules)).

## Install

```
$ apm install project-manager
```

You can also open Atom and go to `Preferences` > `Install` and search for `open-project-file`

## Use

Keymaps:

- `ctrl-shift-o`: Opens file under cursor

Commands:

- `open-project-file:open`: Opens file under cursor

## Credits

Inspired by:
- https://atom.io/packages/open-this
- https://atom.io/packages/open-sesame
