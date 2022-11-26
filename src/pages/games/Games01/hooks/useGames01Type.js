import useDarts from 'hooks/useDarts';

export default function useGames01Type() {
    const { darts } = useDarts();

    return {
        darts,
    };
}
