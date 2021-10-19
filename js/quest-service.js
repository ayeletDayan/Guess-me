var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const QUESTS = 'Quests'

function createQuestsTree() {
    gQuestsTree = loadFromStorage(QUESTS);
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandi?');
        gQuestsTree.no = createQuest('Rita?');
        saveToStorage(QUESTS, gQuestsTree);
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    var newQuest = createQuest(newQuestTxt);
    newQuest.no = gCurrQuest;
    newQuest.yes = createQuest(newGuessTxt);
    gPrevQuest[lastRes] = newQuest;
    gCurrQuest = gQuestsTree;
    saveToStorage(QUESTS, gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest
}

function getCurrQuestTxt() {
    var txt = gCurrQuest.txt;
    return txt;
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val);
}