import { TitleIcon } from 'components/icon/Icon';

export default function Footer({ id, bugReport }) {
    const sty = {
        background: 'rgba(55, 80, 126, 0.2)',
        width: '100%',
        position: bugReport ? 'relative' : 'absolute',
        bottom: 0,
    };

    return (
        <footer id={id || 'footer-contact'} className="contact animate__animated animate__fadeInLeft down" style={sty}>
            <div className="flex between footer-inner">
                <div>
                    <h4>Desarrollador</h4>
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
                        <a href="https://github.com/DavidFFDAW/Darts-Scorer/Issues" target="_blank" rel="noreferrer">
                            <TitleIcon icon="bug_report" text="GitHub" />
                            Issues
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
