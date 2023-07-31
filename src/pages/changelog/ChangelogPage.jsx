import VersionWrapper, { Version, VersionText } from './components/Version';
import 'pages/changelog/changelog.css';

export default function ChangelogPage() {
    return (
        <>
            <div className="flex center column">
                <VersionWrapper>
                    <Version version="0.1.1" date="4 Dec 2022">
                        <VersionText text="Adición de la funcionalidad de los juegos relacionados con el 01 (301, 501, 701, 1001)"></VersionText>
                    </Version>
                </VersionWrapper>

                <VersionWrapper>
                    <Version version="0.1.0" date="21 Nov 2022">
                        <VersionText text="Rediseño completo de la Aplicación al nuevo diseño que se conoce hoy en día"></VersionText>
                    </Version>
                </VersionWrapper>
            </div>
        </>
    );
}
