import React from 'react';

export default React.forwardRef((props, ref) => (
    <div className={props.className}
            ref={ref}
            onDragOver={(e)=>e.preventDefault()}
            onDrop={props.onDrop}>
        {props.children}
    </div>
));
