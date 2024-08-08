import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Prop {
    height: 250;
    width: 200;
    gap: 16;
    counts: 5;
    baseColor: '#222';
    highlightColor: '#333';
    margin: 0;
    padding: 0;
}

const SkeletonCard = ({
    baseColor,
    counts,
    height,
    highlightColor,
    width,
    gap,
    margin,
    padding,
}: Prop) => {
    const styles = {
        display: 'flex',
        width: '100%',
        overflow: 'hidden',
        gap,
        margin,
        padding,
    };
    return (
        <div>
            <Skeleton height={200} />
            <Skeleton width={`60%`} height={30} style={{ marginTop: '10px' }} />
            <Skeleton width={`80%`} height={20} style={{ marginTop: '5px' }} />
        </div>
    );
};
export default SkeletonCard;
