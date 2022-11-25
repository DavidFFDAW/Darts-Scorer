import React from 'react';
import { FlexBetween, FlexCenter, FlexEnd, FormItem } from 'components/layouts/Layouts';
import { TitleIcon } from 'components/icon/Icon';
import { DefaultGeneralHeader } from 'components/headers/GeneralHeader';
import useContact from './hooks/useContact';

export default function ContactPage() {
    const { changeBugReportStatus, bugReport, onSubmit, inputs, onchanges } = useContact();

    const values = Object.values(inputs);
    const notValid = values.some(input => input.value.length <= 0) || values.every(input => Boolean(input.error));

    const sty = {
        position: 'fixed',
        background: 'rgba(55, 80, 126, 0.2)',
        minHeight: '89vh',
        width: '20%',
        bottom: 0,
        left: 0,
    };

    return (
        <>
            <DefaultGeneralHeader text={'Contacto'} animation={true} />

            {!bugReport ? (
                <FlexCenter>
                    <button className="btn spec pointer" onClick={changeBugReportStatus}>
                        {' '}
                        Quiero reportar un bug{' '}
                    </button>
                </FlexCenter>
            ) : null}

            {bugReport ? (
                <div className="animate__animated animate__fadeIn flex center grow panel-down">
                    <div className="flex between column panel">
                        <form method="GET" onSubmit={onSubmit} style={{ width: '100%' }}>
                            <FormItem>
                                <FlexBetween style={{ marginBottom: 25 }}>
                                    <TitleIcon icon={'mail'} />
                                    <label
                                        style={{
                                            width: '100%',
                                            marginLeft: 15,
                                        }}
                                    >
                                        Tu email
                                    </label>
                                </FlexBetween>

                                <input type="text" value={inputs.mail.value} onChange={onchanges.email} />
                                {Boolean(inputs.mail.error) ? <p className="form-error"> {inputs.mail.error} </p> : null}
                            </FormItem>

                            <FormItem>
                                <FlexBetween style={{ marginBottom: 25 }}>
                                    <TitleIcon icon={'person'} />
                                    <label
                                        style={{
                                            width: '100%',
                                            marginLeft: 15,
                                        }}
                                    >
                                        Nombre
                                    </label>
                                </FlexBetween>

                                <input type="text" value={inputs.name.value} onChange={onchanges.name} />
                                {Boolean(inputs.name.error) ? <p className="form-error"> {inputs.name.error} </p> : null}
                            </FormItem>

                            <FormItem>
                                <FlexBetween style={{ marginBottom: 25 }}>
                                    <TitleIcon icon={'subject'} />
                                    <label
                                        style={{
                                            width: '100%',
                                            marginLeft: 15,
                                        }}
                                    >
                                        Breve descripcion del error
                                    </label>

                                    <FlexEnd>
                                        <span>{inputs.body.value.length}/255</span>
                                    </FlexEnd>
                                </FlexBetween>

                                <textarea type="text" value={inputs.body.value} onChange={onchanges.message}></textarea>
                                {Boolean(inputs.body.error) ? <p className="form-error"> {inputs.body.error} </p> : null}
                            </FormItem>

                            <FlexEnd>
                                <button type="submit" className="btn spec pointer" disabled={notValid}>
                                    {' '}
                                    Enviar{' '}
                                </button>
                            </FlexEnd>
                        </form>
                    </div>
                </div>
            ) : null}

            <footer className="contact animate__animated animate__fadeInLeft" style={sty}>
                <div
                    style={{
                        width: '80%',
                        alignItems: 'flex-start',
                        padding: 25,
                    }}
                    className="flex between column"
                >
                    <div>
                        <h4>Enlaces</h4>
                        <div>
                            <a href="https://www.linkedin.com/in/david-fern%C3%A1ndez-flores/" target="_blank" rel="noreferrer">
                                <TitleIcon icon="work" text="Linkedin" />
                                LinkedIn
                            </a>
                            <a href="mailto:davidferflo2@gmail.com" target="_blank" rel="noreferrer">
                                <TitleIcon icon="mail" text="Email" />
                                E-mail
                            </a>
                            <a href="https://github.com/DavidFFDAW" target="_blank" rel="noreferrer">
                                <TitleIcon icon="person" text="Github" />
                                GitHub
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4>Proyecto</h4>
                        <div>
                            <a href="https://github.com/DavidFFDAW/Darts-Scorer" target="_blank" rel="noreferrer">
                                <TitleIcon icon="engineering" text="GitHub" />
                                GitHub
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4>Follow</h4>
                        <div></div>
                    </div>
                </div>
            </footer>
        </>
    );
}
