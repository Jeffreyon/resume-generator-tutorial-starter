import './index.css';

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';

import template from './simple.docx';

let resume = {
    name: {
        first: 'John',
        last: 'Doe'
    },
    personalSummary: "Hi i'm John, a software engineer passionate about building well...software",
    jobTitle: 'Software Engineer',
    contact: {
        address: "Lagos, Nigeria",
        phone: '08123456789',
        email: 'johndoe@gmail.com'
    },
    meta_details: {
        dateOfBirth: '24th June, 1995',
        stateOfOrigin: 'Enugu',
        lga: 'Oji-River',
        gender: 'Male',
        maritalStatus: 'Single',
        religion: 'Christian'
    },
    workExperience: [
        {
            nameOfOrg: 'Acme Inc.',
            position: 'Software Developer',
            from: 'July, 2022',
            to: 'Present'
        }
    ],
    education: [
        {
            name: 'Creation Academy',
            location: 'Earth',
            type: 'Primary',
            qualificationObtained: 'Elementary School Certificate',
            started: '18th Feb, 2017',
            finished: '6th July, 2022'
        }
    ],
    referees: [
        {
            name: "Big man",
            nameOfOrg: 'Big man Inc',
            position: 'Big man position',
            contact: 'bigman@verybig.com'
        }
    ]
    
}

let trigger = document.querySelector('button');

trigger.addEventListener('click', (e) => {
    e.preventDefault();

    return generateDocument(resume, template);
});

async function generateDocument(resume, templatePath) {
    // load the document template into docxtemplater
    try {
        let response = await fetch(templatePath);
        let data = await response.arrayBuffer();

        let zip = PizZip(data);

        let templateDoc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true
        })

        templateDoc.render(resume);

        let generatedDoc = templateDoc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            compression: "DEFLATE"
        })

        saveAs(generatedDoc, `${resume.name.first}'s resume.docx`);
    } catch (error) {
        console.log('Error: ' + error);
    }
}