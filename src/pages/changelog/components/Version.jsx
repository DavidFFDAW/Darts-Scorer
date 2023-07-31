export default function VersionWrapper({ children }) {
    return <div className="changelog-version-wrapper">{children}</div>;
}

export function Version({ version, date, children }) {
    return (
        <div className="changelog-version">
            <div className="changelog-version-header">
                <span className="changelog-version-number number">{version}</span>
                {date ? <span className="changelog-version-date">{date}</span> : null}
            </div>
            <div className="changelog-version-content">{children}</div>
        </div>
    );
}

export function VersionText({ text, children, list }) {
    return (
        <div className="changelog-version-text">
            <p className="changelog-version-text-text">{text}</p>
            {list ? <ul className="changelog-version-list">{children}</ul> : children}
        </div>
    );
}

export function ChangeListItem({ text }) {
    return <li className="changelog-change-list-item">{text}</li>;
}
