import React, { Component, useState } from 'react';
import { DocumentCreator } from './DocumentCreator';
import { Packer } from 'docx';
import { saveAs } from "file-saver";

export default function DocumentList({ data, columns }) {
    const generate = (row) =>  {
        const documentCreator = new DocumentCreator();
        const doc = documentCreator.create(row);
    
        Packer.toBlob(doc).then(blob => {
          console.log(blob);
          saveAs(blob, "testing.docx");
          console.log("Document created successfully");
        });
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Decision</th>
                    <th>Document</th>
                </tr>
            </thead>
            {data.map((row) => 
                <tbody key={row.name}>
                    <tr>
                        <td>row.name</td>
                        <td>row.decision</td>
                        <td>
                            <button onClick={generate(row)}>Download Document</button> 
                        </td>
                    </tr>
                </tbody>
            )}
        </table>
    );
}