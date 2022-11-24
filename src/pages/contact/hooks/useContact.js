import { useState } from "react";

export default function useContact() {

    const [bugReport, setBugReport] = useState(false);
    
    function emailChange (e) {
        const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value);
        const errorMessage = isValidEmail ? false : "Debe introducir un correo válido";
        
        setInputs(previous => {
            console.log('previo', previous);
            const tr = { ...previous.mail, value: e.target.value, errorMessage };
            console.log('tr', { ...previous.mail, tr });
            console.log('nuevo', { ...previous, mail: tr });
            return {...previous, mail: tr};
        });

        console.log('emailChange:', inputs);
    };
    
    function nameChange (e) {
        const isValidName = e.target.value.length >= 3;
        const errorMessage = isValidName ? false : "El nombre debe tener al menos 3 caracteres";
        
        setInputs({...inputs, name: {...inputs.name, error: errorMessage, value: e.target.value}});
        console.log('nameChange:', inputs);
    };
    
    function messageChange (e) {
        const isValidBody = e.target.value.length >= 10 && e.target.value.length <= 255;
        const errorMessage = isValidBody ? false : "El mensaje debe tener entre 10 y 255 caracteres";
        
        setInputs({...inputs, body: {...inputs.body, error: errorMessage, value: e.target.value}});
        console.log('messageChange:', inputs);
    };

    const [inputs, setInputs] = useState({
        mail: {
            error: false,
            value: "",
            onchange: emailChange,
        },
        name: {
            error: false,
            value: "",
            onchange: nameChange,
        },
        body: {
            error: false,
            value: "",
            onchange: messageChange,
        },
    });

    const changeBugReportStatus = () => {
        setBugReport(previousState => !previousState);
    }

    const sendEmail = (email, name, message) => { 
        // send email
        const url = 'http://vps-f87b433e.vps.ovh.net/mail/mail_api.php';
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                receiver: 'davidferflo2@gmail.com',
                sender: email,
                name: name,
                subject: 'Soporte App Dardos',
                body: message,
            })
        }).then((response) => response.json())
        .then(resp => {
            console.log(resp)
            return resp
        })
        .catch(console.log);
    }

    const hasInputErrors = () => {
        return Object.values(inputs).some(input => Boolean(input.error));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const hasErrors = hasInputErrors();
        
        if (!hasErrors) {
            changeBugReportStatus();
        }
    }

    return { bugReport, changeBugReportStatus, onSubmit, inputs };
}