import './index.css';
function Loader(){
    return(
        <div className='container'>
            <div className='img-container'>
              <div className="skeleton"></div>
            </div>
            <div className='skeleton-text'></div>
          </div>
    )
}

export default function Skeleton({num}) {
    return (
        <>
            {
                Array(num).fill().map((_, i) => (
                    <Loader key={i}/>
                ))
            }
        </>
    )
}