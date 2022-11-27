import { AppSettings } from 'AppSetting';
import { useState } from 'react';

export default function useContact() {
    const [bugReport, setBugReport] = useState(true);
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    const [inputs, setInputs] = useState({
        mail: {
            error: false,
            value: '',
        },
        name: {
            error: false,
            value: '',
        },
        body: {
            error: false,
            value: '',
        },
    });

    const updateStateFor = (key, value, error) => {
        setInputs(prevInputs => {
            return {
                ...prevInputs,
                [key]: {
                    value: value,
                    error: error,
                },
            };
        });
    };

    const emailChange = e => {
        const isValidEmail = emailRegex.test(e.target.value);

        const errorMessage = isValidEmail ? false : 'Debe introducir un correo válido';

        updateStateFor('mail', e.target.value, errorMessage);
    };

    const nameChange = e => {
        const isValidName = e.target.value.length >= 3;
        const errorMessage = isValidName ? false : 'El nombre debe tener al menos 3 caracteres';

        updateStateFor('name', e.target.value, errorMessage);
    };

    const messageChange = e => {
        const isValidBody = e.target.value.length >= 10 && e.target.value.length <= 255;
        const errorMessage = isValidBody ? false : 'El mensaje debe tener entre 10 y 255 caracteres';

        updateStateFor('body', e.target.value, errorMessage);
    };

    const changeBugReportStatus = () => {
        setBugReport(previousState => !previousState);
    };

    const sendEmail = (email, name, message) => {
        const url = AppSettings.MAIL_API_ENDPOINT;
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                receiver: AppSettings.DEVELOPER_MAIL,
                sender: email,
                name: name,
                subject: AppSettings.MAIL_SUBJECT_SEND,
                body: message,
            }),
        })
            .then(response => response.json())
            .then(resp => {
                return resp;
            })
            .catch(console.log);
    };

    const hasInputErrors = () => {
        return Object.values(inputs).some(input => Boolean(input.error));
    };

    const onSubmit = event => {
        event.preventDefault();
        const hasErrors = hasInputErrors();

        if (!hasErrors) {
            changeBugReportStatus();
            sendEmail(inputs.mail.value, inputs.name.value, inputs.body.value);
        }
    };

    const scrollToLinks = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    const onchanges = {
        email: emailChange,
        name: nameChange,
        message: messageChange,
    };

    return { bugReport, changeBugReportStatus, onSubmit, inputs, onchanges, scrollToLinks };
}
