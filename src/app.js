import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import marked from 'marked';
import 'tachyons';

const initialText = "Heading\n============\n\nSub-heading\n---------------\n\n### Another deeper heading.\n\nParagraphs are separated by a blank line\n\nLeave 2 spaces at the end of a line to do a line break baby\n\nText attributes *Italic*, **bold**, `monospace`, ~~strikethrough~~ for your pleasure\n\nShopping list:\n\n* Nuclear fusion reactor\n* Advanced teleportation device\n* Apples\n\n*[Here is a link to some great synthwave](https://www.youtube.com/watch?v=arzw0tFK5O4)*\n"

class App extends React.Component {
    
    state = {
        rawMarkup: initialText
    }
  
    handleMarkdownChange = (event) => {
        let rawMarkup = event.target.value
        this.setState({ rawMarkup })
    }
    render(){
        return (
            <div>
                <header className="bg-white black-80 tc pv4 avenir mt5 mb0">
                    <h1 className="mt0 mb0 baskerville i fw1 f1">Wow! A Markdown Previewer!</h1>
                    <h2 className="mt3 mb1 f7 fw4 ttu tracked">Now you can preview all that markdown you've always wanted to preview</h2>
                </header>
                <div className="flex justify-center mt0">
                    <div className="flex items-center justify-around w-60 vh-75">
                        <MarkdownBox
                            onChange={this.handleMarkdownChange}
                            rawMarkup={this.state.rawMarkup}
                        />
                        <PreviewBox
                            rawMarkup={this.state.rawMarkup}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const MarkdownBox = (props) => {
    return (
        <textarea 
            defaultValue={props.rawMarkup}
            className="db border-box hover-black w-50 h-75 measure ba b--black-20 pt4 ph3 br2 mb2"
            onChange={props.onChange}
        ></textarea>
    )
}

class PreviewBox extends React.Component {
    previewText = () => {
        let text = marked(this.props.rawMarkup, {sanitize: true})
        return { __html: text }
    }
    render(){
        return (
            <article className="bg-white mt0 pt0 ph3 br3 ba b--black-10 w-50 h-75">
                <div dangerouslySetInnerHTML={this.previewText()}>
                </div>
            </article>
        )
    }

}



ReactDOM.render(<App />, document.getElementById('app'));


