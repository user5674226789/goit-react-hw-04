import css from './LoadMoreBtn.module.css'

function LoadMoreBtn({onLoadMore}) {
    return (
        <button onClick={onLoadMore}>Load more</button>
    )
};

export default LoadMoreBtn