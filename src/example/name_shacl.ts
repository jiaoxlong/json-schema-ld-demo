export const name_shacl = `
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix sh: <http://www.w3.org/ns/shacl#>.
@prefix dcterms: <http://purl.org/dc/terms/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix example: <https://www.example.com>.
@prefix exampleshape: <https://www.example.co/shapes/person.schema.json#>.

exampleshape:person.schema.jsonShape rdf:type sh:NodeShape;
  sh:targetClass <https://example.com/person.schema.json>.
  sh:property [
  sh:path example:firstName;
  sh:description "The person's first name.";
  sh:name "firstName";
  sh:datatype xsd:string
], [
  sh:path example:lastName;
  sh:description "The person's last name.";
  sh:name "lastName";
  sh:datatype xsd:string
], [
  sh:path example:age;
  sh:description "Age in years which must be equal to or greater than zero.";
  sh:name "age";
  sh:minInclusive 0;
  sh:datatype xsd:integer
].
`
