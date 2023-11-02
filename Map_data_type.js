// Create a Map
const myMap = new Map();

// Add key-value pairs to the Map
myMap.set('key1', { name: 'John', age: 25 });
myMap.set('key2', { name: 'Jane', age: 30 });
myMap.set('key3', { name: 'Bob', age: 22 });

// Retrieve an object from the Map
const resultObject = myMap.get('key2');

let returnObj = {};

// Check if the key exists in the Map
if (resultObject !== undefined) {
    returnObj = {
        "First_Name" : resultObject.name,
        "Second_Name" : "ABC"
    }
    console.log(returnObj);

} else {
    console.log('Key not found in the Map.');
}
