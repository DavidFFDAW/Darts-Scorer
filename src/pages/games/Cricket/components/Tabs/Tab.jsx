import './tab.css';

export default function Tab({ text, click, active }) {
    const classes = active ? 'tab btn active' : 'tab btn';
    return (
        <div className={classes} onClick={click}>
            {text}
        </div>
    );
}
