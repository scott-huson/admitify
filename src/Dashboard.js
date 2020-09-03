import React, { Component, useState } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import DocumentList from './DocumentList';
 
export default function ExcelReader() {
	const [file, setFile] = useState({});
	const [data, setData] = useState([]);
	const [cols, setCols] = useState([]);
 
  const handleChange = (e) => {
		const files = e.target.files;
		console.log("Opening file", files[0]);
		if (files && files[0]) {
			setFile({ file: files[0]});
		}
  };
 
  const handleFile = () => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onloadend = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
			/* Update state */
			setData(data);
			console.log(JSON.stringify(data, null, 2));
			setCols(make_cols(ws['!ref']));
    };
 
    if (rABS) {
      reader.readAsBinaryString(file.file);
    } else {
      reader.readAsArrayBuffer(file.file);
    };
  };
 
	return (
		<div>
			<div> 
				<label htmlFor="file">Upload an Excel File</label>
				<br />
				<input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleChange} />
				<br />
				<input type='submit' 
					value="Create Documents"
					onClick={handleFile} />
			</div>
			<hr/>
			{data ? 
				<div align='center'>
					<DocumentList data={data} columns={cols}/>
				</div> 
			: <b>No Documents</b>}
		</div>
	);
}