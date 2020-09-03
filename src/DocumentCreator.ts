import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TabStopPosition, TabStopType, TextRun } from "docx";

export class DocumentCreator {
    // tslint:disable-next-line: typedef
    public create(data: any): Document {
        const document = new Document();

        document.addSection({
            children: [
                new Paragraph({
                    text: data.name,
                    heading: HeadingLevel.TITLE,
                }),
            ],
        });
        return document;
    }
}