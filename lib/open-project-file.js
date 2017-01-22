'use babel';

import { CompositeDisposable } from 'atom';
import CSON from 'season';
import isEqual from 'lodash.isequal';
import fs from 'fs';
import path from 'path';

const PATH_REGEX = /[\/A-Z\.\d-_]+(:\d+)?/i;

function getPathUnderCursor() {
  const editor = atom.workspace.getActivePaneItem();
  return editor.getSelectedText() || editor.getWordUnderCursor({
    wordRegex: PATH_REGEX,
  });
}

function findFileByPrefix(filePrefix) {
  if (fs.existsSync(filePrefix)) {
    return filePrefix;
  }
  else {
    const editor = atom.workspace.getActiveTextEditor();
    let extensions = [];

    let ext = path.extname(editor.getURI());
    if (ext) {
      extensions.push(ext.substr(1));
    }

    const {scopeName} = editor.getGrammar();
    const grammar = atom.grammars.grammarForScopeName(scopeName);
    if (grammar.fileTypes) {
      extensions = extensions.concat(grammar.fileTypes);
    }

    ext = extensions.find(
      ext => fs.existsSync(`${filePrefix}.${ext}`)
    );
    if (ext) {
      return `${filePrefix}.${ext}`;
    }
  }

  return null;
}

function buildRelativePath(fileName) {
  const editor = atom.workspace.getActiveTextEditor();
  const dirName = path.dirname(editor.getURI());
  const filePath = path.resolve(dirName, fileName);
  return findFileByPrefix(filePath);
}

export default {

  subscriptions: null,
  projectsConfig: null,

  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'open-project-file:open': () => this.open()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  getProjectsConfig() {
    const fileDir = atom.getConfigDirPath();
    const filePath = `${fileDir}/projects.cson`;

    return new Promise((resolve) => {
      if (this.projectsConfig) {
        return resolve(this.projectsConfig);
      }
      CSON.readFile(filePath, (err, data) => {
        this.projectsConfig = err ? [] : data;
        resolve(this.projectsConfig);
      });
    });
  },

  buildCustomPath(filePath) {
    const projectPaths = atom.project.getPaths();
    const project = this.projectsConfig.find(
      project => isEqual(project.paths, projectPaths)
    );

    let prefixPaths = [].concat(projectPaths);
    if (project) {
      if (project.paths) {
        prefixPaths = prefixPaths.concat(project.paths);
      }
      if (project.prefixPaths) {
        prefixPaths = prefixPaths.concat(project.prefixPaths);
      }
    }

    for (var i = 0; i < prefixPaths.length; i++) {
      const fullPath = findFileByPrefix(`${prefixPaths[i]}/${filePath}`);
      if (fullPath) {
        return fullPath;
      }
    }

    return null;
  },

  buildPath(filePath) {
    if (filePath.match(/^\./)) {
      return buildRelativePath(filePath);
    }
    else {
      return this.buildCustomPath(filePath);
    }
  },

  open() {
    this.getProjectsConfig()
      .then(() => {
        const filePath = getPathUnderCursor();
        const pathToOpen = this.buildPath(filePath);
        if (pathToOpen) {
          atom.workspace.open(pathToOpen);
        }
      });
  }

};
