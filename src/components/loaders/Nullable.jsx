export default function Nullable({ condition, children }) {
    if (!condition) return null;
    return <>{children}</>;
}
