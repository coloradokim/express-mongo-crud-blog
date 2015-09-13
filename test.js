// goal1: delete an one item
// goal2: delete one item buy id number

// comments = [{title: 'yo!', id: 1}, {title: 'foo', id: 2}, {title: 'bar', id: 3}];
// console.log(comments.indexOf(comments.title));


var object = {
    key1: {
        name: 'xxxxxx',
        value: '100.0'
    },
    key2: {
        name: 'yyyyyyy',
        value: '200.0'
    },
    key3: {
        name: 'zzzzzz',
        value: '500.0'
    }
};

function findInJson(key1, value) {
    var i = 0;
    for (var key in object) {
        console.log(key);
        var current = object[key];
        if (current[key1] == value) {
            return i;
        }
        i++;

    }
   return -1;
}

console.log(findInJson("name", "xxxxxx") + " <-- expected 0");
// console.log(findInJson("value", "500.0") + " <-- expeced 2");
// console.log(findInJson("value", "zzzzzz") + " <-- expected -1");
