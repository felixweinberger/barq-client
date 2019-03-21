import React from 'react'
import csv from 'csvtojson'

const convertToObject = (input) => {
  let categories = {}
  input.forEach(el => {
    if (!categories[el[2]]) categories[el[2]] = []
    categories[el[2]].push({name: el[0], price: el[1]})
  })
  return categories
}


class MyDropzone extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: {},
      json: ''
    }
  }

  handleChange = (files) => {
    this.setState({file: files[0]});
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.file);
    const file = this.state.file;
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const binaryStr = reader.result;
      csv({
        noheader:false,
        output: "csv"
      })
      .fromString(binaryStr)
      .then((csvRow)=>{
        let categoriesArr = []

        Object.entries(convertToObject(csvRow))
          .forEach(el => categoriesArr.push({name: el[0], items: el[1]}))

        this.setState({json: categoriesArr})
      })
    }
    reader.readAsBinaryString(file);

  }


  render() {

    console.log(this.state.json);

    return (
      <div className="Text Input">
        <form>
          <input type="file" name="file" onChange={(e) => this.handleChange(e.target.files)} />
          <input type="submit" value="Submit" onClick={this.onSubmit} />
        </form>
        <div><p>{JSON.stringify(this.state.file)}</p></div>
        <div><p>{JSON.stringify(this.state.json)}</p></div>
      </div>
    )
  }

}

export default MyDropzone;