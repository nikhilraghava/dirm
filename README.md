# dirm  

![dirm Logo](https://cldup.com/ljlu2YgB67-3000x3000.png)

Lightning ⚡ speed directory management from the terminal.

![NPM Downloads](https://img.shields.io/npm/dt/dirm.svg) ![Travis Build](https://img.shields.io/travis/nikhilraghava/dirm.svg) ![NPM Version](https://img.shields.io/npm/v/dirm.svg) ![Dependencies](https://img.shields.io/librariesio/release/npm/dirm.svg) 

# Installation & Usage

First, install dirm using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g dirm
```

### Create files

```bash
$ dirm create hello.txt

      _   _
   __| | (_)  _ __   _ __ ___
  / _` | | | | '__| | '_ ` _ \
 | (_| | | | | |    | | | | | |
  \__,_| |_| |_|    |_| |_| |_|

hello.txt has been created successfully
```
Note that the file can be of any file type. If you want to add some content to the file, you can do the following,

```bash
$ dirm create hello.txt "This is a text file"

      _   _
   __| | (_)  _ __   _ __ ___
  / _` | | | | '__| | '_ ` _ \
 | (_| | | | | |    | | | | | |
  \__,_| |_| |_|    |_| |_| |_|

hello.txt has been created successfully
```

### Delete files

```bash
$ dirm delete hello.txt

      _   _
   __| | (_)  _ __   _ __ ___
  / _` | | | | '__| | '_ ` _ \
 | (_| | | | | |    | | | | | |
  \__,_| |_| |_|    |_| |_| |_|

hello.txt has been deleted successfully
```
As stated earlier, you can delete almost anything using the above command.

### Create a directory

You can create a directory using the following command.

```bash
$ dirm create-dir hello

      _   _
   __| | (_)  _ __   _ __ ___
  / _` | | | | '__| | '_ ` _ \
 | (_| | | | | |    | | | | | |
  \__,_| |_| |_|    |_| |_| |_|

The directory hello has been created successfully
```

### Delete a directory

> WARNING: When a directory is deleted all the contents of the directory will be removed before deletion.

You can delete a directory using the following command. 

```bash
$ dirm delete-dir hello

      _   _
   __| | (_)  _ __   _ __ ___
  / _` | | | | '__| | '_ ` _ \
 | (_| | | | | |    | | | | | |
  \__,_| |_| |_|    |_| |_| |_|

The directory has been deleted
```

### E-mail files

```bash
$ dirm email
```

Follow the instructions displayed in the terminal to send your e-mail.

# License

MIT License

Copyright (c) 2017 Nikhil Raghavendra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
