import Footer from './components/Footer';
import useContact from './hooks/useContact';
import { TitleIcon } from 'components/icon/Icon';
import { DefaultGeneralHeader } from 'components/headers/GeneralHeader';
import { FlexBetween, FlexCenter, FlexEnd, FormItem } from 'components/layouts/Layouts';

export default function ContactPage() {
    const { bugReport, onSubmit, inputs, onchanges, scrollToLinks } = useContact();

    const values = Object.values(inputs);
    const notValid = values.some(input => input.value.length <= 0) || values.some(input => Boolean(input.error));

    return (
        <>
            <DefaultGeneralHeader text={'Contacto'} animation={true} />

            <FlexCenter>
                <button className="btn spec" onClick={scrollToLinks}>
                    Ir a los enlaces
                </button>
            </FlexCenter>

            {bugReport ? (
                <div className="animate__animated animate__fadeIn flex center grow panel-down">
                    <div className="flex between column panel">
                        <form method="GET" onSubmit={onSubmit} style={{ width: '100%' }}>
                            <FormItem>
                                <FlexBetween style={{ marginBottom: 25 }}>
                                    <TitleIcon icon={'mail'} />
                                    <label className="contact label">Tu email*</label>
                                </FlexBetween>

                                <input type="text" value={inputs.mail.value} onChange={onchanges.email} autoComplete="email" />
                                {Boolean(inputs.mail.error) ? <p className="form-error"> {inputs.mail.error} </p> : null}
                            </FormItem>

                            <FormItem>
                                <FlexBetween style={{ marginBottom: 25 }}>
                                    <TitleIcon icon={'person'} />
                                    <label className="contact label">Nombre*</label>
                                </FlexBetween>

                                <input type="text" value={inputs.name.value} onChange={onchanges.name} autoComplete="given-name" />
                                {Boolean(inputs.name.error) ? <p className="form-error"> {inputs.name.error} </p> : null}
                            </FormItem>

                            <FormItem>
                                <FlexBetween style={{ marginBottom: 25 }}>
                                    <TitleIcon icon={'subject'} />
                                    <label className="contact label">Error*</label>

                                    <FlexEnd>
                                        <span>{inputs.body.value.length}/255</span>
                                    </FlexEnd>
                                </FlexBetween>

                                <textarea type="text" value={inputs.body.value} onChange={onchanges.message}></textarea>
                                {Boolean(inputs.body.error) ? <p className="form-error"> {inputs.body.error} </p> : null}
                            </FormItem>

                            <FlexEnd>
                                <button type="submit" className="btn spec pointer" disabled={notValid}>
                                    Enviar
                                </button>
                            </FlexEnd>
                        </form>
                    </div>
                </div>
            ) : null}

            <Footer id="footer-contact" bugReport={bugReport} />
        </>
    );
}
