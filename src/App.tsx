import React, {Component} from 'react'
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en'
import nameData from "./example/name.json"
import {JSCLDSchema} from "./lib/JSCLDParser"
import {Config} from "./lib/JSCLDParser"
import CodeEditor from '@uiw/react-textarea-code-editor';
import "./App.css"
import {name_rdfs} from "./example/name_rdfs";
import {name_shacl} from "./example/name_shacl";
class App extends Component {
    state = {
        data: null,
        rdfs: null,
        shacl: null
    };

    readJsonFile = (f) => new Promise((resolve, reject) =>{
        const fileReader = new FileReader()
        fileReader.onload = event => {
            if (event.target){
                resolve(JSON.parse(event.target.result as string))
            }
        }
        fileReader.onerror = error => reject(error)
        fileReader.readAsText(f)
    })

    onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const parsedJson = await this.readJsonFile(event.target.files[0])

            this.setState({data:parsedJson})
            this.jscld(parsedJson)
        }
    }

    jscld = (jsc) => {

        const config = new Config("out", "https://www.example.com", "example")
        const jscLD = new JSCLDSchema(jsc, config)

        jscLD.serialize()
        jscLD.rdf_writer.end((error, quads) => {
            this.setState({rdfs: quads})
        })
        jscLD.shacl_writer.end((error, quads) => {
            this.setState({shacl: quads})
        })

    }

    fileData = () => {
        if (this.state.data) {
            return (
                <JSONInput
                    id          = 'jsc_id'
                    placeholder = {this.state.data}
                    theme       = "light_mitsuketa_tribute"
                    locale      = { locale }
                    height      = '550px'
                    confirmGood = {false}
                    viewOnly    = {true}
                />
            )
        }
        else {
            return (
                <JSONInput
                    id          = 'jsc_id'
                    placeholder = { nameData}
                    theme       = "light_mitsuketa_tribute"
                    locale      = { locale }
                    height      = '550px'
                    confirmGood = {false}
                    viewOnly    = {true}
                />
            );
        }
    }
    rdfs = () => {

        if (this.state.rdfs) {
            return (
                <CodeEditor
                    value= {this.state.rdfs}
                    language="text"
                    placeholder=""
                    padding={15}
                    minHeight={1000}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            )
        }
        else {
            return (
                <CodeEditor
                    value= {name_rdfs}
                    language="text"
                    placeholder=""
                    padding={15}
                    minHeight={1000}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            )
        }
    }
    shacl = () => {

        if (this.state.shacl) {
            return (
                <CodeEditor
                    value= {this.state.shacl}
                    language="text"
                    placeholder=""
                    padding={15}
                    minHeight={1000}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            )
        }
        else{
            return (
                <CodeEditor
                    value= {name_shacl}
                    language="text"
                    placeholder=""
                    padding={15}
                    minHeight={1000}
                    style={{
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            )
        }
    }
    render() {
        return (
            <>
                <h1>
                    JSON Schema LD
                </h1>
                <h3>
                    a syntactic sugar for JSON Schema to enable generative interoperability by means of representing JSON schema in RDF vocabularies and SHACL shapes
                </h3>
                <div id={"code"}>
                    <div id={"jsc"}>
                        JSON Schema
                        {this.fileData()}
                        <div>
                            <input type="file" accept=".json,application/json" onChange={this.onFileChange} />
                        </div>
                    </div>
                    <div id={"rdfs"}>
                        Output RDF vocabulary
                        {this.rdfs()}
                    </div>
                    <div id={"shacl"}>
                        Output Shacl shape
                        {this.shacl()}
                    </div>
                </div>
            </>
        );
    }
}

function streamToString(stream) {
    stream.setEncoding('utf-8'); // do this instead of directly converting the string
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(chunks.join("")));
    })
}



export default App;
