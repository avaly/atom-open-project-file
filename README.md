# atom-open-project-file

Open file under cursor in editor. It handles opening:

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

Useful for projects setting up custom path resolving (e.g. using webpack).

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
