// printTopics.js
const aiTopics = require('./aiTopics');

for (const [topic, description] of Object.entries(aiTopics)) {
    console.log('Topic: ${topic}');
    console.log('Description: ${description}');
    console.log('-----------------------------');
}