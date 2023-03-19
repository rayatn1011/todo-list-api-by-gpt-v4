const YAML = require('yamljs');
const path = require('path');

const authDocs = YAML.load(path.join(__dirname, 'auth.yaml'));
const todoDocs = YAML.load(path.join(__dirname, 'todo.yaml'));

const swaggerDocs = {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API',
      version: '1.0.0',
      description: 'API documentation for the Todo List application',
    },
    paths: {
      ...authDocs.paths,
      ...todoDocs.paths,
    },
    components: {
      ...authDocs.components,
      ...todoDocs.components,
    },
    tags: [...authDocs.tags, ...todoDocs.tags],
  };
  
  module.exports = swaggerDocs;