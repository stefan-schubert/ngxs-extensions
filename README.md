# ngxs-extensions

[![Build Status](https://travis-ci.org/stefan-schubert/ngxs-extensions.svg?branch=master)](https://travis-ci.org/stefan-schubert/ngxs-extensions)
[![NPM](https://badge.fury.io/js/%40ngxs-extensions%2Fdecorators.svg)](https://www.npmjs.com/package/@ngxs-extensions/decorators)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/stefan-schubert/ngxs-extensions/blob/master/LICENSE)

Extends @ngxs/store with decorators and maybe some time with other things...

## @ResetStateToDefault
Resets a state to default on method call. Can be used to reset a detail state on destroying of a detail view.

```
@ResetStateToDefault(DetailState)
ngOnDestroy() {
  // cleanup other things...
}
```
