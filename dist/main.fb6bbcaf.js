// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/currentTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentTime = void 0;
var currentTime = function currentTime(timeNow) {
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var updateTime = function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    } else {
      return k;
    }
  };
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  timeNow.innerText = "".concat(hour, " : ").concat(min, " : ").concat(sec);
  if (hour < 6) {
    var greeting = document.createElement('p');
    timeNow.append(greeting);
    greeting.classList.add('greeting');
    greeting.innerText = 'Good night!';
  } else if (hour >= 6 && hour < 12) {
    var _greeting = document.createElement('p');
    timeNow.append(_greeting);
    _greeting.classList.add('greeting');
    _greeting.innerText = 'Good morning!';
  } else if (hour >= 12 && hour < 20) {
    var _greeting2 = document.createElement('p');
    timeNow.append(_greeting2);
    _greeting2.classList.add('greeting');
    _greeting2.innerText = 'Good day!';
  } else if (hour >= 20) {
    var _greeting3 = document.createElement('p');
    timeNow.append(_greeting3);
    _greeting3.classList.add('greeting');
    _greeting3.innerText = 'Good day!';
  }
  var t = setTimeout(function () {
    currentTime(timeNow);
  }, 1000);
};
exports.currentTime = currentTime;
},{}],"js/helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLocalStorage = exports.showAddNewWindow = exports.hideAddNewWindow = exports.getCounter = exports.changeStyletoProgress = exports.changeStyleoDone = void 0;
var showAddNewWindow = function showAddNewWindow(container) {
  container.classList.add('activeNewWindow');
};
exports.showAddNewWindow = showAddNewWindow;
var hideAddNewWindow = function hideAddNewWindow(container) {
  container.classList.remove('activeNewWindow');
};
exports.hideAddNewWindow = hideAddNewWindow;
var updateLocalStorage = function updateLocalStorage(todoArray, progressArray, doneArray) {
  localStorage.setItem('todoArr', JSON.stringify(todoArray));
  localStorage.setItem('progressArr', JSON.stringify(progressArray));
  localStorage.setItem('doneArr', JSON.stringify(doneArray));
};
exports.updateLocalStorage = updateLocalStorage;
var getCounter = function getCounter(todoCounter, todoArr, progressCounter, progressArr, doneCounter, doneArr) {
  todoCounter.innerText = todoArr.length;
  progressCounter.innerText = progressArr.length;
  doneCounter.innerText = doneArr.length;
};
exports.getCounter = getCounter;
var changeStyletoProgress = function changeStyletoProgress(itemBlock) {
  itemBlock.classList.add('moveToProgressStyle');
};
exports.changeStyletoProgress = changeStyletoProgress;
var changeStyleoDone = function changeStyleoDone(itemBlock) {
  itemBlock.classList.add('moveToDoneStyle ');
};
exports.changeStyleoDone = changeStyleoDone;
},{}],"js/createtodoitem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodoItem = void 0;
var createTodoItem = function createTodoItem(newWindowTitleValue, newWindowDescriptionValue, userName) {
  if (!newWindowTitleValue || !newWindowDescriptionValue) {
    return;
  }
  var date = new Date();
  var title = newWindowTitleValue;
  var description = newWindowDescriptionValue;
  var todoItem = {
    title: title,
    description: description,
    data: date.toLocaleTimeString(),
    workUser: userName,
    id: Date.now()
  };
  return todoItem;
};
exports.createTodoItem = createTodoItem;
},{}],"js/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderUser = exports.renderTodoItem = void 0;
var renderTodoItem = function renderTodoItem(container, obj) {
  var itemBlock = document.createElement('div');
  var itemBlockHeader = document.createElement('div');
  var itemBlockMain = document.createElement('div');
  var itemBlockFooter = document.createElement('div');
  var title = document.createElement('div');
  var description = document.createElement('div');
  var user = document.createElement('div');
  var time = document.createElement('div');
  var btnContainer = document.createElement('div');
  var editBtn = document.createElement('button');
  var delBtn = document.createElement('button');
  var moveToProgressBtn = document.createElement('button');
  container.append(itemBlock);
  itemBlock.append(itemBlockHeader, itemBlockMain, itemBlockFooter);
  itemBlockHeader.append(title, btnContainer);
  itemBlockFooter.append(user, time);
  title.innerText = obj.title;
  description.innerText = obj.description;
  user.innerText = obj.workUser;
  time.innerText = obj.data;
  delBtn.setAttribute('data-name', 'closeBtn');
  itemBlock.setAttribute('data-todoid', obj.id);
  moveToProgressBtn.setAttribute('data-name', 'moveToProgress');
  editBtn.setAttribute('data-name', 'editBtn');
  itemBlock.classList.add('itemBlock');
  itemBlockHeader.classList.add('itemBlockHeader');
  title.classList.add('title');
  itemBlockMain.classList.add('itemBlockMain');
  itemBlockFooter.classList.add('itemBlockFooter');
  btnContainer.classList.add('btnContainer');
  editBtn.classList.add('editBtn');
  delBtn.classList.add('delBtn');
  moveToProgressBtn.classList.add('moveToProgressBtn');
  if (container.classList.contains('todoBlockContainer')) {
    btnContainer.append(editBtn, delBtn);
    itemBlockMain.append(description, moveToProgressBtn);
    moveToProgressBtn.innerText = '>';
    editBtn.innerText = 'Edit';
    delBtn.innerText = 'Delete';
  }
  if (container.classList.contains('progressBlockContainer')) {
    btnContainer.append(editBtn, delBtn);
    itemBlockMain.append(description);
    editBtn.innerText = 'BACK';
    delBtn.innerText = 'COMPLETE';
    editBtn.setAttribute('data-name', 'moveToTodo');
    delBtn.setAttribute('data-name', 'moveToDone');
  }
  if (container.classList.contains('doneBlockContainer')) {
    btnContainer.append(delBtn);
    itemBlock.classList.add('moveToDoneStyle');
    itemBlockMain.append(description);
    delBtn.innerText = 'DELETE';
  }
  return itemBlock;
};
exports.renderTodoItem = renderTodoItem;
var renderUser = function renderUser(valueName, newWindow, editNewWindow) {
  var nameOpt = document.createElement('option');
  var nameOpt2 = document.createElement('option');
  nameOpt2.innerText = valueName;
  nameOpt.innerText = valueName;
  nameOpt2.value = valueName;
  nameOpt.value = valueName;
  newWindow.append(nameOpt);
  editNewWindow.append(nameOpt2);
};
exports.renderUser = renderUser;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _currentTime = require("./currentTime.js");
var _helper = require("./helper.js");
var _createtodoitem = require("./createtodoitem.js");
var _render = require("./render.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var header = document.getElementById('header');
var trelloLogo = document.createElement('h1');
var timeNow = document.createElement('div');
var mainBlock = document.getElementById('main_block');
var mainPage = document.getElementById('mainPage');
var todoBlock = document.createElement('div');
var todoBlockHeader = document.createElement('div');
var todoBlockHeaderTitle = document.createElement('h2');
var todoBlockHeaderCounter = document.createElement('div');
var todoBlockContainer = document.createElement('div');
var todoBlockBtn = document.createElement('button');
var progressBlock = document.createElement('div');
var progressBlockHeader = document.createElement('div');
var progressBlockHeaderTitle = document.createElement('h2');
var progressBlockHeaderCounter = document.createElement('div');
var progressBlockContainer = document.createElement('div');
var doneBlock = document.createElement('div');
var doneBlockHeader = document.createElement('div');
var doneBlockHeaderTitle = document.createElement('h2');
var doneBlockHeaderCounter = document.createElement('div');
var doneBlockContainer = document.createElement('div');
var doneBlockBtn = document.createElement('button');
var newWindowContainer = document.createElement('div');
var newWindowBtnContainer = document.createElement('div');
var newWindowTitle = document.createElement('input');
var newWindowDescription = document.createElement('textarea');
var newWindowUser = document.createElement('select');
var newWindowCancelBtn = document.createElement('button');
var newWindowAddBtn = document.createElement('button');
var editNewWindowContainer = document.createElement('div');
var editNewWindowBtnContainer = document.createElement('div');
var editNewWindowTitle = document.createElement('input');
var editNewWindowDescription = document.createElement('textarea');
var editNewWindowUser = document.createElement('select');
var editNewWindowCancelBtn = document.createElement('button');
var editNewWindowAddBtn = document.createElement('button');
var doneNewWindowContainer = document.createElement('div');
var doneNewWindowBtnContainer = document.createElement('div');
var doneNewWindowTitle = document.createElement('div');
var doneNewWindowYesBtn = document.createElement('button');
var doneNewWindowNoBtn = document.createElement('button');
var lengthNewWindowContainer = document.createElement('div');
var lengthNewWindowTitle = document.createElement('div');
var lengthNewWindowBtn = document.createElement('button');
var todoArr = [];
var progressArr = [];
var doneArr = [];
var savedTodoArr = JSON.parse(localStorage.getItem('todoArr')) || [];
var savedProgressArr = JSON.parse(localStorage.getItem('progressArr')) || [];
var savedDoneArr = JSON.parse(localStorage.getItem('doneArr')) || [];
header.append(trelloLogo, timeNow);
mainBlock.append(todoBlock, progressBlock, doneBlock);
todoBlock.append(todoBlockHeader, todoBlockContainer, todoBlockBtn);
progressBlock.append(progressBlockHeader, progressBlockContainer);
doneBlock.append(doneBlockHeader, doneBlockContainer, doneBlockBtn);
todoBlockHeader.append(todoBlockHeaderTitle, todoBlockHeaderCounter);
progressBlockHeader.append(progressBlockHeaderTitle, progressBlockHeaderCounter);
doneBlockHeader.append(doneBlockHeaderTitle, doneBlockHeaderCounter);
mainPage.append(newWindowContainer);
newWindowContainer.append(newWindowTitle, newWindowDescription, newWindowBtnContainer);
newWindowBtnContainer.append(newWindowUser, newWindowCancelBtn, newWindowAddBtn);
mainPage.append(editNewWindowContainer);
editNewWindowContainer.append(editNewWindowTitle, editNewWindowDescription, editNewWindowBtnContainer);
editNewWindowBtnContainer.append(editNewWindowUser, editNewWindowCancelBtn, editNewWindowAddBtn);
mainPage.append(doneNewWindowContainer);
doneNewWindowContainer.append(doneNewWindowTitle, doneNewWindowBtnContainer);
doneNewWindowBtnContainer.append(doneNewWindowYesBtn, doneNewWindowNoBtn);
mainPage.append(lengthNewWindowContainer);
lengthNewWindowContainer.append(lengthNewWindowTitle, lengthNewWindowBtn);
trelloLogo.classList.add('trelloLogo');
timeNow.classList.add('timeNow');
todoBlock.classList.add('todoBlock');
progressBlock.classList.add('progressBlock');
doneBlock.classList.add('doneBlock');
todoBlockHeader.classList.add('todoBlockHeader');
progressBlockHeader.classList.add('progressBlockHeader');
doneBlockHeader.classList.add('doneBlockHeader');
todoBlockContainer.classList.add('todoBlockContainer');
progressBlockContainer.classList.add('progressBlockContainer');
doneBlockContainer.classList.add('doneBlockContainer');
todoBlockBtn.classList.add('todoBlockBtn');
doneBlockBtn.classList.add('doneBlockBtn');
todoBlockHeaderCounter.classList.add('todoBlockHeaderCounter');
progressBlockHeaderCounter.classList.add('progressBlockHeaderCounter');
doneBlockHeaderCounter.classList.add('doneBlockHeaderCounter');
newWindowUser.classList.add('select');
newWindowContainer.classList.add('newWindowContainer');
newWindowTitle.classList.add('newWindowTitle');
newWindowDescription.classList.add('newWindowDescription');
newWindowBtnContainer.classList.add('newWindowBtnContainer');
newWindowCancelBtn.classList.add('newWindowCancelBtn');
newWindowAddBtn.classList.add('newWindowAddBtn');
editNewWindowUser.classList.add('select');
editNewWindowContainer.classList.add('editNewWindowContainer');
editNewWindowTitle.classList.add('editNewWindowTitle');
editNewWindowDescription.classList.add('editNewWindowDescription');
editNewWindowBtnContainer.classList.add('editNewWindowBtnContainer');
editNewWindowCancelBtn.classList.add('editNewWindowCancelBtn');
editNewWindowAddBtn.classList.add('editNewWindowAddBtn');
doneNewWindowContainer.classList.add('newWindowDoneContainer');
doneNewWindowTitle.classList.add('doneNewWindowTitle');
doneNewWindowBtnContainer.classList.add('doneNewWindowBtnContainer');
doneNewWindowYesBtn.classList.add('doneNewWindowYesBtn');
doneNewWindowNoBtn.classList.add('doneNewWindowNoBtn');
lengthNewWindowContainer.classList.add('lengthNewWindowContainer');
lengthNewWindowTitle.classList.add('lengthNewWindowTitle');
lengthNewWindowBtn.classList.add('lengthNewWindowBtn');
trelloLogo.innerText = 'Trello v.7.33b';
todoBlockHeaderTitle.innerText = 'TODO:';
progressBlockHeaderTitle.innerText = 'IN PROGRESS:';
doneBlockHeaderTitle.innerText = 'DONE:';
todoBlockBtn.innerText = 'NEW TODO';
doneBlockBtn.innerText = 'DELETE ALL';
newWindowCancelBtn.innerText = 'Cancel';
newWindowAddBtn.innerText = 'Confirm';
editNewWindowCancelBtn.innerText = 'Cancel';
editNewWindowAddBtn.innerText = 'Confirm';
todoBlockHeaderCounter.innerText = '0';
progressBlockHeaderCounter.innerText = '0';
doneBlockHeaderCounter.innerText = '0';
doneNewWindowNoBtn.innerText = 'No';
doneNewWindowYesBtn.innerText = 'Yes';
doneNewWindowTitle.innerText = 'Did you do everything?';
lengthNewWindowBtn.innerText = 'Well done';
lengthNewWindowTitle.innerText = 'You have to do some "in progress" todos';
newWindowTitle.setAttribute('placeholder', 'Title');
newWindowDescription.setAttribute('placeholder', 'Description');
editNewWindowTitle.setAttribute('placeholder', 'Title');
editNewWindowDescription.setAttribute('placeholder', 'Description');
var getUsers = function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users').then(function (res) {
    return res.json();
  }).then(function (users) {
    users.forEach(function (people) {
      (0, _render.renderUser)(people.username, newWindowUser, editNewWindowUser);
    });
  });
};
var handleTodo = function handleTodo() {
  var todoItem = (0, _createtodoitem.createTodoItem)(newWindowTitle.value, newWindowDescription.value, newWindowUser.value);
  if (newWindowTitle.value && newWindowDescription.value) {
    newWindowTitle.value = '';
    newWindowDescription.value = '';
    (0, _helper.hideAddNewWindow)(newWindowContainer);
  }
  if (!todoItem) {
    return;
  }
  todoArr.push(todoItem);
  var itemContainer = (0, _render.renderTodoItem)(todoBlockContainer, todoItem);
  todoBtnFunction(itemContainer);
  (0, _helper.getCounter)(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
  (0, _helper.updateLocalStorage)(todoArr, progressArr, doneArr);
};
var handleProgressTodo = function handleProgressTodo(todoItem) {
  progressArr.push(todoItem);
  var progressItemContainer = (0, _render.renderTodoItem)(progressBlockContainer, todoItem);
  (0, _helper.changeStyletoProgress)(progressItemContainer);
  progressBtnFunction(progressItemContainer);
  (0, _helper.getCounter)(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
  (0, _helper.updateLocalStorage)(todoArr, progressArr, doneArr);
};
var todoBtnFunction = function todoBtnFunction(itemBlock) {
  itemBlock.addEventListener('click', function (event) {
    if (event.target.dataset.name === 'closeBtn') {
      var todoID = itemBlock.dataset.todoid;
      event.currentTarget.remove();
      todoArr = todoArr.filter(function (todo) {
        return +todoID !== +todo.id;
      });
      (0, _helper.getCounter)(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
      (0, _helper.updateLocalStorage)(todoArr, progressArr, doneArr);
    }
  });
  itemBlock.addEventListener('click', function (event) {
    if (event.target.dataset.name === 'moveToProgress') {
      if (progressArr.length > 5) {
        (0, _helper.showAddNewWindow)(lengthNewWindowContainer);
        (0, _helper.hideAddNewWindow)(doneNewWindowContainer);
        (0, _helper.hideAddNewWindow)(newWindowContainer);
      } else {
        var todoID = itemBlock.dataset.todoid;
        event.currentTarget.remove();
        var item = todoArr.find(function (todo) {
          return +todoID === +todo.id;
        });
        todoArr = todoArr.filter(function (todo) {
          return +todoID !== +todo.id;
        });
        (0, _helper.getCounter)(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
        handleProgressTodo(item);
        (0, _helper.updateLocalStorage)(todoArr, progressArr, doneArr);
      }
    }
  });
  itemBlock.addEventListener('click', function (event) {
    if (event.target.dataset.name === 'editBtn') {
      var todoID = itemBlock.dataset.todoid;
      var todoItem = todoArr.find(function (todo) {
        return +todoID === +todo.id;
      });
      (0, _helper.showAddNewWindow)(editNewWindowContainer);
      editNewWindowTitle.value = todoItem.title;
      editNewWindowDescription.value = todoItem.description;
      editNewWindowUser.value = todoItem.workUser;
      editNewWindowAddBtn.addEventListener('click', function () {
        todoItem.title = editNewWindowTitle.value;
        todoItem.description = editNewWindowDescription.value;
        todoItem.id = todoID;
        todoItem.workUser = editNewWindowUser.value;
        (0, _helper.updateLocalStorage)(todoArr, progressArr, doneArr);
        (0, _helper.hideAddNewWindow)(editNewWindowContainer);
        location.reload();
      });
    }
  });
  var getRandomStart = function getRandomStart(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  itemBlock.onclick = function () {
    itemBlock.style.backgroundColor = 'rgb(' + getRandomStart(0, 255) + ', ' + getRandomStart(0, 255) + ', ' + getRandomStart(0, 255) + ', ' + 0.5 + ')';
  };
  newWindowContainer.onmousedown = function (event) {
    var shiftX = event.clientX - newWindowContainer.getBoundingClientRect().left;
    var shiftY = event.clientY - newWindowContainer.getBoundingClientRect().top;
    newWindowContainer.style.position = 'absolute';
    newWindowContainer.style.zIndex = '1000';
    moveAt(event.pageX, event.pageY);
    function moveAt(pageX, pageY) {
      newWindowContainer.style.left = pageX - shiftX - 10 + 'px';
      newWindowContainer.style.top = pageY - shiftY - 10 + 'px';
    }
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
      newWindowContainer.hidden = true;
    }
    document.addEventListener('mousemove', onMouseMove);
    newWindowContainer.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      newWindowContainer.onmouseup = null;
    };
  };
};
var progressBtnFunction = function progressBtnFunction(itemBlock) {
  itemBlock.addEventListener('click', function (event) {
    if (event.target.dataset.name === 'moveToTodo') {
      var todoID = itemBlock.dataset.todoid;
      event.currentTarget.remove();
      var todoItem = progressArr.find(function (todo) {
        return +todoID === +todo.id;
      });
      var itemContainer = (0, _render.renderTodoItem)(todoBlockContainer, todoItem);
      todoBtnFunction(itemContainer);
      todoArr.push(todoItem);
      progressArr = progressArr.filter(function (todo) {
        return +todoID !== +todo.id;
      });
      (0, _helper.getCounter)(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
      (0, _helper.updateLocalStorage)(todoArr, progressArr, doneArr);
    }
  });
  itemBlock.addEventListener('click', function (event) {
    if (event.target.dataset.name === 'moveToDone') {
      var todoID = itemBlock.dataset.todoid;
      event.currentTarget.remove();
      var item = progressArr.find(function (todo) {
        return +todoID === +todo.id;
      });
      var itemContainer = (0, _render.renderTodoItem)(doneBlockContainer, item);
      doneArr.push(item);
      doneBtnFunction(itemContainer);
      progressArr = progressArr.filter(function (todo) {
        return +todoID !== +todo.id;
      });
      (0, _helper.getCounter)(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
      (0, _helper.updateLocalStorage)(todoArr, progressArr, doneArr);
    }
  });
};
var doneBtnFunction = function doneBtnFunction(itemBlock) {
  itemBlock.addEventListener('click', function (event) {
    if (event.target.dataset.name === 'closeBtn') {
      var todoID = itemBlock.dataset.todoid;
      event.currentTarget.remove();
      doneArr = doneArr.filter(function (todo) {
        return +todoID !== +todo.id;
      });
      (0, _helper.getCounter)(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
      (0, _helper.updateLocalStorage)(todoArr, progressArr, doneArr);
    }
  });
};
doneBlockBtn.addEventListener('click', function () {
  if (!doneArr.length) {
    return;
  }
  (0, _helper.showAddNewWindow)(doneNewWindowContainer);
  (0, _helper.hideAddNewWindow)(newWindowContainer);
  (0, _helper.hideAddNewWindow)(lengthNewWindowContainer);
  doneNewWindowNoBtn.addEventListener('click', function () {
    (0, _helper.hideAddNewWindow)(doneNewWindowContainer);
  });
  doneNewWindowYesBtn.addEventListener('click', function () {
    doneBlockContainer.innerHTML = '';
    doneArr.length = 0;
    (0, _helper.updateLocalStorage)(todoArr, progressArr, doneArr);
    (0, _helper.getCounter)(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
    (0, _helper.hideAddNewWindow)(doneNewWindowContainer);
  });
});
todoBlockBtn.addEventListener('click', function () {
  (0, _helper.showAddNewWindow)(newWindowContainer);
  (0, _helper.hideAddNewWindow)(doneNewWindowContainer);
  (0, _helper.hideAddNewWindow)(lengthNewWindowContainer);
});
newWindowCancelBtn.addEventListener('click', function () {
  newWindowTitle.value = '';
  newWindowDescription.value = '';
  (0, _helper.hideAddNewWindow)(newWindowContainer);
});
editNewWindowCancelBtn.addEventListener('click', function () {
  (0, _helper.hideAddNewWindow)(editNewWindowContainer);
});
newWindowAddBtn.addEventListener('click', handleTodo);
lengthNewWindowBtn.addEventListener('click', function () {
  (0, _helper.hideAddNewWindow)(lengthNewWindowContainer);
});
if (savedDoneArr.length) {
  var _iterator = _createForOfIteratorHelper(savedDoneArr),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var todo = _step.value;
      doneArr.push(todo);
      var itemContainer = (0, _render.renderTodoItem)(doneBlockContainer, todo);
      doneBtnFunction(itemContainer);
      (0, _helper.getCounter)(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
if (savedTodoArr.length) {
  var _iterator2 = _createForOfIteratorHelper(savedTodoArr),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _todo = _step2.value;
      todoArr.push(_todo);
      var _itemContainer = (0, _render.renderTodoItem)(todoBlockContainer, _todo);
      todoBtnFunction(_itemContainer);
      (0, _helper.getCounter)(todoBlockHeaderCounter, todoArr, progressBlockHeaderCounter, progressArr, doneBlockHeaderCounter, doneArr);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
if (savedProgressArr.length) {
  var _iterator3 = _createForOfIteratorHelper(savedProgressArr),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _todo2 = _step3.value;
      handleProgressTodo(_todo2);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
}
(0, _currentTime.currentTime)(timeNow);
getUsers();
},{"./currentTime.js":"js/currentTime.js","./helper.js":"js/helper.js","./createtodoitem.js":"js/createtodoitem.js","./render.js":"js/render.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61011" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map