export const name_rdfs = `
@prefix skos: <http://www.w3.org/2004/02/skos/core#>.
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix dcterms: <http://purl.org/dc/terms/>.
@prefix example: <https://www.example.com>.

<https://example.com/person.schema.json> dcterms:title "Person".
example:firstName dcterms:description "The person's first name.";
    rdf:type rdf:Property;
    rdfs:label "firstName";
    rdfs:domain <https://example.com/person.schema.json>;
    rdfs:range xsd:string.
example:lastName dcterms:description "The person's last name.";
    rdf:type rdf:Property;
    rdfs:label "lastName";
    rdfs:domain <https://example.com/person.schema.json>;
    rdfs:range xsd:string.
example:age dcterms:description "Age in years which must be equal to or greater than zero.";
    rdf:type rdf:Property;
    rdfs:label "age";
    rdfs:domain <https://example.com/person.schema.json>;
    rdfs:range xsd:integer.
`
