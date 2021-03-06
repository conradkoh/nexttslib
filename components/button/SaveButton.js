import IconButton from '@material-ui/core/IconButton';
import * as React from 'react';
import SaveIcon from '../icons/Save/SaveIcon';
/**
 * 
 * @param {SaveButtonProps} props 
 */
export default function SaveButton(props) {
    const { onClick = () => {} , style = {}, size = 'medium' } = props;
    return (
        <IconButton aria-label="close" style={style} onClick={onClick} size={size}>
            <SaveIcon />
        </IconButton>
    )
}
/**
 * @typedef SaveButtonProps
 * @property {*} onClick
 * @property {React.CSSProperties} [style]
 * @property {'small'|'medium'} [size]
 */